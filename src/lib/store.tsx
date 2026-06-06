'use client';

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import {
  doc,
  setDoc,
  getDoc,
  collection,
  onSnapshot,
  deleteDoc,
  writeBatch,
} from 'firebase/firestore';
import { AppState, Rejection, UserProfile } from './types';
import { generateId, getRejections, getStreak, getYeses, getWeeklyNos } from './utils';
import { useAuth } from './auth';
import { db } from './firebase';
import { claimFoundingMemberIfEligible } from './founders';

const STORAGE_KEY = 'rejection-collection-data';

const defaultProfile: UserProfile = {
  onboardingComplete: false,
  name: '',
  yearlyGoal: 1000,
  joinDate: Date.now(),
  completedMissions: [],
};

const defaultState: AppState = {
  profile: defaultProfile,
  entries: [],
};

type Action =
  | { type: 'LOAD_STATE'; payload: AppState }
  | { type: 'LOG_ENTRY'; payload: Rejection }
  | { type: 'TOGGLE_USEFUL'; payload: string }
  | { type: 'DELETE_ENTRY'; payload: string }
  | { type: 'COMPLETE_ONBOARDING'; payload: { name: string; lifeArea?: string } }
  | { type: 'UPDATE_GOAL'; payload: number }
  | { type: 'UPDATE_NAME'; payload: string }
  | { type: 'SET_FOUNDING_NUMBER'; payload: number }
  | { type: 'TOGGLE_MISSION'; payload: string }
  | { type: 'SYNC_ENTRIES'; payload: Rejection[] };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'LOAD_STATE':
      return action.payload;

    case 'LOG_ENTRY':
      return { ...state, entries: [action.payload, ...state.entries] };

    case 'TOGGLE_USEFUL':
      return {
        ...state,
        entries: state.entries.map((e) =>
          e.id === action.payload ? { ...e, useful: !e.useful } : e
        ),
      };

    case 'DELETE_ENTRY':
      return {
        ...state,
        entries: state.entries.filter((e) => e.id !== action.payload),
      };

    case 'COMPLETE_ONBOARDING':
      return {
        ...state,
        profile: {
          ...state.profile,
          onboardingComplete: true,
          name: action.payload.name,
          lifeArea: action.payload.lifeArea,
          joinDate: Date.now(),
        },
      };

    case 'UPDATE_GOAL':
      return {
        ...state,
        profile: { ...state.profile, yearlyGoal: action.payload },
      };

    case 'UPDATE_NAME':
      return {
        ...state,
        profile: { ...state.profile, name: action.payload },
      };

    case 'SET_FOUNDING_NUMBER':
      return {
        ...state,
        profile: { ...state.profile, foundingMemberNumber: action.payload },
      };

    case 'TOGGLE_MISSION': {
      const current = state.profile.completedMissions ?? [];
      const completedMissions = current.includes(action.payload)
        ? current.filter((id) => id !== action.payload)
        : [...current, action.payload];
      return { ...state, profile: { ...state.profile, completedMissions } };
    }

    case 'SYNC_ENTRIES':
      return {
        ...state,
        entries: action.payload.sort((a, b) => b.timestamp - a.timestamp),
      };

    default:
      return state;
  }
}

