'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import MarketingNav from '@/components/MarketingNav';
import Pricing from '@/components/Pricing';
import { CheckIcon, ArrowRightIcon, TrophyIcon } from '@/components/Icons';
import { MILESTONES } from '@/lib/milestones';

const CARDS = [
  { ask: 'Asked for the corner office',         result: 'No',  rotate: -8, top: 60,  left: 20,  bg: 'var(--pp-card)' },
  { ask: 'Cold emailed Marc Andreessen',        result: 'No',  rotate: 4,  top: 30,  left: 110, bg: 'var(--pp-coral-sf)' },
  { ask: 'Asked for a 20% raise',               result: 'Yes', rotate: -3, top: 130, left: 70,  bg: 'var(--pp-mint-sf)' },
  { ask: 'Requested a deadline extension',      result: 'No',  rotate: 6,  top: 210, left: 30,  bg: 'var(--pp-card)' },
  { ask: 'Pitched the keynote idea',            result: 'No',  rotate: -5, top: 280, left: 120, bg: 'var(--pp-sun-sf)' },
  { ask: 'Asked Jess out for coffee',           result: 'Yes', rotate: 3,  top: 350, left: 60,  bg: 'var(--pp-card)' },
];

const HOW = [
  ['Ask', 'Coffee, a raise, an intro, a discount, an extension. The muscle is the same.'],
  ['Log', 'Five seconds. Type the ask, tap No or Yes. Done.'],
  ['Watch the number climb', 'Streaks, nine milestones from 1 to 1,000, leaderboard if you want company.'],
];

const VS_NOTEBOOK = [
  ['A notebook can’t do streak math.', 'This counts each day you showed up — and breaks if you skip.'],
  ['A notebook lets you rewrite the story.', 'Logged in five seconds, before your brain edits what happened.'],
  ['A notebook doesn’t level up.', 'You hit 1, then 10, then 100, then 1,000. Each one a moment.'],
];

