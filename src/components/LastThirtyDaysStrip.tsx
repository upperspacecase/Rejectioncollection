'use client';

import { useMemo } from 'react';
import { useStore } from '@/lib/store';

const DAYS = 30;
const DOT = 10;
const GAP = 4;

type Level = 0 | 1 | 2 | 3 | 4;

function dayKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function levelFor(count: number): Level {
  if (count === 0) return 0;
  if (count === 1) return 1;
  if (count === 2) return 2;
  if (count === 3) return 3;
  return 4;
}

const LEVEL_BG: Record<Level, string> = {
  0: 'var(--pp-bg-deep)',
  1: 'var(--pp-coral-sf)',
  2: '#FF9C7F',
  3: 'var(--pp-coral)',
  4: 'var(--pp-coral-dk)',
};

export default function LastThirtyDaysStrip() {
  const { state } = useStore();

  const { days, total } = useMemo(() => {
    const counts = new Map<string, number>();
    for (const e of state.entries) {
      const k = dayKey(new Date(e.timestamp));
      counts.set(k, (counts.get(k) ?? 0) + 1);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const out: { date: Date; count: number; level: Level; isToday: boolean }[] = [];
    let totalCount = 0;
    for (let i = DAYS - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const count = counts.get(dayKey(d)) ?? 0;
      totalCount += count;
      out.push({ date: d, count, level: levelFor(count), isToday: i === 0 });
    }

    return { days: out, total: totalCount };
  }, [state.entries]);

  return (
    <div
      className="pp-card pp-card-sm"
      style={{ padding: 14, background: 'var(--pp-card)' }}
    >
      <div className="flex items-baseline justify-between mb-2">
        <div>
          <span className="pp-num" style={{ fontSize: 22 }}>
            {total.toLocaleString()}
          </span>
          <span
            className="ml-1.5 text-sm font-semibold"
            style={{ color: 'var(--pp-ink-2)' }}
          >
            {total === 1 ? 'ask' : 'asks'} in the last 30 days
          </span>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-hide -mx-1 px-1 pb-1">
        <div
          className="flex items-end"
          style={{ gap: GAP, minWidth: 'fit-content' }}
        >
          {days.map((d, i) => (
            <div
              key={i}
              title={`${d.date.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })} — ${d.count} ${d.count === 1 ? 'ask' : 'asks'}`}
              style={{
                width: DOT,
                height: DOT,
                borderRadius: 999,
                background: LEVEL_BG[d.level],
                border: d.isToday
                  ? '1.5px solid var(--pp-ink)'
                  : '1px solid var(--pp-ink)',
                boxShadow: d.isToday ? '0 0 0 2px var(--pp-sun)' : undefined,
              }}
            />
          ))}
        </div>
      </div>

      <div
        className="flex items-center justify-between mt-2 text-[10px] font-bold"
        style={{ color: 'var(--pp-ink-3)' }}
      >
        <span>30 days ago</span>
        <span>Today</span>
      </div>
    </div>
  );
}
