'use client';

import { useMemo } from 'react';
import { useStore } from '@/lib/store';
import { getRejections } from '@/lib/utils';

const CELL = 12;
const GAP = 3;
const STEP = CELL + GAP;

type Level = 0 | 1 | 2 | 3 | 4;

interface Cell {
  date: Date;
  count: number;
  level: Level;
  inRange: boolean;
}

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

export default function ContributionHeatmap() {
  const { state } = useStore();
  const rejections = getRejections(state.entries);

  const { weeks, total, monthLabels } = useMemo(() => {
    const counts = new Map<string, number>();
    for (const r of rejections) {
      const k = dayKey(new Date(r.timestamp));
      counts.set(k, (counts.get(k) ?? 0) + 1);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastSunday = new Date(today);
    lastSunday.setDate(lastSunday.getDate() - lastSunday.getDay());

    const start = new Date(lastSunday);
    start.setDate(start.getDate() - 52 * 7);

    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    let totalCount = 0;
    const w: Cell[][] = [];
    const cursor = new Date(start);

    for (let wi = 0; wi < 53; wi++) {
      const week: Cell[] = [];
      for (let di = 0; di < 7; di++) {
        const cellDate = new Date(cursor);
        cellDate.setHours(0, 0, 0, 0);
        const count = counts.get(dayKey(cellDate)) ?? 0;
        const inRange = cellDate >= oneYearAgo && cellDate <= today;
        if (inRange) totalCount += count;
        week.push({ date: cellDate, count, level: levelFor(count), inRange });
        cursor.setDate(cursor.getDate() + 1);
      }
      w.push(week);
    }

    const labels: { weekIndex: number; label: string }[] = [];
    let last = -1;
    w.forEach((week, i) => {
      const firstInRange = week.find((c) => c.inRange);
      if (!firstInRange) return;
      const m = firstInRange.date.getMonth();
      if (m !== last) {
        last = m;
        labels.push({
          weekIndex: i,
          label: firstInRange.date.toLocaleDateString('en-US', { month: 'short' }),
        });
      }
    });

    return { weeks: w, total: totalCount, monthLabels: labels };
  }, [rejections]);

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
            {total === 1 ? 'rejection' : 'rejections'} in the last year
          </span>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-hide -mx-1 px-1 pb-1">
        <div className="flex gap-1.5" style={{ minWidth: 'fit-content' }}>
          {/* Day labels */}
          <div
            className="flex flex-col flex-shrink-0"
            style={{ gap: GAP, paddingTop: 14, width: 24 }}
          >
            {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((d, i) => (
              <div
                key={i}
                className="text-[9px] font-bold"
                style={{
                  height: CELL,
                  lineHeight: `${CELL}px`,
                  color: 'var(--pp-ink-3)',
                }}
              >
                {d}
              </div>
            ))}
          </div>

          <div>
            {/* Month labels */}
            <div className="relative" style={{ height: 14 }}>
              {monthLabels.map(({ weekIndex, label }) => (
                <div
                  key={`${weekIndex}-${label}`}
                  className="absolute text-[9px] font-bold"
                  style={{
                    left: weekIndex * STEP,
                    top: 0,
                    color: 'var(--pp-ink-3)',
                  }}
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Grid */}
            <div className="flex" style={{ gap: GAP }}>
              {weeks.map((week, w) => (
                <div key={w} className="flex flex-col" style={{ gap: GAP }}>
                  {week.map((cell, d) => (
                    <div
                      key={d}
                      title={
                        cell.inRange
                          ? `${cell.date.toLocaleDateString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                            })} — ${cell.count} ${cell.count === 1 ? 'rejection' : 'rejections'}`
                          : ''
                      }
                      style={{
                        width: CELL,
                        height: CELL,
                        borderRadius: 3,
                        background: cell.inRange ? LEVEL_BG[cell.level] : 'transparent',
                        border: cell.inRange
                          ? '1px solid var(--pp-ink)'
                          : '1px solid transparent',
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-1.5 mt-2">
        <span
          className="text-[9px] font-bold"
          style={{ color: 'var(--pp-ink-3)' }}
        >
          Less
        </span>
        {([0, 1, 2, 3, 4] as Level[]).map((l) => (
          <div
            key={l}
            style={{
              width: CELL,
              height: CELL,
              borderRadius: 3,
              background: LEVEL_BG[l],
              border: '1px solid var(--pp-ink)',
            }}
          />
        ))}
        <span
          className="text-[9px] font-bold"
          style={{ color: 'var(--pp-ink-3)' }}
        >
          More
        </span>
      </div>
    </div>
  );
}