const FAQ = [
  [
    'What counts as a "no"?',
    'Any ask that didn’t go your way — outright refusal, soft brush-off, silence. After a week with no reply, log it as a no. Don’t let your brain rewrite it.',
  ],
  [
    'What if I don’t get rejected often?',
    'That’s the point. The app exists to make you ask more, not to score the asks you’d make anyway. The number only climbs when you put yourself in front of an answer.',
  ],
  [
    'Is it free?',
    'The Core app is free forever — unlimited logs, streaks, milestones, leaderboard, heatmap. The paid tier ($5/mo or $35/year) launches after the first 50 founding members are seated. Those 50 founders stay free for life.',
  ],
  [
    'What’s a founding member?',
    'One of the first 50 people to sign up. Founders get the paid tier free forever, a permanent badge on the leaderboard, and access to the founding group chat — where we decide what to build next based on what you ask for.',
  ],
  [
    'When does the paid tier launch?',
    'When the 50 founders are seated. We’re building features — weekly digest, year-in-review, public profile, phrase templates — in the order founders ask for them.',
  ],
  [
    'Is my data private?',
    'Your entries are yours alone. Only your display name and total count appear on the leaderboard — nothing about what you asked for.',
  ],
  [
    'Can I mark a rejection as useful?',
    'Yes. Some nos come with feedback, a referral, or a door you didn’t see. Star them. They show up filtered in your log.',
  ],
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
            The scoreboard for people who ask for things
          </span>

          <h1
            className="font-display mb-5"
            style={{ fontSize: 'clamp(2.25rem, 7vw, 4.75rem)', lineHeight: 1.05 }}
          >
            Get told{' '}
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
            </span>{' '}
            1,000 times this year.
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
            A five-second log, three times a day. The number that used to scare you becomes the
            one you&rsquo;re proud of. By December you&rsquo;re asking for things you wouldn&rsquo;t
            have considered in January.
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
              href="/manifesto"
              className="pp-btn"
              style={{ padding: '14px 22px', fontSize: 15, background: 'var(--pp-card)' }}
            >
              Read the manifesto
            </Link>
          </div>

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

      {/* TENSION HOOK */}
      <section
        className="px-5 md:px-8 py-12 md:py-16"
        style={{
          background: 'var(--pp-bg-deep)',
          borderTop: '2px solid var(--pp-ink)',
          borderBottom: '2px solid var(--pp-ink)',
        }}
      >
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div className="flex flex-col gap-4 mb-6">
            {[
              'You’ve been drafting that email for six weeks.',
              'You haven’t asked for the raise because what if they say no.',
              'You walked past the corner table and sat at the bad one anyway.',
            ].map((line) => (
              <p
                key={line}
                className="font-display"
                style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', lineHeight: 1.3 }}
              >
                {line}
              </p>
            ))}
          </div>
          <p
            className="font-display"
            style={{
              fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
              lineHeight: 1.2,
              color: 'var(--pp-coral)',
            }}
          >
            This app is built for that.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        className="px-5 md:px-8 py-12 md:py-16"
        style={{ maxWidth: 1080, margin: '0 auto' }}
      >
        <h2
          className="font-display mb-2"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
        >
          How it works.
        </h2>
        <p className="mb-8" style={{ fontSize: 16, color: 'var(--pp-ink-2)' }}>
          Three moves. Repeat tomorrow.
        </p>

        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}
        >
          {HOW.map(([title, body], i) => (
            <div key={title} className="pp-card" style={{ padding: 22 }}>
              <span
                className="flex items-center justify-center font-display font-bold mb-4"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: 'var(--pp-sun)',
                  color: 'var(--pp-ink)',
                  border: '2px solid var(--pp-ink)',
                  fontSize: 20,
                }}
              >
                {i + 1}
              </span>
              <div className="font-display text-xl mb-2">{title}</div>
              <p style={{ fontSize: 14, color: 'var(--pp-ink-2)', lineHeight: 1.55 }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

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
            Why not a notebook?
          </h2>
          <p className="mb-8" style={{ fontSize: 16, color: 'var(--pp-ink-2)' }}>
            Because a notebook can&rsquo;t keep score.
          </p>

          <div className="flex flex-col gap-3">
            {VS_NOTEBOOK.map(([title, body], i) => (
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
                  ✕
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

      {/* MILESTONE LADDER */}
      <section
        className="px-5 md:px-8 py-12 md:py-16"
        style={{ maxWidth: 1280, margin: '0 auto' }}
      >
        <h2
          className="font-display mb-2"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
        >
          Nine milestones. 1 to 1,000.
        </h2>
        <p className="mb-8" style={{ fontSize: 16, color: 'var(--pp-ink-2)' }}>
          Each one a different shape of brave.
        </p>

        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}
        >
          {MILESTONES.map((m, i) => {
            const palettes = [
              'var(--pp-coral-sf)',
              'var(--pp-mint-sf)',
              'var(--pp-sun-sf)',
              'var(--pp-sky-sf)',
              'var(--pp-grape-sf)',
            ];
            return (
              <div
                key={m.count}
                className="pp-card"
                style={{
                  padding: 18,
                  background: palettes[i % palettes.length],
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <TrophyIcon size={18} />
                  <span
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: 'var(--pp-ink-2)' }}
                  >
                    #{i + 1}
                  </span>
                </div>
                <div className="pp-num mb-1" style={{ fontSize: 32 }}>
                  {m.count.toLocaleString()}
                </div>
                <div className="font-display text-base mb-1.5">{m.title}</div>
                <p
                  className="text-xs"
                  style={{ color: 'var(--pp-ink-2)', lineHeight: 1.5 }}
                >
                  {m.message}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* PRICING */}
      <div style={{ background: 'var(--pp-bg)' }}>
        <Pricing />
      </div>

      {/* MANIFESTO PULL QUOTE */}
      <section
        className="px-5 md:px-8 py-12 md:py-16"
        style={{ background: 'var(--pp-sun-sf)' }}
      >
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <p
            className="font-display mb-4"
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
              lineHeight: 1.25,
              color: 'var(--pp-ink)',
            }}
          >
            &ldquo;The people who win the most are the people who hear no the most. Not because
            they&rsquo;re lucky. Because they ask.&rdquo;
          </p>
          <Link
            href="/manifesto"
            className="text-sm font-semibold"
            style={{ color: 'var(--pp-coral)', textDecoration: 'none' }}
          >
            Read the manifesto →
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="px-5 md:px-8 py-12 md:py-16"
        style={{ maxWidth: 720, margin: '0 auto' }}
      >
        <h2
          className="font-display mb-8"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
        >
          Quick questions.
        </h2>
        <div className="flex flex-col gap-3">
          {FAQ.map(([q, a]) => (
            <details
              key={q}
              className="pp-card"
              style={{ padding: '16px 20px', background: 'var(--pp-card)' }}
            >
              <summary
                className="font-display cursor-pointer list-none flex justify-between items-center"
                style={{ fontSize: 17 }}
              >
                {q}
                <span
                  className="font-display"
                  style={{ fontSize: 22, color: 'var(--pp-coral)' }}
                >
                  +
                </span>
              </summary>
              <p
                className="mt-3"
                style={{ fontSize: 14, color: 'var(--pp-ink-2)', lineHeight: 1.6 }}
              >
                {a}
              </p>
            </details>
          ))}
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
            Your first rejection is out there.
          </h2>
          <p
            className="mb-7 mx-auto"
            style={{ fontSize: 17, lineHeight: 1.55, opacity: 0.92, maxWidth: 480 }}
          >
            Sign up, log it, watch the count climb. Free to start, no card.
          </p>
          <Link
            href="/"
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
            Start collecting
            <ArrowRightIcon size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
