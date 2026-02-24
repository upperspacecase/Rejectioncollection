import { LeaderboardEntry } from './types';

const MOCK_USERS = [
  { name: 'Maria V.', rejectionCount: 847, streak: 34 },
  { name: 'Jake T.', rejectionCount: 612, streak: 18 },
  { name: 'Priya K.', rejectionCount: 589, streak: 52 },
  { name: 'Devon M.', rejectionCount: 534, streak: 7 },
  { name: 'Alex Chen', rejectionCount: 478, streak: 23 },
  { name: 'Sam R.', rejectionCount: 445, streak: 41 },
  { name: 'Riley J.', rejectionCount: 398, streak: 12 },
  { name: 'Tomás L.', rejectionCount: 367, streak: 29 },
  { name: 'Noor A.', rejectionCount: 334, streak: 15 },
  { name: 'Casey W.', rejectionCount: 289, streak: 8 },
  { name: 'Jordan P.', rejectionCount: 256, streak: 44 },
  { name: 'Kim S.', rejectionCount: 223, streak: 6 },
  { name: 'Drew H.', rejectionCount: 198, streak: 19 },
  { name: 'Ava B.', rejectionCount: 167, streak: 3 },
  { name: 'Chris N.', rejectionCount: 134, streak: 11 },
  { name: 'Morgan F.', rejectionCount: 112, streak: 22 },
  { name: 'Quinn D.', rejectionCount: 89, streak: 5 },
  { name: 'Rowan E.', rejectionCount: 67, streak: 14 },
  { name: 'Sage G.', rejectionCount: 45, streak: 2 },
  { name: 'River O.', rejectionCount: 23, streak: 9 },
];

export function getLeaderboard(
  userName: string,
  userRejectionCount: number,
  userStreak: number
): LeaderboardEntry[] {
  const allUsers = [
    ...MOCK_USERS,
    {
      name: userName || 'You',
      rejectionCount: userRejectionCount,
      streak: userStreak,
      isCurrent: true,
    },
  ];

  allUsers.sort((a, b) => b.rejectionCount - a.rejectionCount);

  return allUsers.map((u, i) => ({
    rank: i + 1,
    name: u.name,
    rejectionCount: u.rejectionCount,
    streak: u.streak,
    isCurrentUser: 'isCurrent' in u,
  }));
}
