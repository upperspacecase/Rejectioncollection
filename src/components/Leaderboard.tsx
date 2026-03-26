'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/lib/auth';

interface LeaderboardRow {
  uid: string;
  name: string;
  rejectionCount: number;
  streak: number;
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

  if (loading) {
    return (
      <div className="flex flex-col h-full items-center justify-center">
        <div className="w-4 h-4 border border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-foreground font-serif font-light text-2xl">The Board</h2>
        {userRank > 0 && (
          <span className="text-secondary text-[10px] font-mono uppercase tracking-widest">
            You&apos;re #{userRank}
          </span>
        )}
      </div>

      {board.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-secondary font-mono text-[10px] uppercase tracking-widest">
            No collectors yet. Be the first.
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-1 pr-1">
          {board.map((entry, i) => {
            const isMe = entry.uid === user?.uid;
            return (
              <motion.div
                key={entry.uid}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03, duration: 0.2 }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isMe
                    ? 'border border-accent/20 bg-accent/5'
                    : 'border border-transparent hover:border-border-light'
                }`}
              >
                <span
                  className={`w-8 text-right font-mono text-xs ${
                    i < 3 ? 'text-accent' : isMe ? 'text-foreground' : 'text-muted'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <span
                  className={`flex-1 font-serif font-light text-base truncate ${
                    isMe ? 'text-foreground' : 'text-secondary'
                  }`}
                >
                  {isMe ? `${entry.name} (you)` : entry.name}
                </span>

                {entry.streak > 0 && (
                  <span className="text-accent text-[10px] font-mono uppercase tracking-wider">
                    {entry.streak}d
                  </span>
                )}

                <span
                  className={`font-mono text-xs tabular-nums ${
                    isMe ? 'text-accent' : 'text-foreground'
                  }`}
                >
                  {entry.rejectionCount.toLocaleString()}
                </span>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
