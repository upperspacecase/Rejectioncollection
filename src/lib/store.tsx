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
import { generateId } from './utils';
import { useAuth } from './auth';
import { db } from './firebase';

const STORAGE_KEY = 'rejection-collection-data';

const defaultProfile: UserProfile = {
  onboardingComplete: false,
  name: '',
  yearlyGoal: 1000,
  joinDate: Date.now(),
};

const defaultState: AppState = {
  profile: defaultProfile,
  entries: [],
};

type Action =
  | { type: 'LOAD_STATE'; payload: AppState }
  | {
      type: 'LOG_ENTRY';
      payload: {
        ask: string;
        isYes: boolean;
      };
    }
  | { type: 'TOGGLE_USEFUL'; payload: string }
  | { type: 'DELETE_ENTRY'; payload: string }
  | { type: 'COMPLETE_ONBOARDING'; payload: { name: string } }
  | { type: 'UPDATE_GOAL'; payload: number }
  | { type: 'SYNC_ENTRIES'; payload: Rejection[] };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'LOAD_STATE':
      return action.payload;

    case 'LOG_ENTRY': {
      const entry: Rejection = {
        id: generateId(),
        ask: action.payload.ask,
        useful: false,
        isYes: action.payload.isYes,
        timestamp: Date.now(),
      };
      return { ...state, entries: [entry, ...state.entries] };
    }

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
          joinDate: Date.now(),
        },
      };

    case 'UPDATE_GOAL':
      return {
        ...state,
        profile: { ...state.profile, yearlyGoal: action.payload },
      };

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
  completeOnboarding: (name: string) => void;
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
      getDoc(userDocRef).then((snap) => {
        if (snap.exists()) {
          const profile = snap.data() as UserProfile;
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
                dispatch({ type: 'LOAD_STATE', payload: parsed });
              }
            }
          } catch {
            // Ignore
          }
        }
        setIsLoaded(true);
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

  const logEntry = useCallback(
    (entry: { ask: string; isYes: boolean }) => {
      const newEntry: Rejection = {
        id: generateId(),
        ask: entry.ask,
        useful: false,
        isYes: entry.isYes,
        timestamp: Date.now(),
      };

      dispatch({ type: 'LOG_ENTRY', payload: entry });

      if (user) {
        const entryRef = doc(db, 'users', user.uid, 'entries', newEntry.id);
        setDoc(entryRef, newEntry);
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
          setDoc(entryRef, { ...entry, useful: !entry.useful });
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
        deleteDoc(entryRef);
      }
    },
    [user]
  );

  const completeOnboarding = useCallback(
    (name: string) => {
      dispatch({ type: 'COMPLETE_ONBOARDING', payload: { name } });

      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        setDoc(userDocRef, {
          onboardingComplete: true,
          name,
          yearlyGoal: 1000,
          joinDate: Date.now(),
        });
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
