import Link from 'next/link';
import { LogoMark } from './Icons';

type Active = 'home' | 'about' | 'manifesto' | 'leaderboard' | 'pricing' | null;

export default function MarketingNav({ active, hero }: { active: Active; hero?: boolean }) {
  const links: { id: Exclude<Active, null>; label: string; href: string }[] = [
    { id: 'about', label: 'About', href: '/about' },
    { id: 'manifesto', label: 'Manifesto', href: '/manifesto' },
    { id: 'pricing', label: 'Pricing', href: '/pricing' },
    { id: 'leaderboard', label: 'Leaderboard', href: '/leaderboard' },
  ];

  if (hero) {
    return (
      <header
        className="flex justify-between items-center"
        style={{ padding: '20px 32px' }}
      >
        <Link
          href="/landing"
          className="inline-flex items-center gap-2.5"
          style={{ textDecoration: 'none', color: 'var(--pp-ink)' }}
        >
          <LogoMark size={36} />
          <span className="font-display text-xl font-bold">Rejection Collection</span>
        </Link>
        <nav className="flex items-center gap-5">
          {links.map((l) => (
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
      </header>
    );
  }

  return (
    <nav className="flex justify-between items-center mb-10">
      <Link
        href="/landing"
        className="inline-flex items-center gap-2.5"
        style={{ textDecoration: 'none', color: 'var(--pp-ink)' }}
      >
        <LogoMark size={32} />
        <span className="font-display text-lg font-bold">Rejection Collection</span>
      </Link>
      <div className="flex gap-5">
        {links.map((l) => (
          <Link
            key={l.id}
            href={l.href}
            className="text-sm font-semibold pb-0.5"
            style={{
              color: active === l.id ? 'var(--pp-ink)' : 'var(--pp-ink-3)',
              borderBottom: active === l.id ? '2px solid var(--pp-coral)' : '2px solid transparent',
              textDecoration: 'none',
            }}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
