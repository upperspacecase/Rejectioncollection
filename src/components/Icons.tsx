import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 18, ...rest }: IconProps) {
  return {
    width: size,
    height: size,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    ...rest,
  };
}

export function HomeIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 18 18" {...base(p)}>
      <path d="M2 8 L9 2 L16 8 V16 H2 Z" />
    </svg>
  );
}

export function ListIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 18 18" {...base(p)}>
      <line x1="4" y1="5" x2="15" y2="5" />
      <line x1="4" y1="9" x2="15" y2="9" />
      <line x1="4" y1="13" x2="15" y2="13" />
    </svg>
  );
}

export function BoardIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 18 18" {...base(p)}>
      <rect x="3" y="9" width="3" height="6" />
      <rect x="7.5" y="5" width="3" height="10" />
      <rect x="12" y="2" width="3" height="13" />
    </svg>
  );
}

export function MeIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 18 18" {...base(p)}>
      <circle cx="9" cy="6" r="3" />
      <path d="M2.5 16 C 3 12 6 10.5 9 10.5 C 12 10.5 15 12 15.5 16" />
    </svg>
  );
}

export function PlusIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base(p)} strokeWidth={3}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export function CheckIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base(p)}>
      <path d="M5 12 L10 17 L20 6" />
    </svg>
  );
}

export function XIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base(p)}>
      <path d="M6 6 L18 18 M18 6 L6 18" />
    </svg>
  );
}

export function FlameIcon({ size = 14, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...rest}>
      <path
        d="M10 18c3.5 0 6-2.4 6-5.6 0-2.8-1.8-4.6-3.4-6.4-1-1.1-1.6-2-1.6-3.5 0-.5-.6-.7-.9-.3-1.4 1.7-2.1 3.5-2.1 5.2 0 .8.3 1.4.6 1.9-.6-.2-1.2-.7-1.6-1.5-.2-.4-.8-.4-.9.1-.2.7-.4 1.5-.4 2.5C5.7 14.4 7.1 18 10 18z"
        fill="currentColor"
        stroke="var(--pp-ink)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StarIcon({ size = 14, filled = true, ...rest }: IconProps & { filled?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...rest}>
      <path
        d="M10 2 L12.2 7.8 L18.5 8.2 L13.7 12.2 L15.3 18.3 L10 14.9 L4.7 18.3 L6.3 12.2 L1.5 8.2 L7.8 7.8 Z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="var(--pp-ink)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TrashIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base(p)}>
      <path d="M3 6 H 21" />
      <path d="M8 6 V4 a1 1 0 0 1 1 -1 h6 a1 1 0 0 1 1 1 v2" />
      <path d="M6 6 l1 14 a2 2 0 0 0 2 2 h6 a2 2 0 0 0 2 -2 l1 -14" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}

export function InfoIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base(p)}>
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="11" x2="12" y2="17" />
      <circle cx="12" cy="7.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

export function ArrowRightIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base(p)}>
      <line x1="4" y1="12" x2="20" y2="12" />
      <polyline points="14 6 20 12 14 18" />
    </svg>
  );
}

export function MenuIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base(p)} strokeWidth={2.5}>
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

export function CloseIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base(p)} strokeWidth={2.5}>
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
}

export function WaveIcon({ size = 22, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...rest}>
      <path
        d="M14 21c4 0 7-3 7-7v-4l-1-1.5-2 1V5l-1-1.5-2 1V3l-1-1.5L12 3v8l-2-2.5-2 1L13 16l-2 2c-2 2-3 1.5-3 1.5l-1-1.5L5 19.5C5 19.5 9 22 14 21z"
        fill="var(--pp-sun)"
        stroke="var(--pp-ink)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TrophyIcon({ size = 44, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" {...rest}>
      <path
        d="M22 5 L26 17 L39 17 L29 25 L33 38 L22 31 L11 38 L15 25 L5 17 L18 17 Z"
        fill="#fff"
        stroke="var(--pp-ink)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ReceiptIcon({ size = 22, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...rest}>
      <path
        d="M5 3 H19 V21 L17 19 L15 21 L13 19 L11 21 L9 19 L7 21 L5 19 Z"
        fill="var(--pp-card)"
        stroke="var(--pp-ink)"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <line x1="8" y1="8" x2="16" y2="8" stroke="var(--pp-ink)" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="8" y1="12" x2="16" y2="12" stroke="var(--pp-ink)" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="8" y1="16" x2="13" y2="16" stroke="var(--pp-ink)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function TargetIcon({ size = 22, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...rest}>
      <circle cx="12" cy="12" r="10" fill="var(--pp-coral)" stroke="var(--pp-ink)" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="6" fill="var(--pp-card)" stroke="var(--pp-ink)" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2" fill="var(--pp-coral)" stroke="var(--pp-ink)" strokeWidth="1.3" />
    </svg>
  );
}

