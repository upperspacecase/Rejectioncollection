'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LogoMark, MenuIcon, CloseIcon } from './Icons';

type Active = 'home' | 'about' | 'manifesto' | 'leaderboard' | 'pricing' | null;

const LINKS: { id: Exclude<Active, null>; label: string; href: string }[] = [
  { id: 'about', label: 'About', href: '/about' },
  { id: 'manifesto', label: 'Manifesto', href: '/manifesto' },
  { id: 'pricing', label: 'Pricing', href: '/pricing' },
  { id: 'leaderboard', label: 'Leaderboard', href: '/leaderboard' },
];

export default function MarketingNav({ active, hero }: { active: Active; hero?: boolean }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  if (hero) {
    return (
      <header className="relative flex justify-between items-center px-5 py-4 md:px-8 md:py-5">
        <Link
          href="/landing"
          className="inline-flex items-center gap-2.5 min-w-0"
          style={{ textDecoration: 'none', color: 'var(--pp-ink)' }}
          onClick={() => setOpen(false)}
        >
          <LogoMark size={36} />
          <span className="brazen-wordmark text-2xl md:text-3xl truncate">
            Brazen
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5">
          {LINKS.map((l) => (
            <Link
              key={l.id}
              href={l.href}
              className="text-sm font-semibold"
              style={{ color: 'var(--pp-ink-2)', textDecoration: 'none' }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/"
            className="pp-btn pp-btn-ghost"
            style={{ padding: '8px 14px', fontSize: 13, minHeight: 0 }}
          >
            Sign in
          </Link>
          <Link
            href="/"
            className="pp-btn pp-btn-primary"
            style={{ padding: '10px 16px', fontSize: 13, minHeight: 0 }}
          >
            Start free
          </Link>
        </nav>

        {/* Mobile cluster: primary CTA + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/"
            className="pp-btn pp-btn-primary"
            style={{ padding: '8px 14px', fontSize: 12, minHeight: 0 }}
          >
            Start free
          </Link>
          <MenuButton open={open} onClick={() => setOpen((o) => !o)} />
        </div>

        <MobileSheet open={open} active={active} onClose={() => setOpen(false)} />
      </header>
    );
  }

  return (
    <nav className="relative flex justify-between items-center mb-8 md:mb-10">
      <Link
        href="/landing"
        className="inline-flex items-center gap-2.5 min-w-0"
        style={{ textDecoration: 'none', color: 'var(--pp-ink)' }}
        onClick={() => setOpen(false)}
      >
        <LogoMark size={32} />
        <span className="brazen-wordmark text-xl md:text-2xl truncate">
          Brazen
        </span>
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex gap-5">
        {LINKS.map((l) => (
          <Link
            key={l.id}
            href={l.href}
            className="text-sm font-semibold pb-0.5"
            style={{
              color: active === l.id ? 'var(--pp-ink)' : 'var(--pp-ink-3)',
              borderBottom:
                active === l.id ? '2px solid var(--pp-coral)' : '2px solid transparent',
              textDecoration: 'none',
            }}
          >
            {l.label}
          </Link>
        ))}
      </div>

      {/* Mobile hamburger */}
      <div className="md:hidden">
        <MenuButton open={open} onClick={() => setOpen((o) => !o)} />
      </div>

      <MobileSheet open={open} active={active} onClose={() => setOpen(false)} />
    </nav>
  );
}

function MenuButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      className="pp-btn"
      style={{
        padding: 0,
        width: 44,
        height: 44,
        minHeight: 44,
        background: 'var(--pp-card)',
        color: 'var(--pp-ink)',
      }}
    >
      {open ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
    </button>
  );
}

function MobileSheet({
  open,
  active,
  onClose,
}: {
  open: boolean;
  active: Active;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <>
      <button
        aria-label="Close menu overlay"
        onClick={onClose}
        className="md:hidden fixed inset-0 z-40 cursor-default"
        style={{ background: 'rgba(34,23,51,0.35)' }}
      />
      <div
        className="md:hidden absolute z-50 left-4 right-4 mt-2 top-full pp-card"
        style={{ padding: 12 }}
      >
        <div className="flex flex-col gap-1">
          {LINKS.map((l) => (
            <Link
              key={l.id}
              href={l.href}
              onClick={onClose}
              className="rounded-lg px-3 py-3 text-base font-semibold"
              style={{
                color: active === l.id ? 'var(--pp-ink)' : 'var(--pp-ink-2)',
                background: active === l.id ? 'var(--pp-coral-sf)' : 'transparent',
                textDecoration: 'none',
              }}
            >
              {l.label}
            </Link>
          ))}
          <div className="my-1 h-px" style={{ background: 'var(--pp-ink-3)', opacity: 0.25 }} />
          <Link
            href="/"
            onClick={onClose}
            className="pp-btn pp-btn-ghost"
            style={{ padding: '12px 14px', fontSize: 14, justifyContent: 'flex-start' }}
          >
            Sign in
          </Link>
          <Link
            href="/"
            onClick={onClose}
            className="pp-btn pp-btn-primary"
            style={{ padding: '12px 14px', fontSize: 14, justifyContent: 'flex-start' }}
          >
            Start free
          </Link>
        </div>
      </div>
    </>
  );
}
