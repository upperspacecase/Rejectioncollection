'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import MarketingNav from '@/components/MarketingNav';
import ScrollPageBodyToggle from '@/components/ScrollBodyToggle';
import { ArrowRightIcon, TrophyIcon, FlameIcon, MedalIcon } from '@/components/Icons';

interface LeaderboardRow {
  name: string;
  rejectionCount: number;
  streak: number;
}

export default function PublicLeaderboard() {
  const [board, setBoard] = useState<LeaderboardRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'leaderboard'),
      orderBy('rejectionCount', 'desc'),
      limit(50)
    );

    getDocs(q)
      .then((snapshot) => {
        const rows: LeaderboardRow[] = [];
        snapshot.forEach((doc) => rows.push(doc.data() as LeaderboardRow));
        setBoard(rows);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const top = board.slice(0, 3);
  const rest = board.slice(3);
  const topBg = ['var(--pp-sun)', 'var(--pp-bg-deep)', 'var(--pp-coral-sf)'];

  return (
    <div className="min-h-screen" style={{ background: 'var(--pp-bg)', padding: '40px 32px 56px' }}>
      <ScrollPageBodyToggle />
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <MarketingNav active="leaderboard" />

        <span className="pp-pill mb-4 inline-flex" style={{ background: 'var(--pp-sun-sf)' }}>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--pp-sun)' }} />
          The Board
        </span>

        <h1 className="font-display mb-3" style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)' }}>
          The leaderboard
          <br />
          with no losers.
        </h1>
        <p
          className="mb-10"
          style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--pp-ink-2)', maxWidth: 580 }}
        >
          Ranked by total rejections collected. The only scoreboard where more no&rsquo;s mean
          you&rsquo;re winning.
        </p>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="pp-spinner" />
          </div>
        ) : board.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {top.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mb-5">
                {top.map((t, i) => (
                  <div
                    key={i}
                    className="pp-card text-center"
                    style={{ padding: '18px 12px', background: topBg[i] }}
                  >
                    <div className="flex justify-center mb-2">
                      <MedalIcon rank={(i + 1) as 1 | 2 | 3} size={36} />
                    </div>
                    <div className="pp-num" style={{ fontSize: 26 }}>
                      {t.rejectionCount.toLocaleString()}
                    </div>
                    <div className="text-sm font-bold mt-1 truncate">{t.name}</div>
                    {t.streak > 0 && (
                      <div
                        className="text-xs font-semibold mt-1 inline-flex items-center gap-1"
                        style={{ color: 'var(--pp-ink-2)' }}
                      >
                        <FlameIcon size={12} style={{ color: 'var(--pp-coral)' }} />
                        {t.streak}d
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div className="flex flex-col gap-1.5">
              {rest.map((row, i) => (
                <div
                  key={i}
                  className="pp-card pp-card-sm flex items-center gap-3"
                  style={{ padding: '10px 14px' }}
                >
                  <span className="pp-num" style={{ fontSize: 16, width: 28, opacity: 0.7 }}>
                    {i + 4}
                  </span>
                  <span className="flex-1 font-semibold text-sm truncate">{row.name}</span>
                  {row.streak > 0 && (
                    <span
                      className="inline-flex items-center gap-1 text-xs font-bold"
                      style={{
                        padding: '2px 8px',
                        borderRadius: 999,
                        background: 'var(--pp-sun-sf)',
                        color: 'var(--pp-ink)',
                        border: '1.5px solid var(--pp-ink)',
                      }}
                    >
                      <FlameIcon size={10} style={{ color: 'var(--pp-coral)' }} />
                      {row.streak}d
                    </span>
                  )}
                  <span className="pp-num" style={{ fontSize: 16 }}>
                    {row.rejectionCount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="pp-tip mt-8">
          <span className="pp-tip-icon">?</span>
          <div>
            <b>Curious how it ranks?</b> We sort by total nos collected. Streaks and useful-rejections
            show up as little badges next to your name.
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div
      className="pp-card text-center"
      style={{ padding: 40, background: 'var(--pp-card-2)' }}
    >
      <div
        className="mx-auto mb-4 flex items-center justify-center"
        style={{
          width: 88,
          height: 88,
          borderRadius: 22,
          background: 'var(--pp-sun)',
          border: '2px solid var(--pp-ink)',
          boxShadow: 'var(--pp-shadow-lg)',
          transform: 'rotate(-6deg)',
        }}
      >
        <TrophyIcon size={44} />
      </div>
      <h2 className="font-display text-2xl mb-2">The board is wide open!</h2>
      <p
        className="mb-5 mx-auto"
        style={{ fontSize: 15, color: 'var(--pp-ink-2)', maxWidth: 420, lineHeight: 1.55 }}
      >
        Sign in and log your first rejection to plant your flag at #1. (You only have to beat zero.)
      </p>
      <Link
        href="/"
        className="pp-btn pp-btn-primary"
        style={{ padding: '12px 22px' }}
      >
        Claim the top spot
        <ArrowRightIcon size={16} />
      </Link>
    </div>
  );
}
