import type { Metadata } from 'next';
import Link from 'next/link';
import MarketingNav from '@/components/MarketingNav';
import ScrollPageBodyToggle from '@/components/ScrollBodyToggle';
import { ArrowRightIcon } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Manifesto — Rejection Collection',
  description: 'Why we collect rejection.',
};

const RULES = [
  ['Every ask counts.', 'Big or small, the muscle is the same.', 'var(--pp-coral-sf)'],
  ['Log it immediately.', 'Don’t let your brain rewrite the story.', 'var(--pp-sun-sf)'],
  ['A yes is a bonus.', 'The ask was the goal.', 'var(--pp-mint-sf)'],
  ['Streaks matter.', 'Show up every day. Consistency compounds.', 'var(--pp-sky-sf)'],
  ['Mark the useful ones.', 'Some rejections open doors you didn’t see.', 'var(--pp-grape-sf)'],
];

export default function ManifestoPage() {
  return (
    <div
      className="min-h-dvh px-5 md:px-8 pt-8 md:pt-10 pb-14"
      style={{ background: 'var(--pp-bg)' }}
    >
      <ScrollPageBodyToggle />
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <MarketingNav active="manifesto" />

        <span className="pp-pill mb-4 inline-flex" style={{ background: 'var(--pp-grape-sf)' }}>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--pp-grape)' }} />
          The manifesto
        </span>

        <h1 className="font-display mb-7" style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)' }}>
          Most people avoid rejection.
          <br />
          <span style={{ color: 'var(--pp-coral)' }}>You collect it.</span>
        </h1>

        <div
          className="pp-card mb-9"
          style={{ padding: 24, background: 'var(--pp-sun-sf)' }}
        >
          <p className="font-display" style={{ fontSize: 22, lineHeight: 1.35 }}>
            &ldquo;The people who win the most are the people who hear no the most. Not because
            they&rsquo;re lucky. Because they ask.&rdquo;
          </p>
        </div>

        <p
          className="mb-6"
          style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--pp-ink-2)' }}
        >
          Somewhere along the way you learned that rejection means you did something wrong.
          That a no is a verdict on your worth. That the smart move is to only ask when
          you&rsquo;re sure the answer is yes.
        </p>
        <p
          className="mb-9"
          style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--pp-ink-2)' }}
        >
          That instinct protects your ego. It also keeps your life small.
        </p>

        <div className="pp-squiggle mb-8" />

        <h2 className="font-display text-2xl mb-3.5">The reframe</h2>
        <p
          className="mb-4"
          style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--pp-ink-2)' }}
        >
          What if rejection wasn&rsquo;t something that happened to you, but something you went
          out and collected? Every no is a rep. Every attempt is proof you showed up.
        </p>
        <p
          className="mb-9"
          style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--pp-ink-2)' }}
        >
          A rejection count isn&rsquo;t a measure of failure. It&rsquo;s a measure of volume.
          And volume is the only variable you actually control.
        </p>

        <div className="pp-squiggle mb-8" />

        <h2 className="font-display text-2xl mb-3.5">The math</h2>
        <div
          className="pp-card flex gap-4 items-center mb-9"
          style={{ padding: 22, background: 'var(--pp-mint-sf)' }}
        >
          <div className="pp-num" style={{ fontSize: 56, color: 'var(--pp-ink)' }}>
            1,000
          </div>
          <div style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--pp-ink-2)' }}>
            rejections in a year sounds impossible. It&rsquo;s about <b>3 per day</b>. Three asks.
            Three chances to be brave. Three moments where you chose action over avoidance.
          </div>
        </div>

        <h2 className="font-display text-2xl mb-4">The rules</h2>
        <div className="flex flex-col gap-2.5 mb-10">
          {RULES.map(([title, body, bg], i) => (
            <div
              key={i}
              className="pp-card flex gap-4 items-center"
              style={{ padding: '14px 18px', background: bg }}
            >
              <span
                className="flex items-center justify-center flex-shrink-0 font-display font-bold"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: 'var(--pp-card)',
                  color: 'var(--pp-ink)',
                  border: '2px solid var(--pp-ink)',
                  fontSize: 15,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <div className="font-display text-base">{title}</div>
                <div className="text-sm" style={{ color: 'var(--pp-ink-2)' }}>
                  {body}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="pp-card text-center"
          style={{ padding: 28, background: 'var(--pp-coral)', color: '#fff' }}
        >
          <p className="font-display mb-4" style={{ fontSize: 22, lineHeight: 1.35 }}>
            Your rejection count is the scoreboard of a life fully asked.
          </p>
          <Link
            href="/"
            className="pp-btn"
            style={{ background: '#fff', padding: '12px 22px' }}
          >
            Start collecting
            <ArrowRightIcon size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
