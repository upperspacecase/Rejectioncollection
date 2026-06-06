'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ASK_LIBRARY } from '@/lib/askLibrary';
import { CloseIcon, CheckIcon, SparkleIcon } from './Icons';

export default function AskLibrary({
  onClose,
  initialCategory,
}: {
  onClose: () => void;
  initialCategory?: string;
}) {
  const [activeId, setActiveId] = useState(
    () => ASK_LIBRARY.find((c) => c.id === initialCategory)?.id ?? ASK_LIBRARY[0].id
  );
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const active = ASK_LIBRARY.find((c) => c.id === activeId) ?? ASK_LIBRARY[0];

  function copy(text: string, key: string) {
    const clip = typeof navigator !== 'undefined' ? navigator.clipboard : undefined;
    if (!clip) return;
    clip
      .writeText(text)
      .then(() => {
        setCopiedKey(key);
        setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1300);
      })
      .catch(() => {});
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-[60] flex flex-col"
      style={{ background: 'var(--pp-bg)' }}
    >
      {/* Header */}
      <div className="flex-shrink-0 px-5 pt-4 pb-3" style={{ borderBottom: '2px solid var(--pp-ink)' }}>
        <div className="max-w-lg mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <SparkleIcon size={24} />
            <div>
              <h1 className="font-display text-2xl leading-none">Ask Library</h1>
              <p className="text-xs mt-0.5" style={{ color: 'var(--pp-ink-3)' }}>
                100+ scripts for brave asks
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex items-center justify-center cursor-pointer"
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background: 'var(--pp-card)',
              border: '2px solid var(--pp-ink)',
              boxShadow: 'var(--pp-shadow-sm)',
            }}
          >
            <CloseIcon size={18} />
          </button>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex-shrink-0 px-5 py-3">
        <div className="max-w-lg mx-auto w-full flex gap-1.5 overflow-x-auto pb-1">
          {ASK_LIBRARY.map((cat) => {
            const isActive = cat.id === activeId;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveId(cat.id)}
                className="pp-pill cursor-pointer flex-shrink-0"
                style={{
                  background: isActive ? 'var(--pp-coral)' : 'var(--pp-card)',
                  color: isActive ? '#fff' : 'var(--pp-ink)',
                  fontSize: 12,
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Scripts */}
      <div className="flex-1 overflow-y-auto px-5 pb-8">
        <div className="max-w-lg mx-auto w-full">
          <p className="text-sm mb-4" style={{ color: 'var(--pp-ink-2)' }}>
            {active.blurb}
          </p>

          <div className="flex flex-col gap-3">
            {active.scripts.map((s, i) => (
              <div key={i} className="pp-card" style={{ padding: 16 }}>
                <div className="font-display text-base mb-2.5">{s.title}</div>

                <ScriptLine
                  label="Soft"
                  labelBg="var(--pp-mint-sf)"
                  text={s.soft}
                  copied={copiedKey === `${active.id}-${i}-soft`}
                  onCopy={() => copy(s.soft, `${active.id}-${i}-soft`)}
                />
                <div style={{ height: 8 }} />
                <ScriptLine
                  label="Bold"
                  labelBg="var(--pp-coral-sf)"
                  text={s.bold}
                  copied={copiedKey === `${active.id}-${i}-bold`}
                  onCopy={() => copy(s.bold, `${active.id}-${i}-bold`)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ScriptLine({
  label,
  labelBg,
  text,
  copied,
  onCopy,
}: {
  label: string;
  labelBg: string;
  text: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div
      className="flex items-start gap-2.5"
      style={{ background: 'var(--pp-card-2)', border: '1.5px solid var(--pp-ink)', borderRadius: 12, padding: '10px 12px' }}
    >
      <span
        className="text-[10px] font-bold uppercase tracking-wider flex-shrink-0"
        style={{ padding: '3px 8px', borderRadius: 999, background: labelBg, border: '1.5px solid var(--pp-ink)', marginTop: 1 }}
      >
        {label}
      </span>
      <p className="flex-1 text-sm" style={{ color: 'var(--pp-ink)', lineHeight: 1.5 }}>
        {text}
      </p>
      <button
        onClick={onCopy}
        aria-label={`Copy ${label.toLowerCase()} version`}
        className="flex-shrink-0 cursor-pointer text-xs font-bold inline-flex items-center gap-1"
        style={{
          padding: '5px 9px',
          borderRadius: 999,
          background: copied ? 'var(--pp-mint)' : 'var(--pp-card)',
          color: copied ? '#fff' : 'var(--pp-ink-2)',
          border: '1.5px solid var(--pp-ink)',
        }}
      >
        {copied ? <CheckIcon size={11} strokeWidth={3} /> : null}
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}
