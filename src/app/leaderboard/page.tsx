'use client';

import { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface LeaderboardRow {
  name: string;
  rejectionCount: number;
  streak: number;
}

export default function PublicLeaderboard() {
  const [board, setBoard] = useState<LeaderboardRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Public read requires auth in rules, so we fetch what we can
    // For truly public access, we'd use a Cloud Function. For now,
    // show the board structure and invite sign-in.
    const q = query(
      collection(db, 'leaderboard'),
      orderBy('rejectionCount', 'desc'),
      limit(50)
    );

    getDocs(q)
      .then((snapshot) => {
        const rows: LeaderboardRow[] = [];
        snapshot.forEach((doc) => {
          rows.push(doc.data() as LeaderboardRow);
        });
        setBoard(rows);
      })
      .catch(() => {
        // Not authenticated -- expected for public visitors
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-y-auto" style={{ position: 'static' }}>
      <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        {/* Nav */}
        <nav className="mb-16 flex items-center justify-between">
          <a
            href="/landing"
            className="text-secondary text-[10px] font-mono uppercase tracking-[0.15em] hover:text-foreground transition-colors"
          >
            Back
          </a>
          <div className="flex gap-6">
            <a href="/about" className="text-secondary text-[10px] font-mono uppercase tracking-[0.15em] hover:text-foreground transition-colors">
              About
            </a>
            <a href="/manifesto" className="text-secondary text-[10px] font-mono uppercase tracking-[0.15em] hover:text-foreground transition-colors">
              Manifesto
            </a>
          </div>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <p className="text-secondary text-[10px] font-mono uppercase tracking-[0.2em] mb-4">Leaderboard</p>
          <h1 className="font-serif font-light text-4xl md:text-5xl lowercase leading-tight mb-4">
            the board
          </h1>
          <p className="font-serif font-light text-lg italic text-secondary">
            Ranked by total rejections collected. The only scoreboard where more &ldquo;no&rdquo;s mean you&rsquo;re winning.
          </p>
        </header>

        {/* Board */}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-4 h-4 border border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        ) : board.length > 0 ? (
          <div className="space-y-1">
            {/* Header row */}
            <div className="flex items-center gap-3 px-3 py-2 text-muted text-[9px] font-mono uppercase tracking-widest">
              <span className="w-8 text-right">Rank</span>
              <span className="flex-1">Collector</span>
              <span>Streak</span>
              <span className="w-16 text-right">Nos</span>
            </div>

            <div className="h-px bg-border-light" />

            {board.map((entry, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-3 py-3 rounded-lg border border-transparent hover:border-border-light transition-colors"
              >
                <span
                  className={`w-8 text-right font-mono text-xs ${
                    i < 3 ? 'text-accent' : 'text-muted'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <span className="flex-1 font-serif font-light text-base text-foreground/80 truncate">
                  {entry.name}
                </span>

                {entry.streak > 0 && (
                  <span className="text-accent text-[10px] font-mono uppercase tracking-wider">
                    {entry.streak}d
                  </span>
                )}

                <span className="w-16 text-right font-mono text-xs tabular-nums text-foreground">
                  {entry.rejectionCount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 space-y-4">
            <p className="font-serif font-light text-xl text-foreground/60 lowercase">
              the board is empty
            </p>
            <p className="text-secondary text-[10px] font-mono uppercase tracking-widest">
              Sign in and log your first rejection to claim the top spot.
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 pt-12 border-t border-border-light text-center">
          <a
            href="/"
            className="inline-flex items-center min-h-[44px] px-8 border border-border-light rounded-lg font-mono text-[11px] uppercase tracking-[0.15em] text-foreground hover:border-border-active transition-colors"
          >
            Start Collecting
          </a>
        </div>
      </div>
    </div>
  );
}
