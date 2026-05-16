import type { Metadata } from 'next';
import Link from 'next/link';
import MarketingNav from '@/components/MarketingNav';
import { ArrowRightIcon, TargetIcon, BriefcaseIcon, SparkleIcon } from '@/components/Icons';
import ScrollPageBodyToggle from '@/components/ScrollBodyToggle';

export const metadata: Metadata = {
  title: 'About — Brazen',
  description: 'The friendliest way to build rejection muscle.',
};

const PERSONAS = [
  {
    title: 'Founders',
    icon: <TargetIcon size={28} />,
    body:
      'Cold emails, pitch decks, asking for intros. The 113th email feels lighter when you can see the other 112.',
    bg: 'var(--pp-coral-sf)',
  },
  {
    title: 'Job seekers',
    icon: <BriefcaseIcon size={28} />,
    body:
      'Apply, follow up, negotiate. Stop catastrophizing one rejection when you have a stack of attempts.',
    bg: 'var(--pp-mint-sf)',
  },
  {
    title: 'Anyone, really',
    icon: <SparkleIcon size={28} />,
    body:
      'Ask for the table by the window. Return the shirt. Request an extension. Small reps compound.',
    bg: 'var(--pp-sun-sf)',
  },
];

const STEPS = [
  ['Ask for something.', 'Anything. Coffee, a raise, an intro, a discount. The muscle is the same.'],
  ['Log it in 5 seconds.', 'Type the ask, tap No or Yes. We do the streak math.'],
  ['Watch the number climb.', 'Daily streaks, milestones from 1 to 1,000, a leaderboard if you want company.'],
  ['Mark the useful ones.', 'Some rejections come with feedback or new doors. Star those.'],
];

export default function AboutPage() {
  return (
    <div
      className="min-h-dvh px-5 md:px-8 pt-8 md:pt-10 pb-14"
      style={{ background: 'var(--pp-bg)' }}
    >
      <ScrollPageBodyToggle />
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <MarketingNav active="about" />

        <span className="pp-pill mb-4 inline-flex" style={{ background: 'var(--pp-coral-sf)' }}>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--pp-coral)' }} />
          About this thing
        </span>

        <h1 className="font-display mb-4" style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)' }}>
          We made an app for getting told no.
        </h1>
        <p
          className="mb-10"
          style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--pp-ink-2)' }}
        >
          Most apps help you avoid uncomfortable things. This one is the opposite — it cheers
          you on every time you do the hard ask. Big or small, you log it and we celebrate it.
        </p>

        <h2 className="font-display text-2xl mb-4">Built for chronic askers</h2>
        <div className="grid gap-4 mb-12" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          {PERSONAS.map((p) => (
            <div key={p.title} className="pp-card" style={{ padding: 18, background: p.bg }}>
              <div className="mb-2">{p.icon}</div>
              <div className="font-display text-lg mb-1.5">{p.title}</div>
              <p className="text-sm" style={{ color: 'var(--pp-ink-2)', lineHeight: 1.55 }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>

        <h2 className="font-display text-2xl mb-4">How it works</h2>
        <div className="flex flex-col gap-3 mb-12">
          {STEPS.map(([title, body], i) => (
            <div
              key={i}
              className="pp-card flex gap-4 items-start"
              style={{ padding: 18 }}
            >
              <span
                className="flex items-center justify-center font-display font-bold flex-shrink-0"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: 'var(--pp-sun)',
                  color: 'var(--pp-ink)',
                  border: '2px solid var(--pp-ink)',
                  fontSize: 18,
                }}
              >
                {i + 1}
              </span>
              <div>
                <div className="font-display text-lg mb-1">{title}</div>
                <p className="text-sm" style={{ color: 'var(--pp-ink-2)', lineHeight: 1.55 }}>
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          className="pp-card"
          style={{ padding: 28, background: 'var(--pp-ink)', color: 'var(--pp-bg)' }}
        >
          <h2 className="font-display text-2xl mb-2" style={{ color: 'var(--pp-bg)' }}>
            Ready when you are.
          </h2>
          <p className="text-base mb-4" style={{ opacity: 0.85, lineHeight: 1.55 }}>
            Free forever, no card needed. Your first rejection is out there waiting.
          </p>
          <Link
            href="/"
            className="pp-btn pp-btn-primary"
            style={{ padding: '12px 22px' }}
          >
            Start collecting
            <ArrowRightIcon size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
