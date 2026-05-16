'use client';

import Link from 'next/link';
import { ArrowRightIcon, CheckIcon } from './Icons';
import FoundingCounter from './FoundingCounter';

const CORE = [
  'Unlimited rejection logs',
  'Streaks and yearly goal',
  'Leaderboard',
  '52-week contribution heatmap',
];

const FOUNDING = [
  'Weekly digest email',
  'Year-in-review card',
  'Public profile page',
  'Phrase templates for raises, intros, refunds, cold emails, and follow-ups',
  'Founding-member badge + access to the founding group chat',
  'Free for life — even after the paid pricing kicks in',
];

interface Props {
  variant?: 'section' | 'page';
}

export default function Pricing({ variant = 'section' }: Props) {
  const padClass =
    variant === 'page' ? 'px-5 md:px-8 pt-8 pb-12 md:pt-10 md:pb-14' : 'px-5 md:px-8 py-12 md:py-16';

  return (
    <section className={padClass}>
      <div style={{ maxWidth: 980, margin: '0 auto' }}>
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
          Two ways to start.
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
          {/* CORE APP */}
          <Card
            title="Core app"
            price="Free"
            priceSub="forever · no card · no paywall on the habit loop"
            body="Track your asks. Log the rejections. Build the streak. Reach the milestones."
            features={CORE}
            cta="Start collecting"
            ctaHref="/"
            ctaStyle="default"
          />

          {/* FOUNDING MEMBER (formerly two tiers — merged) */}
          <Card
            title="Founding Member"
            price="Free"
            priceSub={
              <div className="flex flex-col gap-1.5">
                <FoundingCounter variant="inline" />
                <span style={{ opacity: 0.85 }}>
                  for the first 50 · then <b>$5/mo or $35/year</b>
                </span>
              </div>
            }
            body="The first 50 people to sign up get the paid tier free for life and join the founding group — a small chat where we decide what to build next based on what you ask for."
            features={FOUNDING}
            cta="Claim your founding spot"
            ctaHref="/"
            highlighted
            stickerLabel="50 spots only"
            ctaStyle="ink"
            bg="var(--pp-coral)"
            ink="#fff"
            featureCheckBg="var(--pp-sun)"
            badge={<FoundingCounter variant="badge" />}
          />
        </div>

        <div className="pp-tip mt-8">
          <span className="pp-tip-icon">!</span>
          <div>
            <b>Why 50:</b> small enough to actually listen to. Founders shape what gets built —
            digest, year-in-review, public profile, phrase templates — in the order you ask for
            them. After the 50 are seated, the paid tier launches at $5/mo or $35/year. Founders
            stay free for life.
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
