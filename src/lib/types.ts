export interface Rejection {
  id: string;
  ask: string;
  useful: boolean;
  timestamp: number;
  isYes: boolean; // false = rejection, true = success (attempt that worked)
}

export interface UserProfile {
  onboardingComplete: boolean;
  name: string;
  yearlyGoal: number;
  joinDate: number;
  foundingMemberNumber?: number;
  lifeArea?: string;
  completedMissions?: string[];
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
