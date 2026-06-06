'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import MarketingNav from '@/components/MarketingNav';
import Pricing from '@/components/Pricing';
import { CheckIcon, ArrowRightIcon } from '@/components/Icons';

const CARDS = [
  { ask: 'Asked for the corner office',         result: 'No',  rotate: -8, top: 60,  left: 20,  bg: 'var(--pp-card)' },
  { ask: 'Cold emailed Marc Andreessen',        result: 'No',  rotate: 4,  top: 30,  left: 110, bg: 'var(--pp-coral-sf)' },
  { ask: 'Asked for a 20% raise',               result: 'Yes', rotate: -3, top: 130, left: 70,  bg: 'var(--pp-mint-sf)' },
  { ask: 'Requested a deadline extension',      result: 'No',  rotate: 6,  top: 210, left: 30,  bg: 'var(--pp-card)' },
  { ask: 'Asked for a discount at supermarket', result: 'No',  rotate: -5, top: 280, left: 120, bg: 'var(--pp-sun-sf)' },
  { ask: 'Asked Jess out for coffee',           result: 'Yes', rotate: 3,  top: 350, left: 60,  bg: 'var(--pp-card)' },
];

const HOW_STEPS = [
  ['Do one brave ask a day.', 'A date, a discount, a raise, an intro. The discomfort is the rep.'],
  ['Log it in five seconds.', 'Tap No or Yes before your brain rewrites what happened.'],
  ['Build the streak.', 'Show up daily and the asks that scared you start to feel normal.'],
];

export default function LandingPage() {
  useEffect(() => {
    document.body.classList.add('scroll-page');
    return () => document.body.classList.remove('scroll-page');
  }, []);

  return (
    <div
      className="pp-dots min-h-dvh"
      style={{ background: 'var(--pp-bg)', backgroundSize: '18px 18px' }}
    >
      <MarketingNav active={null} hero />

      {/* HERO */}
      <main
        className="grid items-center grid-cols-1 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-8 md:gap-12 px-5 md:px-8 pt-6 md:pt-8 pb-12 md:pb-16"
        style={{ maxWidth: 1280, margin: '0 auto' }}
      >
        <div>
          <h1
            className="font-display mb-5"
            style={{ fontSize: 'clamp(2.25rem, 7vw, 4.75rem)', lineHeight: 1.05 }}
          >
            Get comfortable with the{' '}
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
              uncomfortable
            </span>
            .
          </h1>

          <p
            className="mb-7"
            style={{
              fontSize: 18,
              lineHeight: 1.55,
              color: 'var(--pp-ink-2)',
              maxWidth: 540,
            }}
          >
            Everything you want is on the other side of it. Brazen gets you doing one brave
            ask a day — logged, counted, and turned into a streak — because success is just
            doing the hard things, consistently.
          </p>

          <div className="flex items-center gap-3.5 mb-7 flex-wrap">
            <Link
              href="/app"
              className="pp-btn pp-btn-primary"
              style={{ padding: '14px 22px', fontSize: 15 }}
            >
              Start free
              <ArrowRightIcon size={16} />
            </Link>
            <Link
              href="/manifesto"
              className="pp-btn"
              style={{ padding: '14px 22px', fontSize: 15, background: 'var(--pp-card)' }}
            >
              Read the manifesto
            </Link>
          </div>

          <p className="mb-5 text-sm" style={{ color: 'var(--pp-ink-2)' }}>
            <b style={{ color: 'var(--pp-ink)' }}>143 asks</b> logged this week by early users
          </p>

          <div
            className="flex items-center flex-wrap gap-4 text-sm"
            style={{ color: 'var(--pp-ink-3)' }}
          >
            {['Free to start', 'No card', '30-second setup'].map((t) => (
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

        <div className="relative hidden md:block min-h-[460px]" style={{ height: 460 }}>
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
        </div>
      </main>

      {/* PRICING */}
      <div style={{ background: 'var(--pp-bg)' }}>
        <Pricing />
      </div>

      {/* VS NOTEBOOK */}
      <section
        className="px-5 md:px-8 py-12 md:py-16"
        style={{ background: 'var(--pp-card-2)' }}
      >
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <h2
            className="font-display mb-2"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
          >
            How it works
          </h2>
          <p className="mb-8" style={{ fontSize: 16, color: 'var(--pp-ink-2)' }}>
            Get comfortable with the uncomfortable, one ask at a time.
          </p>

          <div className="flex flex-col gap-3">
            {HOW_STEPS.map(([title, body], i) => (
              <div
                key={i}
                className="pp-card flex gap-4 items-start"
                style={{ padding: 20 }}
              >
                <span
                  className="flex items-center justify-center flex-shrink-0 font-display font-bold"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 999,
                    background: 'var(--pp-coral)',
                    color: '#fff',
                    border: '2px solid var(--pp-ink)',
                    boxShadow: 'var(--pp-shadow-sm)',
                    fontSize: 16,
                  }}
                >
                  {i + 1}
                </span>
                <div>
                  <div className="font-display text-lg mb-1">{title}</div>
                  <p style={{ fontSize: 14, color: 'var(--pp-ink-2)', lineHeight: 1.55 }}>
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REPEAT CTA */}
      <section className="px-5 md:px-8 pt-6 md:pt-8 pb-16 md:pb-20">
        <div
          className="pp-card text-center px-6 py-10 md:px-8 md:py-12"
          style={{
            maxWidth: 720,
            margin: '0 auto',
            background: 'var(--pp-coral)',
            color: '#fff',
            boxShadow: 'var(--pp-shadow-lg)',
          }}
        >
          <h2
            className="font-display mb-3"
            style={{ fontSize: 'clamp(1.75rem, 4.5vw, 2.5rem)', lineHeight: 1.1 }}
          >
            Your first uncomfortable ask is out there.
          </h2>
          <p
            className="mb-7 mx-auto"
            style={{ fontSize: 17, lineHeight: 1.55, opacity: 0.92, maxWidth: 480 }}
          >
            Sign up, do one hard ask today, log it. Free to start, no card.
          </p>
          <Link
            href="/app"
            className="pp-btn"
            style={{
              padding: '14px 26px',
              fontSize: 15,
              background: 'var(--pp-ink)',
              color: 'var(--pp-bg)',
              borderColor: 'var(--pp-bg)',
              boxShadow: '0 3px 0 rgba(0,0,0,0.5)',
            }}
          >
            Start free
            <ArrowRightIcon size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
