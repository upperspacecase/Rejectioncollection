'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { useAuth } from '@/lib/auth';
import {
  getRejections,
  getYeses,
  getStreak,
  getYearlyRejections,
} from '@/lib/utils';
import { getAchievedMilestones } from '@/lib/milestones';
import { CheckIcon, TrophyIcon, FlameIcon } from './Icons';

export default function MeTab() {
  const { state, updateName } = useStore();
  const { user, signOut } = useAuth();
  const [editing, setEditing] = useState(false);
  const [draftName, setDraftName] = useState(state.profile.name);

  const rejections = getRejections(state.entries).length;
  const yeses = getYeses(state.entries).length;
  const streak = getStreak(state.entries);
  const yearly = getYearlyRejections(state.entries);
  const achieved = getAchievedMilestones(rejections);
  const joined = new Date(state.profile.joinDate).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const initial = (state.profile.name || 'A').trim().charAt(0).toUpperCase() || 'A';

  function saveName() {
    updateName(draftName);
    setEditing(false);
  }

  return (
    <div className="h-full flex flex-col px-5 pt-4 pb-2 overflow-y-auto">
      <h1 className="font-display text-2xl mb-3">Profile</h1>

      <div className="pp-card mb-3" style={{ padding: 18, background: 'var(--pp-card)' }}>
        <div className="flex items-center gap-4">
          <div
            className="flex items-center justify-center font-display text-3xl font-bold"
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: 'var(--pp-coral)',
              color: '#fff',
              border: '2.5px solid var(--pp-ink)',
              boxShadow: 'var(--pp-shadow)',
              transform: 'rotate(-4deg)',
            }}
          >
            {initial}
          </div>
          <div className="flex-1 min-w-0">
            {editing ? (
              <input
                type="text"
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                placeholder="Your name"
                autoFocus
                className="w-full px-3 py-2 text-base font-bold outline-none"
                style={{
                  border: '2px solid var(--pp-ink)',
                  borderRadius: 10,
                  background: 'var(--pp-card-2)',
                  color: 'var(--pp-ink)',
                  boxShadow: 'var(--pp-shadow-sm)',
                }}
              />
            ) : (
              <div className="font-display text-xl truncate">
                {state.profile.name || 'Anonymous'}
              </div>
            )}
            <div className="text-xs font-semibold mt-1" style={{ color: 'var(--pp-ink-3)' }}>
              Collecting since {joined}
            </div>
          </div>
          {editing ? (
            <button
              onClick={saveName}
              className="pp-btn pp-btn-mint"
              style={{ padding: '8px 12px', fontSize: 12, minHeight: 0 }}
            >
              <CheckIcon size={14} strokeWidth={3} />
              Save
            </button>
          ) : (
            <button
              onClick={() => {
                setDraftName(state.profile.name);
                setEditing(true);
              }}
              className="pp-btn pp-btn-ghost"
              style={{ padding: '8px 12px', fontSize: 12, minHeight: 0 }}
            >
              Edit
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <StatCard label="Nos collected" n={rejections} bg="var(--pp-coral-sf)" />
        <StatCard label="Yeses" n={yeses} bg="var(--pp-mint-sf)" />
        <StatCard label={`${new Date().getFullYear()} year`} n={yearly} bg="var(--pp-sun-sf)" />
        <StatCard
          label="Current streak"
          n={streak}
          suffix={streak === 1 ? ' day' : ' days'}
          bg="var(--pp-grape-sf)"
          icon={streak > 0 ? <FlameIcon size={16} style={{ color: 'var(--pp-coral)' }} /> : null}
        />
      </div>

      <div className="pp-card pp-card-sm mb-3" style={{ padding: 14, background: 'var(--pp-card)' }}>
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--pp-ink-2)' }}>
            Milestones
          </span>
          <span className="text-xs font-bold" style={{ color: 'var(--pp-ink-3)' }}>
            {achieved.length} hit
          </span>
        </div>
        {achieved.length === 0 ? (
          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--pp-ink-3)' }}>
            <TrophyIcon size={24} />
            No milestones yet. Your first is at 1.
          </div>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {achieved.map((m) => (
              <span key={m.count} className="pp-pill" style={{ background: 'var(--pp-grape-sf)' }}>
                <TrophyIcon size={12} /> {m.count.toLocaleString()}
              </span>
            ))}
          </div>
        )}
      </div>

      {user?.email && (
        <div className="text-xs font-semibold mb-3" style={{ color: 'var(--pp-ink-3)' }}>
          Signed in as {user.email}
        </div>
      )}

      <button
        onClick={signOut}
        className="pp-btn pp-btn-ghost w-full"
        style={{ padding: '12px 0' }}
      >
        Sign out
      </button>
    </div>
  );
}

function StatCard({
  label,
  n,
  bg,
  suffix,
  icon,
}: {
  label: string;
  n: number;
  bg: string;
  suffix?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="pp-card pp-card-sm" style={{ padding: '14px 12px', background: bg }}>
      <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--pp-ink-2)' }}>
        {label}
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="pp-num" style={{ fontSize: 28 }}>
          {n.toLocaleString()}
        </span>
        {suffix && (
          <span className="text-xs font-semibold" style={{ color: 'var(--pp-ink-2)' }}>
            {suffix}
          </span>
        )}
        {icon && <span className="ml-auto">{icon}</span>}
      </div>
    </div>
  );
}
