'use client';

import { useState } from 'react';
import { CheckIcon } from '@/components/Icons';

export default function ProfileShare({ uid, name }: { uid: string; name: string }) {
  const [copied, setCopied] = useState(false);

  function profileUrl() {
    return typeof window !== 'undefined' ? `${window.location.origin}/u/${uid}` : '';
  }

  function copy() {
    const url = profileUrl();
    const clip = typeof navigator !== 'undefined' ? navigator.clipboard : undefined;
    if (!url || !clip) return;
    clip
      .writeText(url)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      })
      .catch(() => {});
  }

  function share() {
    const url = profileUrl();
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({ title: `${name} on Brazen`, url }).catch(() => {});
    } else {
      copy();
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <button
          onClick={share}
          className="pp-btn pp-btn-primary flex-1"
          style={{ padding: '11px 0', fontSize: 14, justifyContent: 'center' }}
        >
          Share this card
        </button>
        <button
          onClick={copy}
          className="pp-btn flex-1"
          style={{
            padding: '11px 0',
            fontSize: 14,
            justifyContent: 'center',
            background: copied ? 'var(--pp-mint)' : 'var(--pp-card-2)',
            color: copied ? '#fff' : 'var(--pp-ink)',
          }}
        >
          {copied ? <CheckIcon size={14} strokeWidth={3} /> : null}
          {copied ? 'Copied' : 'Copy link'}
        </button>
      </div>
      <a
        href={`/u/${uid}/opengraph-image`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs font-bold text-center"
        style={{ color: 'var(--pp-ink-3)', padding: '4px 0' }}
      >
        Download card image →
      </a>
    </div>
  );
}
