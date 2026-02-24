'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RejectionCategory, CATEGORY_LABELS } from '@/lib/types';
import { useStore } from '@/lib/store';

const ALL_CATEGORIES: RejectionCategory[] = [
  'pitch',
  'ask',
  'application',
  'creative',
  'personal',
  'sales',
];

type OnboardingStep = 'intro' | 'name' | 'categories' | 'ready';

export default function Onboarding() {
  const { completeOnboarding } = useStore();
  const [step, setStep] = useState<OnboardingStep>('intro');
  const [name, setName] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<RejectionCategory[]>([
    'pitch',
    'ask',
    'application',
    'creative',
    'personal',
  ]);

  function toggleCategory(cat: RejectionCategory) {
    setSelectedCategories((prev) =>
      prev.includes(cat)
        ? prev.filter((c) => c !== cat)
        : [...prev, cat]
    );
  }

  function handleComplete() {
    completeOnboarding(
      name.trim() || 'Anonymous',
      selectedCategories.length > 0 ? selectedCategories : ALL_CATEGORIES
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <AnimatePresence mode="wait">
          {/* Intro */}
          {step === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div
                className="font-display font-black text-accent leading-none mb-6"
                style={{ fontSize: 'clamp(3rem, 15vw, 5.5rem)' }}
              >
                0
              </div>
              <h1 className="text-foreground font-bold text-2xl mb-3">
                Zero rejections.
              </h1>
              <p className="text-secondary text-base mb-2 leading-relaxed">
                That changes today.
              </p>
              <p className="text-muted text-sm mb-8 leading-relaxed">
                The people who win the most hear &ldquo;no&rdquo; the most. This app turns every
                rejection into proof that you tried. Every &ldquo;no&rdquo; is a rep. Every
                attempt is data. Your rejection count isn&apos;t a measure of failure &mdash;
                it&apos;s a measure of courage.
              </p>
              <button
                onClick={() => setStep('name')}
                className="w-full py-3.5 rounded-xl bg-accent text-white font-bold text-base
                  hover:bg-accent-hover active:scale-[0.98] transition-all duration-150"
              >
                I&apos;m in
              </button>
            </motion.div>
          )}

          {/* Name */}
          {step === 'name' && (
            <motion.div
              key="name"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-foreground font-bold text-xl mb-2">
                What do they call you?
              </h2>
              <p className="text-secondary text-sm mb-6">
                For the leaderboard. You can stay anonymous.
              </p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name (or leave blank)"
                className="w-full bg-surface-elevated rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted
                  focus:outline-none focus:ring-2 focus:ring-accent/50 mb-6"
                autoFocus
              />
              <button
                onClick={() => setStep('categories')}
                className="w-full py-3.5 rounded-xl bg-accent text-white font-bold text-base
                  hover:bg-accent-hover active:scale-[0.98] transition-all duration-150"
              >
                Next
              </button>
            </motion.div>
          )}

          {/* Categories */}
          {step === 'categories' && (
            <motion.div
              key="categories"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-foreground font-bold text-xl mb-2">
                Where are you hunting rejections?
              </h2>
              <p className="text-secondary text-sm mb-5">
                Pick the areas where you want to stop playing it safe.
              </p>
              <div className="grid grid-cols-2 gap-2.5 mb-6">
                {ALL_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`py-3 px-4 rounded-xl font-medium text-sm text-left transition-all duration-150 ${
                      selectedCategories.includes(cat)
                        ? 'bg-accent/20 text-accent border border-accent/30'
                        : 'bg-surface-elevated text-secondary border border-transparent hover:text-foreground'
                    }`}
                  >
                    {CATEGORY_LABELS[cat]}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep('ready')}
                className="w-full py-3.5 rounded-xl bg-accent text-white font-bold text-base
                  hover:bg-accent-hover active:scale-[0.98] transition-all duration-150"
              >
                Next
              </button>
            </motion.div>
          )}

          {/* Ready */}
          {step === 'ready' && (
            <motion.div
              key="ready"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <h2 className="text-foreground font-bold text-2xl mb-3">
                Your first rejection is out there.
              </h2>
              <p className="text-secondary text-base mb-2">
                Go find it.
              </p>
              <p className="text-muted text-sm mb-8 leading-relaxed">
                Goal: 1,000 rejections this year. That sounds impossible until you
                realize it&apos;s about 3 per day. Three asks. Three chances to be brave.
              </p>
              <button
                onClick={handleComplete}
                className="w-full py-3.5 rounded-xl bg-accent text-white font-bold text-base
                  hover:bg-accent-hover active:scale-[0.98] transition-all duration-150"
              >
                Start collecting
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
