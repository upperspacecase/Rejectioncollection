'use client';

import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import { CHALLENGE, TOTAL_MISSIONS, getCurrentWeek } from '@/lib/challenge';
import { CheckIcon, BoltIcon } from './Icons';

export default function ChallengeView() {
  const { state, toggleMission } = useStore();
  const { profile } = state;
  const done = profile.completedMissions ?? [];
  const currentWeek = getCurrentWeek(profile.joinDate);
  const progress = TOTAL_MISSIONS === 0 ? 0 : done.length / TOTAL_MISSIONS;

  return (
    <div className="h-full flex flex-col px-5 pt-4 pb-2 overflow-y-auto">
      <div className="flex items-center gap-2.5 mb-3">
        <BoltIcon size={22} style={{ color: 'var(--pp-coral)' }} />
        <div>
          <h1 className="font-display text-2xl leading-none">The Courage Challenge</h1>
          <p className="text-xs mt-0.5" style={{ color: 'var(--pp-ink-3)' }}>
            30 days · guided missions
          </p>
        </div>
      </div>

      {/* Overall progress */}
      <div className="pp-card pp-card-sm mb-3" style={{ padding: 14 }}>
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--pp-ink-2)' }}>
            Missions done
          </span>
          <span className="text-sm font-bold">
            {done.length} / {TOTAL_MISSIONS}
          </span>
        </div>
        <div
          className="relative overflow-hidden"
          style={{ height: 12, background: 'var(--pp-bg-deep)', border: '1.5px solid var(--pp-ink)', borderRadius: 999 }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ height: '100%', background: 'var(--pp-coral)', borderRadius: 999 }}
          />
        </div>
      </div>

      {/* Weeks */}
      <div className="flex flex-col gap-3 pb-2">
        {CHALLENGE.map((wk) => {
          const isCurrent = wk.week === currentWeek;
          return (
            <div
              key={wk.week}
              className="pp-card"
              style={{
                padding: 16,
                background: isCurrent ? 'var(--pp-sun-sf)' : 'var(--pp-card)',
                boxShadow: isCurrent ? 'var(--pp-shadow)' : 'var(--pp-shadow-sm)',
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--pp-ink-3)' }}>
                  Week {wk.week}
                </span>
                {isCurrent && (
                  <span className="pp-pill" style={{ background: 'var(--pp-coral)', color: '#fff', fontSize: 10 }}>
                    This week
                  </span>
                )}
              </div>
              <div className="font-display text-lg mb-1">{wk.title}</div>
              <p className="text-sm mb-3" style={{ color: 'var(--pp-ink-2)', lineHeight: 1.5 }}>
                {wk.theme}
              </p>

              <div className="flex flex-col gap-1.5">
                {wk.missions.map((m) => {
                  const checked = done.includes(m.id);
                  return (
                    <button
                      key={m.id}
                      onClick={() => toggleMission(m.id)}
                      className="flex items-start gap-2.5 cursor-pointer text-left"
                      style={{
                        background: 'var(--pp-card-2)',
                        border: '1.5px solid var(--pp-ink)',
                        borderRadius: 12,
                        padding: '10px 12px',
                      }}
                    >
                      <span
                        className="flex-shrink-0 inline-flex items-center justify-center"
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 6,
                          background: checked ? 'var(--pp-mint)' : 'transparent',
                          border: '2px solid var(--pp-ink)',
                          color: '#fff',
                          marginTop: 1,
                        }}
                      >
                        {checked && <CheckIcon size={12} strokeWidth={3} />}
                      </span>
                      <span
                        className="flex-1 text-sm font-medium"
                        style={{
                          color: checked ? 'var(--pp-ink-3)' : 'var(--pp-ink)',
                          textDecoration: checked ? 'line-through' : 'none',
                          lineHeight: 1.45,
                        }}
                      >
                        {m.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
