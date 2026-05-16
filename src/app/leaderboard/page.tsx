import type { Metadata } from 'next';
import Link from 'next/link';
import MarketingNav from '@/components/MarketingNav';
import ScrollPageBodyToggle from '@/components/ScrollBodyToggle';
import { ArrowRightIcon, TrophyIcon } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Leaderboard — Brazen',
  description: 'The only scoreboard where more nos mean you’re winning.',
};

export default function PublicLeaderboard() {
  return (
    <div
      className="min-h-dvh px-5 md:px-8 pt-8 md:pt-10 pb-14"
      style={{ background: 'var(--pp-bg)' }}
    >
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
          <h2 className="font-display text-2xl mb-2">Sign in to see the leaderboard.</h2>
          <p
            className="mb-5 mx-auto"
            style={{ fontSize: 15, color: 'var(--pp-ink-2)', maxWidth: 420, lineHeight: 1.55 }}
          >
            The Board is for collectors only — log your first rejection to plant your flag and
            check who&rsquo;s ahead.
          </p>
          <Link href="/" className="pp-btn pp-btn-primary" style={{ padding: '12px 22px' }}>
            Sign in to see it
            <ArrowRightIcon size={16} />
          </Link>
        </div>

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
