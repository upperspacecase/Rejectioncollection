'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import MarketingNav from '@/components/MarketingNav';
import { CheckIcon, FlameIcon, ArrowRightIcon } from '@/components/Icons';

const CARDS = [
  { ask: 'Asked for the corner office',         result: 'No',  rotate: -8, top: 60,  left: 20,  bg: 'var(--pp-card)' },
  { ask: 'Cold emailed Marc Andreessen',        result: 'No',  rotate: 4,  top: 30,  left: 110, bg: 'var(--pp-coral-sf)' },
  { ask: 'Asked for a 20% raise',               result: 'Yes', rotate: -3, top: 130, left: 70,  bg: 'var(--pp-mint-sf)' },
  { ask: 'Requested a deadline extension',      result: 'No',  rotate: 6,  top: 210, left: 30,  bg: 'var(--pp-card)' },
  { ask: 'Pitched the keynote idea',            result: 'No',  rotate: -5, top: 280, left: 120, bg: 'var(--pp-sun-sf)' },
  { ask: 'Asked Jess out for coffee',           result: 'Yes', rotate: 3,  top: 350, left: 60,  bg: 'var(--pp-card)' },
];

const STATS = [
  { num: '8,492', label: 'nos logged this week',  bg: 'var(--pp-coral-sf)' },
  { num: '1,318', label: 'yeses (still counted!)', bg: 'var(--pp-mint-sf)' },
  { num: '127',   label: 'collectors online now',  bg: 'var(--pp-sky-sf)' },
  { num: '37',    label: 'milestones hit today',   bg: 'var(--pp-sun-sf)' },
];

export default function LandingPage() {
  useEffect(() => {
    document.body.classList.add('scroll-page');
    return () => document.body.classList.remove('scroll-page');
  }, []);

  return (
    <div
      className="pp-dots min-h-screen"
      style={{ background: 'var(--pp-bg)', backgroundSize: '18px 18px' }}
    >
      <MarketingNav active={null} hero />

      <main
        className="grid items-center"
        style={{
          padding: '32px 32px 0',
          gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)',
          gap: 48,
          maxWidth: 1280,
          margin: '0 auto',
        }}
      >
        <div>
          <span
            className="pp-pill mb-4 inline-flex"
            style={{ background: 'var(--pp-mint-sf)' }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: 'var(--pp-mint)',
                boxShadow: '0 0 0 3px rgba(34,199,146,0.25)',
              }}
            />
            4,217 collectors logging this week
          </span>

          <h1
            className="font-display mb-5"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 4.75rem)', lineHeight: 1 }}
          >
            Collect every{' '}
            <span
              className="inline-block"
              style={{
                padding: '0 14px',
                background: 'var(--pp-coral)',
                color: '#fff',
                borderRadius: 14,
                transform: 'rotate(-2deg)',
                boxShadow: 'var(--pp-shadow)',
                border: '2px solid var(--pp-ink)',
              }}
            >
              no
            </span>
            <br />
            like it&rsquo;s a trading card.
          </h1>

          <p
            className="mb-7"
            style={{
              fontSize: 18,
              lineHeight: 1.55,
              color: 'var(--pp-ink-2)',
              maxWidth: 520,
            }}
          >
            The friendliest way to build rejection muscle. Log every ask, watch your streak
            grow, and turn &ldquo;no&rdquo; from something scary into something you collect on purpose.
          </p>

          <div className="flex items-center gap-3.5 mb-7 flex-wrap">
            <Link
              href="/"
              className="pp-btn pp-btn-primary"
              style={{ padding: '14px 22px', fontSize: 15 }}
            >
              Start collecting
              <ArrowRightIcon size={16} />
            </Link>
            <Link
              href="/about"
              className="pp-btn"
              style={{ padding: '14px 22px', fontSize: 15, background: 'var(--pp-card)' }}
            >
              See how it works
            </Link>
          </div>

          <div className="flex items-center flex-wrap gap-4 text-sm" style={{ color: 'var(--pp-ink-3)' }}>
            {[
              'Free forever',
              'No card',
              '30-second setup',
            ].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <span
                  className="inline-flex items-center justify-center"
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 999,
                    background: 'var(--pp-mint)',
                    border: '1.5px solid var(--pp-ink)',
                    color: '#fff',
                  }}
                >
                  <CheckIcon size={10} strokeWidth={3} />
                </span>
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="relative hidden md:block" style={{ height: 460 }}>
          {CARDS.map((c, i) => (
            <div
              key={i}
              className="pp-card absolute"
              style={{
                top: c.top,
                left: c.left,
                width: 280,
                padding: '14px 16px',
                background: c.bg,
                transform: `rotate(${c.rotate}deg)`,
                zIndex: i,
              }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className="pp-pill"
                  style={{
                    padding: '3px 10px',
                    fontSize: 11,
                    background: c.result === 'Yes' ? 'var(--pp-mint)' : 'var(--pp-coral)',
                    color: '#fff',
                  }}
                >
                  {c.result === 'Yes' ? '✓ Yes' : '✕ No'}
                </span>
                <span
                  className="text-xs"
                  style={{ color: 'var(--pp-ink-3)', fontFamily: 'DM Mono, monospace' }}
                >
                  #{1000 + i}
                </span>
              </div>
              <div className="font-display" style={{ fontSize: 16, lineHeight: 1.2 }}>
                {c.ask}
              </div>
            </div>
          ))}

          <div
            className="pp-sticker absolute"
            style={{
              top: 14,
              right: 0,
              background: 'var(--pp-sun)',
              transform: 'rotate(8deg)',
            }}
          >
            +127 this week
          </div>
          <div
            className="pp-sticker absolute inline-flex items-center gap-1.5"
            style={{
              bottom: 30,
              left: -10,
              background: 'var(--pp-mint)',
              color: '#fff',
              transform: 'rotate(-6deg)',
            }}
          >
            <FlameIcon size={13} style={{ color: '#fff' }} /> 9-day streak
          </div>
        </div>
      </main>

      <section style={{ padding: '48px 32px 56px', maxWidth: 1280, margin: '0 auto' }}>
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          }}
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              className="pp-card"
              style={{ padding: '14px 16px', background: s.bg }}
            >
              <div className="pp-num" style={{ fontSize: 28 }}>
                {s.num}
              </div>
              <div className="text-xs mt-1" style={{ color: 'var(--pp-ink-2)' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
