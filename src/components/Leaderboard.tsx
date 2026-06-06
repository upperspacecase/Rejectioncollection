'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/lib/auth';
import { MedalIcon, FlameIcon, TrophyIcon } from './Icons';

interface LeaderboardRow {
  uid: string;
  name: string;
  rejectionCount: number;
  streak: number;
  foundingMemberNumber?: number;
}

function FounderBadge({ inverted }: { inverted?: boolean }) {
  return (
    <span
      title="Founding member"
      className="inline-flex items-center justify-center"
      style={{
        width: 14,
        height: 14,
        borderRadius: 999,
        background: inverted ? 'rgba(255,255,255,0.25)' : 'var(--pp-coral)',
        border: `1.5px solid ${inverted ? 'rgba(255,255,255,0.5)' : 'var(--pp-ink)'}`,
        color: inverted ? '#fff' : '#fff',
        fontFamily: "'Bricolage Grotesque', Georgia, serif",
        fontWeight: 800,
        fontSize: 8,
        lineHeight: 1,
      }}
    >
      F
    </span>
  );
}

export default function Leaderboard() {
  const { user } = useAuth();
  const [board, setBoard] = useState<LeaderboardRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'leaderboard'),
      orderBy('rejectionCount', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const rows: LeaderboardRow[] = [];
      snapshot.forEach((doc) => {
        rows.push({ uid: doc.id, ...doc.data() } as LeaderboardRow);
      });
      setBoard(rows);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const userRank = board.findIndex((e) => e.uid === user?.uid) + 1;
  const top = board.slice(0, 3);
  const rest = board.slice(3);
  const topBg = ['var(--pp-sun)', 'var(--pp-bg-deep)', 'var(--pp-coral-sf)'];

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="pp-spinner" />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col px-5 pt-4 pb-2">
      <div className="flex justify-between items-end mb-3">
        <div>
          <h1 className="font-display text-2xl">The Board</h1>
          <p className="text-sm" style={{ color: 'var(--pp-ink-3)' }}>
            The bravest 50 this year
          </p>
        </div>
        {userRank > 0 && (
          <span className="pp-pill" style={{ background: 'var(--pp-coral-sf)' }}>
            You&rsquo;re #{userRank}
          </span>
        )}
      </div>

      {board.length === 0 ? (
        <EmptyBoard />
      ) : (
        <>
          {top.length > 0 && (
            <div className="grid grid-cols-3 gap-1.5 mb-3">
              {top.map((t, i) => (
                <Link
                  key={t.uid}
                  href={`/u/${t.uid}`}
                  className="pp-card text-center"
                  style={{ padding: '12px 8px', background: topBg[i] }}
                >
                  <div className="flex justify-center mb-1">
                    <MedalIcon rank={(i + 1) as 1 | 2 | 3} size={28} />
                  </div>
                  <div className="pp-num" style={{ fontSize: 22 }}>
                    {t.rejectionCount.toLocaleString()}
                  </div>
                  <div className="text-xs font-bold mt-0.5 truncate flex items-center justify-center gap-1">
                    {t.foundingMemberNumber !== undefined && <FounderBadge />}
                    {t.uid === user?.uid ? `${t.name} (you)` : t.name}
                  </div>
                  {t.streak > 0 && (
                    <div
                      className="text-[10px] font-semibold mt-0.5 inline-flex items-center justify-center gap-1"
                      style={{ color: 'var(--pp-ink-2)' }}
                    >
                      <FlameIcon size={10} style={{ color: 'var(--pp-coral)' }} />
                      {t.streak}d
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}

          <div className="flex-1 overflow-y-auto flex flex-col gap-1.5 pr-1">
            {rest.map((row, i) => {
              const isMe = row.uid === user?.uid;
              return (
                <Link key={row.uid} href={`/u/${row.uid}`} className="block">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.025, duration: 0.18 }}
                  className="pp-card pp-card-sm flex items-center gap-3"
                  style={{
                    padding: '10px 12px',
                    background: isMe ? 'var(--pp-coral)' : 'var(--pp-card)',
                    color: isMe ? '#fff' : 'var(--pp-ink)',
                  }}
                >
                  <span
                    className="pp-num text-right"
                    style={{ fontSize: 16, width: 26, opacity: isMe ? 1 : 0.7 }}
                  >
                    {i + 4}
                  </span>
                  <span className="flex-1 font-semibold text-sm truncate inline-flex items-center gap-1.5">
                    {row.foundingMemberNumber !== undefined && (
                      <FounderBadge inverted={isMe} />
                    )}
                    {isMe ? `${row.name} (you)` : row.name}
                  </span>
                  {row.streak > 0 && (
                    <span
                      className="inline-flex items-center gap-1 text-xs font-bold"
                      style={{
                        padding: '2px 8px',
                        borderRadius: 999,
                        background: isMe ? 'rgba(255,255,255,0.25)' : 'var(--pp-sun-sf)',
                        color: isMe ? '#fff' : 'var(--pp-ink)',
                        border: `1.5px solid ${isMe ? 'rgba(255,255,255,0.5)' : 'var(--pp-ink)'}`,
                      }}
                    >
                      <FlameIcon size={10} style={{ color: isMe ? '#fff' : 'var(--pp-coral)' }} />
                      {row.streak}d
                    </span>
                  )}
                  <span className="pp-num" style={{ fontSize: 16 }}>
                    {row.rejectionCount.toLocaleString()}
                  </span>
                </motion.div>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function EmptyBoard() {
  return (
    <div className="pp-card text-center" style={{ padding: 28, background: 'var(--pp-card-2)' }}>
      <div
        className="mx-auto mb-3 flex items-center justify-center"
        style={{
          width: 72,
          height: 72,
          borderRadius: 18,
          background: 'var(--pp-sun)',
          border: '2px solid var(--pp-ink)',
          boxShadow: 'var(--pp-shadow-lg)',
          transform: 'rotate(-6deg)',
        }}
      >
        <TrophyIcon size={36} />
      </div>
      <h2 className="font-display text-xl mb-1">The board is wide open!</h2>
      <p className="text-sm" style={{ color: 'var(--pp-ink-2)' }}>
        Log your first rejection to plant your flag at #1.
      </p>
    </div>
  );
}
