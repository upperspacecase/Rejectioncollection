'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';
import {
  getRejections,
  getYeses,
  getStreak,
  formatRelativeTime,
} from '@/lib/utils';
import { MILESTONES } from '@/lib/milestones';
import { getAskOfTheDay, getDayName, getGreetingPeriod } from '@/lib/asks';
import { TOTAL_MISSIONS, getCurrentWeek } from '@/lib/challenge';
import { Rejection } from '@/lib/types';
import { FlameIcon, StarIcon, CheckIcon, SparkleIcon } from './Icons';
import LastThirtyDaysStrip from './LastThirtyDaysStrip';
import AskLibrary from './AskLibrary';

export default function HomeTab({
  onSeeAll,
  onOpenChallenge,
}: {
  onSeeAll: () => void;
  onOpenChallenge: () => void;
}) {
  const { state } = useStore();
  const { entries, profile } = state;
  const [showLibrary, setShowLibrary] = useState(false);

  const missionsDone = (profile.completedMissions ?? []).length;
  const currentWeek = getCurrentWeek(profile.joinDate);

  const rejections = getRejections(entries).length;
  const yeses = getYeses(entries).length;
  const total = entries.length;
  const streak = getStreak(entries);

  const nextMilestone = useMemo(() => {
    for (const m of MILESTONES) {
      if (rejections < m.count) return m;
    }
    return null;
  }, [rejections]);

  const askOfTheDay = useMemo(() => getAskOfTheDay(), []);
  const initial = (profile.name || 'A').trim().charAt(0).toUpperCase() || 'A';
  const firstName = (profile.name || '').split(' ')[0] || profile.name || 'collector';

  const todayAsks = useMemo(() => {
    const today = new Date();
    const todayKey = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    return entries.filter((e) => {
      const d = new Date(e.timestamp);
      return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}` === todayKey;
    }).length;
  }, [entries]);

  const dailyGoal = 3;
  const slotsFilled = Math.min(todayAsks, dailyGoal);
  const extra = Math.max(0, todayAsks - dailyGoal);

  return (
    <div className="h-full flex flex-col px-5 pt-4 pb-2 overflow-y-auto">
      {/* Greeting */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-xs font-semibold mb-0.5" style={{ color: 'var(--pp-ink-3)' }}>
            {getDayName()} {getGreetingPeriod().toLowerCase()}
          </div>
          <div className="font-display text-2xl">
            Hey {firstName}
          </div>
        </div>
        <div
          className="flex items-center justify-center font-display text-lg font-bold"
          style={{
            width: 38,
            height: 38,
            borderRadius: 12,
            background: 'var(--pp-sun)',
            border: '2px solid var(--pp-ink)',
            boxShadow: 'var(--pp-shadow)',
          }}
        >
          {initial}
        </div>
      </div>

      {/* Big count card */}
      <div
        className="pp-card relative overflow-hidden mb-3"
        style={{ padding: '20px 22px', background: 'var(--pp-coral)', color: '#fff' }}
      >
        <div
          className="text-xs font-bold uppercase tracking-wider"
          style={{ opacity: 0.85 }}
        >
          Asks collected
        </div>
        <div className="pp-num" style={{ fontSize: 64, marginTop: 6 }}>
          {total.toLocaleString()}
        </div>

        {/* Daily slots — refresh each day, fill as you ask */}
        <div className="mt-3">
          <div
            className="text-[11px] font-bold uppercase tracking-wider mb-1.5"
            style={{ opacity: 0.85 }}
          >
            Today
          </div>
          <div className="flex items-center gap-2">
            {Array.from({ length: dailyGoal }).map((_, i) => {
              const filled = i < slotsFilled;
              return (
                <div
                  key={i}
                  className="flex items-center justify-center"
                  style={{
                    flex: 1,
                    height: 26,
                    borderRadius: 8,
                    border: '2px solid #fff',
                    background: filled ? '#fff' : 'transparent',
                    color: 'var(--pp-coral)',
                    transition: 'background 200ms ease',
                  }}
                >
                  {filled && <CheckIcon size={14} strokeWidth={3} />}
                </div>
              );
            })}
            {extra > 0 && (
              <span
                className="text-xs font-bold"
                style={{ opacity: 0.95, paddingLeft: 4 }}
              >
                +{extra}
              </span>
            )}
          </div>
          <div className="text-xs mt-1.5" style={{ opacity: 0.9 }}>
            {todayAsks === 0
              ? 'One ask keeps your streak alive. Get the first one in.'
              : slotsFilled < dailyGoal
                ? `${dailyGoal - slotsFilled} to go.`
                : 'Day done. Anything extra is gravy.'}
          </div>
        </div>

        {streak > 0 && (
          <div
            className="pp-sticker absolute"
            style={{
              top: 14,
              right: 14,
              background: 'var(--pp-sun)',
              transform: 'rotate(8deg)',
              gap: 4,
            }}
          >
            <FlameIcon size={14} style={{ color: 'var(--pp-coral)' }} />
            {streak}-day streak
          </div>
        )}
      </div>

      {/* Challenge + Ask Library launchers */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <button
          onClick={onOpenChallenge}
          className="pp-card pp-card-sm cursor-pointer text-left flex flex-col"
          style={{ padding: 14, background: 'var(--pp-sun-sf)' }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <FlameIcon size={18} style={{ color: 'var(--pp-coral)' }} />
            <span className="font-display text-sm">Challenge</span>
          </div>
          <span className="text-xs" style={{ color: 'var(--pp-ink-2)' }}>
            {missionsDone}/{TOTAL_MISSIONS} missions · Week {currentWeek}
          </span>
        </button>
        <button
          onClick={() => setShowLibrary(true)}
          className="pp-card pp-card-sm cursor-pointer text-left flex flex-col"
          style={{ padding: 14, background: 'var(--pp-mint-sf)' }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <SparkleIcon size={18} />
            <span className="font-display text-sm">Ask Library</span>
          </div>
          <span className="text-xs" style={{ color: 'var(--pp-ink-2)' }}>
            100+ scripts to copy
          </span>
        </button>
      </div>

      {/* Last 30 days activity */}
      <div className="mb-3">
        <LastThirtyDaysStrip />
      </div>

      {/* Stat row */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <PPStat n={total} label="Attempts" bg="var(--pp-card)" />
        <PPStat n={rejections} label="Nos" bg="var(--pp-coral-sf)" />
        <PPStat n={yeses} label="Yeses" bg="var(--pp-mint-sf)" />
      </div>

      {/* Consistency */}
      <div className="pp-card pp-card-sm mb-3" style={{ padding: 14 }}>
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--pp-ink-2)' }}>
            Consistency
          </span>
          <span className="text-sm font-bold inline-flex items-center gap-1">
            {streak > 0 && <FlameIcon size={14} style={{ color: 'var(--pp-coral)' }} />}
            {streak} day{streak === 1 ? '' : 's'}
          </span>
        </div>
        <p className="text-xs" style={{ color: 'var(--pp-ink-2)', lineHeight: 1.5 }}>
          {streak === 0
            ? 'Showing up daily is the whole game. One brave ask today starts the streak.'
            : `${streak} day${streak === 1 ? '' : 's'} of doing the uncomfortable thing. Keep it alive — one ask today.`}
        </p>
        {nextMilestone && (
          <div className="text-xs mt-1.5" style={{ color: 'var(--pp-ink-3)' }}>
            Next milestone:{' '}
            <b style={{ color: 'var(--pp-grape)' }}>{nextMilestone.count.toLocaleString()}</b> —{' '}
            {nextMilestone.count - rejections} to go
          </div>
        )}
      </div>

      {/* Ask of the day */}
      <div className="pp-tip mb-3">
        <span className="pp-tip-icon">!</span>
        <div>
          <b>Ask of the day:</b> {askOfTheDay}
        </div>
      </div>

      {/* Recent */}
      <div className="flex-1 min-h-0">
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--pp-ink-2)' }}>
            Recent
          </span>
          {entries.length > 3 && (
            <button
              onClick={onSeeAll}
              className="text-xs font-bold cursor-pointer"
              style={{ color: 'var(--pp-coral)' }}
            >
              See all →
            </button>
          )}
        </div>
        {entries.length === 0 ? (
          <div
            className="pp-card pp-card-sm text-center"
            style={{
              padding: '20px 16px',
              background: 'var(--pp-card-2)',
            }}
          >
            <p className="text-sm" style={{ color: 'var(--pp-ink-2)' }}>
              Tap the <span className="font-bold" style={{ color: 'var(--pp-coral)' }}>+</span> button below to log your first ask.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-1.5 pb-2">
            {entries.slice(0, 3).map((e) => (
              <EntryRow key={e.id} entry={e} />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showLibrary && (
          <AskLibrary
            key="lib"
            initialCategory={profile.lifeArea}
            onClose={() => setShowLibrary(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function PPStat({ n, label, bg }: { n: number; label: string; bg: string }) {
  return (
    <div
      className="pp-card pp-card-sm text-center"
      style={{ padding: '12px 10px', background: bg }}
    >
      <div className="pp-num" style={{ fontSize: 24 }}>
        {n.toLocaleString()}
      </div>
      <div className="text-xs font-semibold mt-0.5" style={{ color: 'var(--pp-ink-2)' }}>
        {label}
      </div>
    </div>
  );
}

function EntryRow({ entry }: { entry: Rejection }) {
  const isYes = entry.isYes;
  return (
    <div
      className="pp-card pp-card-sm"
      style={{
        padding: '10px 12px',
        background: entry.useful ? 'var(--pp-sun-sf)' : 'var(--pp-card)',
      }}
    >
      <div className="flex items-center gap-2.5">
        <span
          className="font-bold text-xs"
          style={{
            flexShrink: 0,
            padding: '3px 10px',
            borderRadius: 999,
            background: isYes ? 'var(--pp-mint)' : 'var(--pp-coral)',
            color: '#fff',
            border: '1.5px solid var(--pp-ink)',
          }}
        >
          {isYes ? '✓ Yes' : '✕ No'}
        </span>
        <span
          className="flex-1 font-semibold text-sm truncate"
          style={{ color: 'var(--pp-ink)' }}
        >
          {entry.ask}
        </span>
        {entry.useful && (
          <span style={{ color: 'var(--pp-sun)', display: 'inline-flex' }} title="Marked useful">
            <StarIcon size={14} />
          </span>
        )}
        <span className="text-xs font-semibold" style={{ color: 'var(--pp-ink-3)' }}>
          {formatRelativeTime(entry.timestamp)}
        </span>
      </div>
    </div>
  );
}
