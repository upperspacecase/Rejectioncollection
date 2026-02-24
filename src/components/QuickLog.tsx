'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';

interface QuickLogProps {
  onClose: () => void;
  onLogged: (wasRejection: boolean) => void;
}

export default function QuickLog({ onClose, onLogged }: QuickLogProps) {
  const { logEntry } = useStore();
  const [ask, setAsk] = useState('');
  const [isYes, setIsYes] = useState<boolean | null>(null);

  function handleSubmit() {
    if (!ask.trim() || isYes === null) return;
    logEntry({ ask: ask.trim(), isYes });
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
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
        className="relative w-full max-w-md bg-surface rounded-t-2xl sm:rounded-2xl p-6 pb-8 z-10"
      >
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onClose}
            className="text-secondary hover:text-foreground transition-colors text-sm font-medium"
          >
            Cancel
          </button>
          <div className="w-12" />
        </div>

        <h2 className="text-foreground font-bold text-xl mb-1">
          What did you ask for?
        </h2>
        <p className="text-secondary text-sm mb-5">
          Keep it short.
        </p>

        <input
          type="text"
          value={ask}
          onChange={(e) => setAsk(e.target.value)}
          placeholder="e.g. Asked for the meeting, pitched the idea"
          className="w-full bg-surface-elevated rounded-xl px-4 py-3 text-foreground placeholder:text-muted
            focus:outline-none focus:ring-2 focus:ring-accent/50 mb-5"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter' && ask.trim() && isYes !== null) handleSubmit();
          }}
        />

        {/* Thumbs up / down */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setIsYes(false)}
            className={`flex-1 py-4 rounded-xl text-3xl transition-all duration-150 ${
              isYes === false
                ? 'bg-accent ring-2 ring-accent ring-offset-2 ring-offset-surface scale-105'
                : 'bg-surface-elevated hover:bg-surface-elevated/80'
            }`}
          >
            &#x1F44E;
          </button>
          <button
            onClick={() => setIsYes(true)}
            className={`flex-1 py-4 rounded-xl text-3xl transition-all duration-150 ${
              isYes === true
                ? 'bg-success ring-2 ring-success ring-offset-2 ring-offset-surface scale-105'
                : 'bg-surface-elevated hover:bg-surface-elevated/80'
            }`}
          >
            &#x1F44D;
          </button>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!ask.trim() || isYes === null}
          className="w-full py-3.5 rounded-xl bg-accent text-accent-text font-bold text-base
            hover:bg-accent-hover active:scale-[0.98] transition-all duration-150
            disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Log it
        </button>
      </motion.div>
    </motion.div>
  );
}
