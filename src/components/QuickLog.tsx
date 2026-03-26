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
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
        className="relative w-full max-w-md bg-surface border-t border-border-light rounded-t-2xl sm:rounded-2xl sm:border p-6 pb-8 z-10"
      >
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onClose}
            className="text-secondary hover:text-foreground transition-colors text-[10px] font-mono uppercase tracking-widest cursor-pointer min-h-[44px] flex items-center"
          >
            Cancel
          </button>
          <div className="w-12" />
        </div>

        <h2 className="text-foreground font-serif font-light text-2xl mb-1">
          What did you ask for?
        </h2>
        <p className="text-secondary text-[10px] font-mono uppercase tracking-widest mb-5">
          Keep it short.
        </p>

        <input
          type="text"
          value={ask}
          onChange={(e) => setAsk(e.target.value)}
          placeholder="e.g. Asked for the meeting, pitched the idea"
          className="w-full bg-surface-elevated border border-border-light rounded-lg px-4 py-3 text-foreground text-sm font-mono placeholder:text-muted
            focus:outline-none focus:border-border-active transition-colors mb-5"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter' && ask.trim() && isYes !== null) handleSubmit();
          }}
        />

        {/* Result buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setIsYes(false)}
            className={`flex-1 py-4 rounded-lg text-sm font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer min-h-[52px] ${
              isYes === false
                ? 'bg-accent/15 border border-accent/40 text-accent'
                : 'border border-border-light text-secondary hover:border-border-active hover:text-foreground'
            }`}
          >
            No
          </button>
          <button
            onClick={() => setIsYes(true)}
            className={`flex-1 py-4 rounded-lg text-sm font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer min-h-[52px] ${
              isYes === true
                ? 'bg-success/15 border border-success/40 text-success'
                : 'border border-border-light text-secondary hover:border-border-active hover:text-foreground'
            }`}
          >
            Yes
          </button>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!ask.trim() || isYes === null}
          className="w-full py-3.5 rounded-lg border border-border-light text-foreground font-mono text-[11px] uppercase tracking-[0.15em]
            hover:border-border-active active:scale-[0.98] transition-all duration-200 cursor-pointer
            disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Log it
        </button>
      </motion.div>
    </motion.div>
  );
}
