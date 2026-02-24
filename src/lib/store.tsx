'use client';

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { AppState, Rejection, UserProfile } from './types';
import { generateId } from './utils';

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
  | { type: 'UPDATE_GOAL'; payload: number };

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
  const [state, dispatch] = useReducer(reducer, defaultState);
  const [isLoaded, setIsLoaded] = React.useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as AppState;
        dispatch({ type: 'LOAD_STATE', payload: parsed });
      }
    } catch {
      // Ignore parse errors, use defaults
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {
        // Ignore storage errors
      }
    }
  }, [state, isLoaded]);

  const logEntry = useCallback(
    (entry: { ask: string; isYes: boolean }) => {
      dispatch({ type: 'LOG_ENTRY', payload: entry });
    },
    []
  );

  const toggleUseful = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_USEFUL', payload: id });
  }, []);

  const deleteEntry = useCallback((id: string) => {
    dispatch({ type: 'DELETE_ENTRY', payload: id });
  }, []);

  const completeOnboarding = useCallback(
    (name: string) => {
      dispatch({ type: 'COMPLETE_ONBOARDING', payload: { name } });
    },
    []
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
