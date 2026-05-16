import Link from 'next/link';
import { ArrowRightIcon, CheckIcon } from './Icons';
import FoundingCounter from './FoundingCounter';

const COLLECTOR = [
  'Unlimited rejection logs',
  'Streaks and year goal',
  'All nine milestones',
  'Leaderboard',
  '53-week contribution heatmap',
];

const FOUNDING_EXTRAS = [
  'The full paid tier (Committed) — free forever',
  'Small founder community (Discord)',
  'Founding-member badge on the leaderboard',
  'Your name on the supporters page',
];

const COMMITTED = [
  'Notes per entry — what you asked, what they said, what you learned',
  'Weekly digest email with last week’s roundup',
  'Year-in-review card — shareable end-of-year recap',
  'Public profile page at a clean URL',
  'Ask idea library — 100 categorised prompts',
  'Phrase templates — raise, intro, refund, cold email, follow-up',
];

interface Props {
  variant?: 'section' | 'page';
}

export default function Pricing({ variant = 'section' }: Props) {
  const outerPadding = variant === 'page' ? '40px 32px 56px' : '64px 32px';

  return (
    <section style={{ padding: outerPadding }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <span
          className="pp-pill mb-4 inline-flex"
          style={{ background: 'var(--pp-coral-sf)' }}
        >
          <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--pp-coral)' }} />
          Pricing
        </span>

        <h2
          className="font-display mb-3"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
        >
          Three ways to start.
        </h2>
        <p
          className="mb-10"
          style={{
            fontSize: 17,
            lineHeight: 1.55,
            color: 'var(--pp-ink-2)',
            maxWidth: 620,
          }}
        >
          Fear of rejection shrinks from a wall to a speed bump. You hear &ldquo;no&rdquo; and
          feel mildly amused, not crushed. Pick the lane that fits.
        </p>

        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            alignItems: 'stretch',
          }}
        >
          {/* COLLECTOR */}
          <Card
            title="Collector"
            price="Free"
            priceSub="forever"
            body="The complete habit loop. No card. No paywall on the core."
            features={COLLECTOR}
            cta="Start collecting"
            ctaHref="/"
            ctaStyle="default"
          />

          {/* FOUNDING MEMBER */}
          <Card
            title="Founding Member"
            price="Free"
            priceSub={<FoundingCounter variant="inline" />}
            body="The whole app free forever, plus a small founder community shaping what comes next."
            features={[...COLLECTOR, ...FOUNDING_EXTRAS]}
            cta="Claim your spot"
            ctaHref="/"
            highlighted
            stickerLabel="50 spots only"
            ctaStyle="ink"
            bg="var(--pp-coral)"
            ink="#fff"
            featureCheckBg="var(--pp-sun)"
            badge={<FoundingCounter variant="badge" />}
          />

          {/* COMMITTED */}
          <Card
            title="Committed"
            price="$5"
            priceSub={
              <span>
                /mo · or <b>$35/yr</b> <span style={{ opacity: 0.7 }}>(save $25)</span>
              </span>
            }
            body="Launches when the 50 founders are seated. Built from what founders ask for first."
            features={COMMITTED}
            cta="See what’s coming"
            ctaHref="/manifesto"
            ctaStyle="ghost"
            bg="var(--pp-card-2)"
          />
        </div>

        <div className="pp-tip mt-8">
          <span className="pp-tip-icon">!</span>
          <div>
            <b>Why founding members are free:</b> the first 50 people shape what gets built.
            Founders get a small Discord, early access to paid features as they ship, and a
            permanent free pass to Committed.
          </div>
        </div>
      </div>
    </section>
  );
}

interface CardProps {
  title: string;
  price: string;
  priceSub: React.ReactNode;
  body: string;
  features: string[];
  cta: string;
  ctaHref: string;
  highlighted?: boolean;
  stickerLabel?: string;
  ctaStyle?: 'default' | 'ink' | 'ghost';
  bg?: string;
  ink?: string;
  featureCheckBg?: string;
  badge?: React.ReactNode;
}

function Card({
  title,
  price,
  priceSub,
  body,
  features,
  cta,
  ctaHref,
  highlighted,
  stickerLabel,
  ctaStyle = 'default',
  bg,
  ink,
  featureCheckBg,
  badge,
}: CardProps) {
  const textColor = ink ?? 'var(--pp-ink)';
  const cardBg = bg ?? 'var(--pp-card)';

  return (
    <div
      className="pp-card relative flex flex-col"
      style={{
        padding: 24,
        background: cardBg,
        color: textColor,
        boxShadow: highlighted ? 'var(--pp-shadow-lg)' : 'var(--pp-shadow)',
        transform: highlighted ? 'translateY(-4px)' : 'none',
      }}
    >
      {stickerLabel && (
        <div
          className="pp-sticker absolute"
          style={{
            top: -14,
            right: 16,
            background: 'var(--pp-sun)',
            color: 'var(--pp-ink)',
            transform: 'rotate(-3deg)',
          }}
        >
          {stickerLabel}
        </div>
      )}

      <div
        className="text-xs font-bold uppercase tracking-wider mb-2"
        style={{ color: highlighted ? 'rgba(255,255,255,0.85)' : 'var(--pp-ink-3)' }}
      >
        {title}
      </div>

      {badge}

      <div className="flex items-baseline gap-1.5 mb-1.5">
        <span className="pp-num" style={{ fontSize: 44 }}>
          {price}
        </span>
      </div>
      <div
        className="text-sm font-semibold mb-3"
        style={{ color: highlighted ? 'rgba(255,255,255,0.85)' : 'var(--pp-ink-2)' }}
      >
        {priceSub}
      </div>

      <p
        className="text-sm mb-5"
        style={{
          color: highlighted ? 'rgba(255,255,255,0.92)' : 'var(--pp-ink-2)',
          lineHeight: 1.55,
        }}
      >
        {body}
      </p>

      <ul className="flex flex-col gap-2 mb-6 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm" style={{ lineHeight: 1.5 }}>
            <span
              className="flex-shrink-0 inline-flex items-center justify-center"
              style={{
                width: 18,
                height: 18,
                borderRadius: 999,
                background: featureCheckBg ?? 'var(--pp-mint)',
                color: 'var(--pp-ink)',
                border: '1.5px solid var(--pp-ink)',
                marginTop: 1,
              }}
            >
              <CheckIcon size={10} strokeWidth={3} />
            </span>
            <span style={{ fontWeight: 500 }}>{f}</span>
          </li>
        ))}
      </ul>

      <Link
        href={ctaHref}
        className="pp-btn"
        style={{
          width: '100%',
          justifyContent: 'center',
          padding: '14px 0',
          fontSize: 15,
          ...(ctaStyle === 'ink'
            ? {
                background: 'var(--pp-ink)',
                color: 'var(--pp-bg)',
                borderColor: 'var(--pp-bg)',
                boxShadow: '0 3px 0 rgba(0,0,0,0.5)',
              }
            : ctaStyle === 'ghost'
              ? {
                  background: 'transparent',
                  borderColor: 'var(--pp-ink-3)',
                  color: 'var(--pp-ink-2)',
                  boxShadow: 'none',
                }
              : {
                  background: 'var(--pp-card)',
                  color: 'var(--pp-ink)',
                }),
        }}
      >
        {cta}
        <ArrowRightIcon size={16} />
      </Link>
    </div>
  );
}
