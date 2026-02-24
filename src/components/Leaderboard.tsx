'use client';

import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import { getRejections, getStreak } from '@/lib/utils';
import { getLeaderboard } from '@/lib/leaderboard';

export default function Leaderboard() {
  const { state } = useStore();
  const rejectionCount = getRejections(state.entries).length;
  const streak = getStreak(state.entries);
  const board = getLeaderboard(state.profile.name, rejectionCount, streak);

  const userEntry = board.find((e) => e.isCurrentUser);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-foreground font-bold text-lg">The Board</h2>
        {userEntry && (
          <span className="text-secondary text-xs">
            You&apos;re #{userEntry.rank}
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto space-y-1 pr-1">
        {board.map((entry, i) => (
          <motion.div
            key={entry.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03, duration: 0.2 }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
              entry.isCurrentUser
                ? 'bg-accent/15 border border-accent/25'
                : 'hover:bg-surface-elevated'
            }`}
          >
            {/* Rank */}
            <span
              className={`w-8 text-right font-bold text-sm ${
                entry.rank <= 3
                  ? 'text-accent'
                  : entry.isCurrentUser
                  ? 'text-foreground'
                  : 'text-muted'
              }`}
            >
              {entry.rank}
            </span>

            {/* Name */}
            <span
              className={`flex-1 font-medium text-sm truncate ${
                entry.isCurrentUser ? 'text-foreground' : 'text-secondary'
              }`}
            >
              {entry.isCurrentUser ? `${entry.name} (you)` : entry.name}
            </span>

            {/* Streak */}
            {entry.streak > 0 && (
              <span className="text-streak text-xs flex items-center gap-0.5">
                <span className="text-[10px]">&#x1F525;</span>
                {entry.streak}
              </span>
            )}

            {/* Count */}
            <span
              className={`font-bold text-sm tabular-nums ${
                entry.isCurrentUser ? 'text-accent' : 'text-foreground'
              }`}
            >
              {entry.rejectionCount.toLocaleString()}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
