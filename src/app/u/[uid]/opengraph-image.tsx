import { ImageResponse } from 'next/og';
import { fetchPublicProfile } from '@/lib/publicProfile';

export const runtime = 'edge';
export const alt = 'A Brazen rejection card';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const INK = '#221733';
const INK2 = '#4A3F5C';
const INK3 = '#7B7290';
const BG = '#FFF1E0';
const CORAL = '#FF5E3D';
const SUN = '#FFCB47';
const WHITE = '#FFFFFF';

export default async function Image({ params }: { params: Promise<{ uid: string }> }) {
  const { uid } = await params;
  const p = await fetchPublicProfile(uid);

  const name = p?.name ?? 'A collector';
  const nos = (p?.nos ?? 0).toLocaleString();
  const stats = [
    { label: 'THIS WEEK', value: String(p?.weeklyNos ?? 0) },
    { label: 'STREAK', value: `${p?.streak ?? 0}d` },
    { label: 'YESES', value: String(p?.yeses ?? 0) },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: BG,
          padding: '60px 72px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 64,
              height: 64,
              borderRadius: 18,
              background: CORAL,
              border: `5px solid ${INK}`,
              color: WHITE,
              fontSize: 40,
              fontWeight: 800,
            }}
          >
            B
          </div>
          <div style={{ display: 'flex', fontSize: 38, fontWeight: 800, color: INK, letterSpacing: -1 }}>
            BRAZEN
          </div>
        </div>

        {/* Headline number */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 44, fontWeight: 700, color: INK2 }}>{name}</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24 }}>
            <div style={{ display: 'flex', fontSize: 210, fontWeight: 800, color: CORAL, lineHeight: 1 }}>
              {nos}
            </div>
            <div style={{ display: 'flex', fontSize: 44, fontWeight: 700, color: INK, paddingBottom: 30 }}>
              nos collected
            </div>
          </div>

          <div style={{ display: 'flex', gap: 16, marginTop: 20 }}>
            {stats.map((s) => (
              <div
                key={s.label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: WHITE,
                  border: `4px solid ${INK}`,
                  borderRadius: 18,
                  padding: '14px 26px',
                }}
              >
                <div style={{ display: 'flex', fontSize: 22, fontWeight: 800, color: INK3, letterSpacing: 1 }}>
                  {s.label}
                </div>
                <div style={{ display: 'flex', fontSize: 48, fontWeight: 800, color: INK }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer: no of the week or tagline */}
        {p?.noOfWeek ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              background: SUN,
              border: `5px solid ${INK}`,
              borderRadius: 24,
              padding: '22px 30px',
            }}
          >
            <div style={{ display: 'flex', fontSize: 22, fontWeight: 800, color: INK, letterSpacing: 2 }}>
              NO OF THE WEEK
            </div>
            <div style={{ display: 'flex', fontSize: 38, fontWeight: 700, color: INK, marginTop: 6 }}>
              {`“${p.noOfWeek}”`}
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', fontSize: 32, fontWeight: 700, color: INK }}>
            The 30-day courage challenge · brazen.click
          </div>
        )}
      </div>
    ),
    { ...size }
  );
}