export function BriefcaseIcon({ size = 22, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...rest}>
      <rect x="3" y="8" width="18" height="13" rx="2" fill="var(--pp-mint)" stroke="var(--pp-ink)" strokeWidth="1.8" />
      <path d="M9 8 V5 a1 1 0 0 1 1 -1 h4 a1 1 0 0 1 1 1 V8" stroke="var(--pp-ink)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <line x1="3" y1="13" x2="21" y2="13" stroke="var(--pp-ink)" strokeWidth="1.6" />
    </svg>
  );
}

export function SparkleIcon({ size = 22, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...rest}>
      <path
        d="M12 2 L13.5 9 L20 10.5 L13.5 12 L12 19 L10.5 12 L4 10.5 L10.5 9 Z"
        fill="var(--pp-sun)"
        stroke="var(--pp-ink)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M19 4 L19.6 6 L21.5 6.6 L19.6 7.2 L19 9 L18.4 7.2 L16.5 6.6 L18.4 6 Z" fill="var(--pp-grape)" stroke="var(--pp-ink)" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  );
}

export function MedalIcon({ rank = 1, size = 26 }: { rank?: 1 | 2 | 3; size?: number }) {
  const fills = {
    1: { ring: '#FFC72C', face: '#FFE07A' },
    2: { ring: '#C8C8D0', face: '#E8E8EE' },
    3: { ring: '#C97A3D', face: '#E2A77A' },
  } as const;
  const { ring, face } = fills[rank];
  return (
    <svg width={size} height={size} viewBox="0 0 26 26" fill="none">
      <path d="M8 2 L4 10 L9 10 L11 6 Z" fill="var(--pp-coral)" stroke="var(--pp-ink)" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M18 2 L22 10 L17 10 L15 6 Z" fill="var(--pp-coral)" stroke="var(--pp-ink)" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="13" cy="17" r="7" fill={ring} stroke="var(--pp-ink)" strokeWidth="1.6" />
      <circle cx="13" cy="17" r="4.5" fill={face} stroke="var(--pp-ink)" strokeWidth="1.2" />
      <text
        x="13"
        y="19.5"
        textAnchor="middle"
        fontSize="6.5"
        fontWeight="800"
        fontFamily="'Bricolage Grotesque', Georgia, serif"
        fill="var(--pp-ink)"
      >
        {rank}
      </text>
    </svg>
  );
}

export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: Math.max(8, Math.round(size * 0.27)),
        background: 'var(--pp-coral)',
        border: '2px solid var(--pp-ink)',
        boxShadow: 'var(--pp-shadow)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <svg
        width={size * 0.62}
        height={size * 0.62}
        viewBox="0 0 32 32"
        fill="none"
      >
        <path
          d="M20 5 L8 18 L14 18 L12 27 L24 14 L18 14 Z"
          fill="var(--pp-sun)"
          stroke="var(--pp-ink)"
          strokeWidth="1.8"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function GoogleIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

export function Confetti({ color = 'var(--pp-coral)' }: { color?: string }) {
  const dots = [];
  for (let i = 0; i < 18; i++) {
    const palette = [color, 'var(--pp-sun)', 'var(--pp-grape)', 'var(--pp-sky)'];
    const c = palette[i % palette.length];
    const angle = (i / 18) * Math.PI * 2;
    const r = 100 + (i % 3) * 30;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r * 0.8;
    const size = 8 + (i % 4) * 3;
    const rot = (i * 47) % 360;
    dots.push(
      <span
        key={i}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: size,
          height: size,
          background: c,
          border: '1.5px solid var(--pp-ink)',
          borderRadius: i % 3 === 0 ? 999 : 3,
          transform: `translate(${x}px, ${y}px) rotate(${rot}deg)`,
        }}
      />
    );
  }
  return <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>{dots}</div>;
}
