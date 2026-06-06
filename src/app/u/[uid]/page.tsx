import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchPublicProfile } from '@/lib/publicProfile';
import { LogoMark, FlameIcon, ArrowRightIcon } from '@/components/Icons';
import ProfileShare from './ProfileShare';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ uid: string }>;
}): Promise<Metadata> {
  const { uid } = await params;
  const p = await fetchPublicProfile(uid);
  if (!p) return { title: 'Brazen collector' };
  const title = `${p.name} — ${p.nos.toLocaleString()} nos collected`;
  const description = `${p.name} is building the nerve to ask. ${p.nos.toLocaleString()} rejections and counting on Brazen.`;
  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const { uid } = await params;
  const p = await fetchPublicProfile(uid);
  if (!p) notFound();

  const joined =
    p.joinDate > 0
      ? new Date(p.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      : null;

  return (
    <div
      className="pp-dots min-h-dvh flex flex-col items-center px-5 py-10"
      style={{ background: 'var(--pp-bg)', backgroundSize: '18px 18px' }}
    >
      <Link href="/" className="flex items-center gap-2 mb-8" style={{ color: 'var(--pp-ink)' }}>
        <LogoMark size={30} />
        <span className="font-display text-xl">Brazen</span>
      </Link>

      <div className="pp-card w-full" style={{ maxWidth: 460, padding: 26 }}>
        {/* Identity */}
        <div className="flex items-center gap-3 mb-5">
          <div
            className="flex items-center justify-center font-display text-2xl font-bold flex-shrink-0"
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: 'var(--pp-coral)',
              color: '#fff',
              border: '2.5px solid var(--pp-ink)',
              boxShadow: 'var(--pp-shadow)',
              transform: 'rotate(-4deg)',
            }}
          >
            {(p.name || 'A').trim().charAt(0).toUpperCase() || 'A'}
          </div>
          <div className="min-w-0">
            <div className="font-display text-xl truncate">{p.name}</div>
            <div className="text-xs font-semibold" style={{ color: 'var(--pp-ink-3)' }}>
              {p.foundingMemberNumber !== null
                ? `Founding member #${p.foundingMemberNumber}${joined ? ` · since ${joined}` : ''}`
                : joined
                  ? `Collecting since ${joined}`
                  : 'Brazen collector'}
            </div>
          </div>
        </div>

        {/* Headline number */}
        <div
          className="pp-card relative overflow-hidden mb-3"
          style={{ padding: '18px 20px', background: 'var(--pp-coral)', color: '#fff' }}
        >
          <div className="text-xs font-bold uppercase tracking-wider" style={{ opacity: 0.85 }}>
            Nos collected
          </div>
          <div className="pp-num" style={{ fontSize: 60, lineHeight: 1.05, marginTop: 4 }}>
            {p.nos.toLocaleString()}
          </div>
          {p.streak > 0 && (
            <div
              className="pp-sticker absolute"
              style={{ top: 14, right: 14, background: 'var(--pp-sun)', transform: 'rotate(8deg)', gap: 4 }}
            >
              <FlameIcon size={14} style={{ color: 'var(--pp-coral)' }} />
              {p.streak}-day streak
            </div>
          )}
        </div>

        {/* Stat row */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <Stat n={p.weeklyNos} label="This week" bg="var(--pp-sun-sf)" />
          <Stat n={p.yeses} label="Yeses" bg="var(--pp-mint-sf)" />
          <Stat n={p.total} label="Attempts" bg="var(--pp-card-2)" />
        </div>

        {/* No of the week */}
        {p.noOfWeek && (
          <div className="pp-card pp-card-sm mb-3" style={{ padding: 16, background: 'var(--pp-sun-sf)' }}>
            <div className="text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--pp-ink-3)' }}>
              No of the week
            </div>
            <p className="font-display text-lg" style={{ lineHeight: 1.25 }}>
              &ldquo;{p.noOfWeek}&rdquo;
            </p>
          </div>
        )}

        <ProfileShare uid={p.uid} name={p.name} />
      </div>

      {/* CTA */}
      <Link
        href="/app"
        className="pp-btn pp-btn-primary mt-6"
        style={{ padding: '13px 22px', fontSize: 15 }}
      >
        Start your own collection
        <ArrowRightIcon size={16} />
      </Link>
      <p className="text-xs mt-3" style={{ color: 'var(--pp-ink-3)' }}>
        The 30-day courage challenge · free to start
      </p>
    </div>
  );
}

function Stat({ n, label, bg }: { n: number; label: string; bg: string }) {
  return (
    <div className="pp-card pp-card-sm text-center" style={{ padding: '12px 8px', background: bg }}>
      <div className="pp-num" style={{ fontSize: 22 }}>
        {n.toLocaleString()}
      </div>
      <div className="text-xs font-semibold mt-0.5" style={{ color: 'var(--pp-ink-2)' }}>
        {label}
      </div>
    </div>
  );
}
