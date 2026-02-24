export type RejectionCategory =
  | 'pitch'
  | 'ask'
  | 'application'
  | 'creative'
  | 'personal'
  | 'sales'
  | 'other';

export const CATEGORY_LABELS: Record<RejectionCategory, string> = {
  pitch: 'Pitch',
  ask: 'Ask',
  application: 'Application',
  creative: 'Creative',
  personal: 'Personal',
  sales: 'Sales',
  other: 'Other',
};

export interface Rejection {
  id: string;
  category: RejectionCategory;
  ask: string;
  outcome: string;
  useful: boolean;
  timestamp: number;
  isYes: boolean; // false = rejection, true = success (attempt that worked)
}

export interface UserProfile {
  onboardingComplete: boolean;
  name: string;
  categories: RejectionCategory[];
  yearlyGoal: number;
  joinDate: number;
}

export interface AppState {
  profile: UserProfile;
  entries: Rejection[];
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  rejectionCount: number;
  streak: number;
  isCurrentUser: boolean;
}

export interface MilestoneDef {
  count: number;
  message: string;
  title: string;
}
