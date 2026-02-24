'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RejectionCategory, CATEGORY_LABELS } from '@/lib/types';
import { useStore } from '@/lib/store';

interface QuickLogProps {
  onClose: () => void;
  onLogged: (wasRejection: boolean) => void;
}

type Step = 'category' | 'details' | 'useful';

const CATEGORY_ORDER: RejectionCategory[] = [
  'pitch',
  'ask',
  'application',
  'creative',
  'personal',
  'sales',
  'other',
];

export default function QuickLog({ onClose, onLogged }: QuickLogProps) {
  const { state, logEntry } = useStore();
  const [step, setStep] = useState<Step>('category');
  const [category, setCategory] = useState<RejectionCategory | null>(null);
  const [ask, setAsk] = useState('');
  const [outcome, setOutcome] = useState('');
  const [isYes, setIsYes] = useState(false);
  const [useful, setUseful] = useState(false);

  const categories = state.profile.categories.length > 0
    ? CATEGORY_ORDER.filter((c) => state.profile.categories.includes(c))
    : CATEGORY_ORDER;

  function handleCategorySelect(cat: RejectionCategory) {
    setCategory(cat);
    setStep('details');
  }

  function handleDetailsNext() {
    if (!ask.trim()) return;
    setStep('useful');
  }

  function handleSubmit() {
    if (!category || !ask.trim()) return;
    logEntry({
      category,
      ask: ask.trim(),
      outcome: outcome.trim() || (isYes ? 'They said yes' : 'They said no'),
      useful,
      isYes,
    });
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
        {/* Close / Back */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={step === 'category' ? onClose : () => setStep(step === 'useful' ? 'details' : 'category')}
            className="text-secondary hover:text-foreground transition-colors text-sm font-medium"
          >
            {step === 'category' ? 'Cancel' : 'Back'}
          </button>
          <div className="flex gap-1.5">
            {(['category', 'details', 'useful'] as Step[]).map((s) => (
              <div
                key={s}
                className={`h-1 w-6 rounded-full transition-colors duration-200 ${
                  step === s ? 'bg-accent' : 'bg-muted/30'
                }`}
              />
            ))}
          </div>
          <div className="w-12" />
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Category */}
          {step === 'category' && (
            <motion.div
              key="category"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-foreground font-bold text-xl mb-1">
                What did you go for?
              </h2>
              <p className="text-secondary text-sm mb-5">Pick a category.</p>
              <div className="grid grid-cols-2 gap-2.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className="py-3 px-4 rounded-xl bg-surface-elevated text-foreground font-medium text-left
                      hover:bg-accent/20 hover:text-accent active:scale-[0.97] transition-all duration-150"
                  >
                    {CATEGORY_LABELS[cat]}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Details */}
          {step === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-foreground font-bold text-xl mb-1">
                What happened?
              </h2>
              <p className="text-secondary text-sm mb-5">Keep it short. This is a field note, not a journal.</p>

              <label className="block text-secondary text-xs uppercase tracking-wider font-medium mb-1.5">
                What did you ask for?
              </label>
              <input
                type="text"
                value={ask}
                onChange={(e) => setAsk(e.target.value)}
                placeholder="e.g. Asked for the meeting, pitched the idea"
                className="w-full bg-surface-elevated rounded-xl px-4 py-3 text-foreground placeholder:text-muted
                  focus:outline-none focus:ring-2 focus:ring-accent/50 mb-4"
                autoFocus
              />

              <label className="block text-secondary text-xs uppercase tracking-wider font-medium mb-1.5">
                What was the result?
              </label>
              <input
                type="text"
                value={outcome}
                onChange={(e) => setOutcome(e.target.value)}
                placeholder='e.g. "Not a fit right now"'
                className="w-full bg-surface-elevated rounded-xl px-4 py-3 text-foreground placeholder:text-muted
                  focus:outline-none focus:ring-2 focus:ring-accent/50 mb-4"
              />

              {/* Rejection or Yes toggle */}
              <div className="flex gap-2 mb-5">
                <button
                  onClick={() => setIsYes(false)}
                  className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                    !isYes
                      ? 'bg-accent text-white'
                      : 'bg-surface-elevated text-secondary hover:text-foreground'
                  }`}
                >
                  I got rejected
                </button>
                <button
                  onClick={() => setIsYes(true)}
                  className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                    isYes
                      ? 'bg-success text-white'
                      : 'bg-surface-elevated text-secondary hover:text-foreground'
                  }`}
                >
                  They said yes
                </button>
              </div>

              <button
                onClick={handleDetailsNext}
                disabled={!ask.trim()}
                className="w-full py-3.5 rounded-xl bg-accent text-white font-bold text-base
                  hover:bg-accent-hover active:scale-[0.98] transition-all duration-150
                  disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </motion.div>
          )}

          {/* Step 3: Useful? */}
          {step === 'useful' && (
            <motion.div
              key="useful"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-foreground font-bold text-xl mb-1">
                Was it useful?
              </h2>
              <p className="text-secondary text-sm mb-6">
                Did you learn something, get redirected, or build resilience?
              </p>

              <div className="flex gap-3 mb-6">
                <button
                  onClick={() => setUseful(true)}
                  className={`flex-1 py-4 rounded-xl font-bold text-base transition-all duration-200 ${
                    useful
                      ? 'bg-accent text-white ring-2 ring-accent ring-offset-2 ring-offset-surface'
                      : 'bg-surface-elevated text-secondary hover:text-foreground'
                  }`}
                >
                  Yes, useful
                </button>
                <button
                  onClick={() => setUseful(false)}
                  className={`flex-1 py-4 rounded-xl font-bold text-base transition-all duration-200 ${
                    !useful
                      ? 'bg-surface-elevated text-foreground ring-2 ring-secondary/30 ring-offset-2 ring-offset-surface'
                      : 'bg-surface-elevated text-secondary hover:text-foreground'
                  }`}
                >
                  Not yet
                </button>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full py-3.5 rounded-xl bg-accent text-white font-bold text-base
                  hover:bg-accent-hover active:scale-[0.98] transition-all duration-150"
              >
                Log it
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
