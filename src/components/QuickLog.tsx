'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import { QUICK_FILL_SUGGESTIONS } from '@/lib/asks';
import { ArrowRightIcon } from './Icons';

interface QuickLogProps {
  onClose: () => void;
  onLogged: (wasRejection: boolean) => void;
}

export default function QuickLog({ onClose, onLogged }: QuickLogProps) {
  const { logEntry } = useStore();
  const [ask, setAsk] = useState('');
  const [isYes, setIsYes] = useState<boolean | null>(null);

  const ready = ask.trim().length > 0 && isYes !== null;

  function handleSubmit() {
    if (!ready) return;
    logEntry({ ask: ask.trim(), isYes: !!isYes });
    onLogged(!isYes);
    onClose();
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
    >
      <div
        className="absolute inset-0"
        style={{
          background: 'rgba(34,23,51,0.45)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
        onClick={onClose}
      />

      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
        className="relative w-full max-w-md z-10"
        style={{
          background: 'var(--pp-card)',
          borderRadius: 22,
          border: '2px solid var(--pp-ink)',
          boxShadow: 'var(--pp-shadow-lg)',
          margin: '0 8px 8px',
          padding: '20px 18px 22px',
        }}
      >
        <div className="flex justify-between items-center mb-3.5">
          <button
            onClick={onClose}
            className="pp-btn pp-btn-ghost"
            style={{ padding: '4px 10px', fontSize: 12, minHeight: 0 }}
          >
            ← Cancel
          </button>
          <span className="text-xs font-bold" style={{ color: 'var(--pp-ink-3)' }}>
            New entry
          </span>
          <span style={{ width: 64 }} />
        </div>

        <h2 className="font-display text-xl mb-1">What did you ask for?</h2>
        <p className="text-sm mb-3" style={{ color: 'var(--pp-ink-3)' }}>
          Keep it short. Past tense.
        </p>

        <input
          type="text"
          value={ask}
          onChange={(e) => setAsk(e.target.value)}
          placeholder="e.g. Asked for a raise, sent a cold pitch"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter' && ready) handleSubmit();
          }}
          className="w-full px-3.5 py-3 text-base font-semibold outline-none mb-3"
          style={{
            border: '2px solid var(--pp-ink)',
            borderRadius: 12,
            background: 'var(--pp-card-2)',
            color: 'var(--pp-ink)',
            boxShadow: 'var(--pp-shadow-sm)',
          }}
        />

        {ask.trim().length === 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            <span className="text-xs font-bold w-full" style={{ color: 'var(--pp-ink-3)' }}>
              QUICK FILLS
            </span>
            {QUICK_FILL_SUGGESTIONS.map((t) => (
              <button
                key={t}
                onClick={() => setAsk(t)}
                className="pp-pill cursor-pointer"
                style={{ background: 'var(--pp-card-2)', fontSize: 11 }}
              >
                {t}
              </button>
            ))}
          </div>
        )}

        <div className="text-xs font-bold mb-2" style={{ color: 'var(--pp-ink-3)' }}>
          HOW DID IT GO?
        </div>
        <div className="flex gap-2.5 mb-3.5">
          <button
            onClick={() => setIsYes(false)}
            className="pp-btn flex-1"
            style={{
              padding: '14px 0',
              fontSize: 15,
              background: isYes === false ? 'var(--pp-coral)' : 'var(--pp-coral-sf)',
              color: isYes === false ? '#fff' : 'var(--pp-ink)',
            }}
          >
            <span style={{ fontSize: 17 }}>✕</span> Got a No
          </button>
          <button
            onClick={() => setIsYes(true)}
            className="pp-btn flex-1"
            style={{
              padding: '14px 0',
              fontSize: 15,
              background: isYes === true ? 'var(--pp-mint)' : 'var(--pp-mint-sf)',
              color: isYes === true ? '#fff' : 'var(--pp-ink)',
            }}
          >
            <span style={{ fontSize: 17 }}>✓</span> Got a Yes
          </button>
        </div>

        <div className="pp-tip mb-3.5">
          <span className="pp-tip-icon">i</span>
          <div>
            No response after a week? <b>Counts as a no.</b> Don&rsquo;t let your brain rewrite it.
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!ready}
          className="pp-btn pp-btn-primary w-full"
          style={{ padding: '14px 0', fontSize: 15 }}
        >
          Log it
          <ArrowRightIcon size={16} />
        </button>
      </motion.div>
    </motion.div>
  );
}
