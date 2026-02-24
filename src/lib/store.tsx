'use client';

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { AppState, Rejection, RejectionCategory, UserProfile } from './types';
import { generateId } from './utils';

const STORAGE_KEY = 'rejection-collection-data';

const defaultProfile: UserProfile = {
  onboardingComplete: false,
  name: '',
  categories: ['pitch', 'ask', 'application', 'creative', 'personal'],
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
        category: RejectionCategory;
        ask: string;
        outcome: string;
        useful: boolean;
        isYes: boolean;
      };
    }
  | { type: 'TOGGLE_USEFUL'; payload: string }
  | { type: 'DELETE_ENTRY'; payload: string }
  | { type: 'COMPLETE_ONBOARDING'; payload: { name: string; categories: RejectionCategory[] } }
  | { type: 'UPDATE_GOAL'; payload: number };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'LOAD_STATE':
      return action.payload;

    case 'LOG_ENTRY': {
      const entry: Rejection = {
        id: generateId(),
        category: action.payload.category,
        ask: action.payload.ask,
        outcome: action.payload.outcome,
        useful: action.payload.useful,
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
          categories: action.payload.categories,
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
  logEntry: (entry: {
    category: RejectionCategory;
    ask: string;
    outcome: string;
    useful: boolean;
    isYes: boolean;
  }) => void;
  toggleUseful: (id: string) => void;
  deleteEntry: (id: string) => void;
  completeOnboarding: (name: string, categories: RejectionCategory[]) => void;
  isLoaded: boolean;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const [isLoaded, setIsLoaded] = React.useState(false);

  // Load from localStorage on mount
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

  // Persist to localStorage on state change
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
    (entry: {
      category: RejectionCategory;
      ask: string;
      outcome: string;
      useful: boolean;
      isYes: boolean;
    }) => {
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
    (name: string, categories: RejectionCategory[]) => {
      dispatch({ type: 'COMPLETE_ONBOARDING', payload: { name, categories } });
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