interface StoreContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  logEntry: (entry: { ask: string; isYes: boolean }) => void;
  toggleUseful: (id: string) => void;
  deleteEntry: (id: string) => void;
  completeOnboarding: (name: string, lifeArea?: string) => void;
  updateName: (name: string) => void;
  toggleMission: (id: string) => void;
  isLoaded: boolean;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(reducer, defaultState);
  const [isLoaded, setIsLoaded] = React.useState(false);

  // Load from Firestore if authenticated, otherwise localStorage
  useEffect(() => {
    if (user) {
      // Load profile from Firestore
      const userDocRef = doc(db, 'users', user.uid);
      getDoc(userDocRef).then(async (snap) => {
        let loadedProfile: UserProfile | null = null;
        if (snap.exists()) {
          const profile = snap.data() as UserProfile;
          loadedProfile = profile;
          dispatch({ type: 'LOAD_STATE', payload: { profile, entries: state.entries } });
        } else {
          // Migrate localStorage data if exists
          try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
              const parsed = JSON.parse(saved) as AppState;
              if (parsed.profile.onboardingComplete) {
                // Migrate to Firestore
                setDoc(userDocRef, parsed.profile);
                const entriesRef = collection(db, 'users', user.uid, 'entries');
                const batch = writeBatch(db);
                parsed.entries.forEach((entry) => {
                  batch.set(doc(entriesRef, entry.id), entry);
                });
                batch.commit();
                loadedProfile = parsed.profile;
                dispatch({ type: 'LOAD_STATE', payload: parsed });
              }
            }
          } catch {
            // Ignore
          }
        }
        setIsLoaded(true);

        // Claim the next founding-member slot if eligible (race-safe transaction)
        if (loadedProfile && loadedProfile.onboardingComplete) {
          const claimed = await claimFoundingMemberIfEligible(
            user.uid,
            loadedProfile.foundingMemberNumber
          );
          if (claimed && claimed !== loadedProfile.foundingMemberNumber) {
            dispatch({ type: 'SET_FOUNDING_NUMBER', payload: claimed });
          }
        }
      });

      // Subscribe to entries
      const entriesRef = collection(db, 'users', user.uid, 'entries');
      const unsubscribe = onSnapshot(entriesRef, (snapshot) => {
        const entries: Rejection[] = [];
        snapshot.forEach((doc) => {
          entries.push(doc.data() as Rejection);
        });
        dispatch({ type: 'SYNC_ENTRIES', payload: entries });
      });

      return unsubscribe;
    } else {
      // Fall back to localStorage
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved) as AppState;
          dispatch({ type: 'LOAD_STATE', payload: parsed });
        }
      } catch {
        // Ignore
      }
      setIsLoaded(true);
    }
  }, [user]);

  // Save to localStorage as fallback (always, for offline support)
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {
        // Ignore
      }
    }
  }, [state, isLoaded]);

  // Sync leaderboard row whenever entries change
  useEffect(() => {
    if (!user || !isLoaded || !state.profile.onboardingComplete) return;
    const rejections = getRejections(state.entries).length;
    const streak = getStreak(state.entries);
    const leaderboardRef = doc(db, 'leaderboard', user.uid);
    const payload: Record<string, string | number> = {
      name: state.profile.name || 'Anonymous',
      rejectionCount: rejections,
      streak,
      updatedAt: Date.now(),
    };
    if (state.profile.foundingMemberNumber !== undefined) {
      payload.foundingMemberNumber = state.profile.foundingMemberNumber;
    }
    setDoc(leaderboardRef, payload).catch(() => {});

    // Public profile doc — powers the shareable /u/[uid] page + OG card.
    const yeses = getYeses(state.entries).length;
    const { count: weeklyNos, featured } = getWeeklyNos(state.entries);
    const profileRef = doc(db, 'profiles', user.uid);
    const profilePayload: Record<string, string | number | null> = {
      name: state.profile.name || 'Anonymous',
      total: state.entries.length,
      nos: rejections,
      yeses,
      streak,
      weeklyNos,
      noOfWeek: featured ? featured.ask : null,
      joinDate: state.profile.joinDate,
      updatedAt: Date.now(),
    };
    if (state.profile.foundingMemberNumber !== undefined) {
      profilePayload.foundingMemberNumber = state.profile.foundingMemberNumber;
    }
    setDoc(profileRef, profilePayload).catch(() => {});
  }, [user, isLoaded, state.entries, state.profile]);

  const logEntry = useCallback(
    (entry: { ask: string; isYes: boolean }) => {
      const newEntry: Rejection = {
        id: generateId(),
        ask: entry.ask,
        useful: false,
        isYes: entry.isYes,
        timestamp: Date.now(),
      };

      dispatch({ type: 'LOG_ENTRY', payload: newEntry });

      if (user) {
        const entryRef = doc(db, 'users', user.uid, 'entries', newEntry.id);
        setDoc(entryRef, newEntry).catch(() => {});
      }
    },
    [user]
  );

  const toggleUseful = useCallback(
    (id: string) => {
      dispatch({ type: 'TOGGLE_USEFUL', payload: id });

      if (user) {
        const entry = state.entries.find((e) => e.id === id);
        if (entry) {
          const entryRef = doc(db, 'users', user.uid, 'entries', id);
          setDoc(entryRef, { ...entry, useful: !entry.useful }).catch(() => {});
        }
      }
    },
    [user, state.entries]
  );

  const deleteEntry = useCallback(
    (id: string) => {
      dispatch({ type: 'DELETE_ENTRY', payload: id });

      if (user) {
        const entryRef = doc(db, 'users', user.uid, 'entries', id);
        deleteDoc(entryRef).catch(() => {});
      }
    },
    [user]
  );

  const completeOnboarding = useCallback(
    (name: string, lifeArea?: string) => {
      dispatch({ type: 'COMPLETE_ONBOARDING', payload: { name, lifeArea } });

      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        setDoc(userDocRef, {
          onboardingComplete: true,
          name,
          lifeArea: lifeArea ?? null,
          yearlyGoal: 1000,
          joinDate: Date.now(),
          completedMissions: [],
        })
          .then(() => claimFoundingMemberIfEligible(user.uid, undefined))
          .then((claimed) => {
            if (claimed) dispatch({ type: 'SET_FOUNDING_NUMBER', payload: claimed });
          })
          .catch(() => {});
      }
    },
    [user]
  );

  const toggleMission = useCallback(
    (id: string) => {
      dispatch({ type: 'TOGGLE_MISSION', payload: id });

      if (user) {
        const current = state.profile.completedMissions ?? [];
        const completedMissions = current.includes(id)
          ? current.filter((m) => m !== id)
          : [...current, id];
        const userDocRef = doc(db, 'users', user.uid);
        setDoc(userDocRef, { completedMissions }, { merge: true }).catch(() => {});
      }
    },
    [user, state.profile.completedMissions]
  );

  const updateName = useCallback(
    (name: string) => {
      const trimmed = name.trim() || 'Anonymous';
      dispatch({ type: 'UPDATE_NAME', payload: trimmed });

      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        setDoc(userDocRef, { name: trimmed }, { merge: true }).catch(() => {});
      }
    },
    [user]
  );

  return (
    <StoreContext.Provider
      value={{
        state,
        dispatch,
        logEntry,
        toggleUseful,
        deleteEntry,
        completeOnboarding,
        updateName,
        toggleMission,
        isLoaded,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
