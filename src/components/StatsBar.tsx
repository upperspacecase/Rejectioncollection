'use client';

import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import { getRejections, getYeses, getStreak, getYearlyRejections, getPaceProjection } from '@/lib/utils';

export default function StatsBar() {
  const { state } = useStore();
  const { entries, profile } = state;

  const rejections = getRejections(entries).length;
  const yeses = getYeses(entries).length;
  const total = entries.length;
  const streak = getStreak(entries);
  const yearlyCount = getYearlyRejections(entries);
  const projection = getPaceProjection(yearlyCount, profile.joinDate, profile.yearlyGoal);
  const goalProgress = Math.min(1, yearlyCount / profile.yearlyGoal);

  return (
    <div className="space-y-4">
      {/* Stat pills */}
      <div className="flex gap-2 justify-center">
        <StatPill label="Attempts" value={total} />
        <StatPill label="Nos" value={rejections} accent />
        <StatPill label="Yeses" value={yeses} success />
      </div>

      {/* Streak */}
      {streak > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-center gap-2"
        >
          <span className="text-streak text-lg">&#x1F525;</span>
          <span className="text-foreground font-bold text-sm">{streak} day streak</span>
        </motion.div>
      )}
      {streak === 0 && entries.length > 0 && (
        <p className="text-center text-secondary text-xs">
          The arena&apos;s still open. Log one today.
        </p>
      )}

      {/* Annual goal */}
      <div className="px-2">
        <div className="flex justify-between items-baseline mb-1.5">
          <span className="text-secondary text-xs font-medium uppercase tracking-wider">
            {new Date().getFullYear()} Goal
          </span>
          <span className="text-foreground text-xs font-bold">
            {yearlyCount} / {profile.yearlyGoal}
          </span>
        </div>
        <div className="h-2 bg-surface-elevated rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${goalProgress * 100}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>
        {projection && yearlyCount > 0 && (
          <p className="text-muted text-xs mt-1 text-right">
            At this pace: {projection}
          </p>
        )}
      </div>
    </div>
  );
}

function StatPill({
  label,
  value,
  accent,
  success,
}: {
  label: string;
  value: number;
  accent?: boolean;
  success?: boolean;
}) {
  return (
    <div className="flex flex-col items-center bg-surface-elevated rounded-xl px-4 py-2.5 min-w-[72px]">
      <span
        className={`font-bold text-lg leading-tight ${
          accent ? 'text-accent' : success ? 'text-success' : 'text-foreground'
        }`}
      >
        {value}
      </span>
      <span className="text-muted text-[10px] uppercase tracking-wider font-medium">
        {label}
      </span>
    </div>
  );
}
