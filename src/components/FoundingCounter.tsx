'use client';

import { useEffect, useState } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { FOUNDING_MEMBER_CAP } from '@/lib/founders';

interface CounterProps {
  variant?: 'badge' | 'inline';
}

export default function FoundingCounter({ variant = 'badge' }: CounterProps) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, 'meta', 'founding'),
      (snap) => {
        if (!snap.exists()) {
          setCount(0);
        } else {
          const data = snap.data() as { count?: number };
          setCount(data.count ?? 0);
        }
      },
      () => setCount(0)
    );
    return unsub;
  }, []);

  const remaining = count === null ? FOUNDING_MEMBER_CAP : Math.max(0, FOUNDING_MEMBER_CAP - count);
  const full = count !== null && count >= FOUNDING_MEMBER_CAP;

  if (variant === 'inline') {
    return (
      <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.92)' }}>
        {full
          ? 'All 50 spots claimed'
          : count === null
            ? `${FOUNDING_MEMBER_CAP} spots`
            : `${remaining} of ${FOUNDING_MEMBER_CAP} spots left`}
      </span>
    );
  }

  return (
    <div
      className="inline-flex items-center gap-2 mb-3"
      style={{
        padding: '6px 12px',
        borderRadius: 999,
        background: 'rgba(255,255,255,0.18)',
        border: '1.5px solid rgba(255,255,255,0.45)',
      }}
    >
      <span
        className="inline-block"
        style={{
          width: 8,
          height: 8,
          borderRadius: 999,
          background: full ? '#fff' : 'var(--pp-sun)',
          boxShadow: full ? 'none' : '0 0 0 3px rgba(255,203,71,0.35)',
        }}
      />
      <span className="text-xs font-bold" style={{ color: '#fff' }}>
        {full
          ? 'All 50 claimed'
          : count === null
            ? `${FOUNDING_MEMBER_CAP} spots`
            : `${count} of ${FOUNDING_MEMBER_CAP} claimed`}
      </span>
    </div>
  );
}
