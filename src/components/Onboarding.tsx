'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';

type OnboardingStep = 'intro' | 'name' | 'ready';

export default function Onboarding() {
  const { completeOnboarding } = useStore();
  const [step, setStep] = useState<OnboardingStep>('intro');
  const [name, setName] = useState('');

  function handleComplete() {
    completeOnboarding(name.trim() || 'Anonymous');
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
                className="font-serif font-light text-accent leading-none mb-8"
                style={{ fontSize: 'clamp(4rem, 15vw, 6rem)' }}
              >
                0
              </div>
              <h1 className="text-foreground font-serif font-light text-3xl mb-3 lowercase">
                zero rejections.
              </h1>
              <p className="text-secondary font-serif font-light text-lg italic mb-2">
                That changes today.
              </p>
              <p className="text-muted text-[11px] font-mono leading-relaxed mb-8">
                The people who win the most hear &ldquo;no&rdquo; the most. This app turns every
                rejection into proof that you tried. Every &ldquo;no&rdquo; is a rep. Every
                attempt is data. Your rejection count isn&apos;t a measure of failure &mdash;
                it&apos;s a measure of courage.
              </p>
              <button
                onClick={() => setStep('name')}
                className="w-full py-3.5 rounded-lg border border-border-light text-foreground font-mono text-[11px] uppercase tracking-[0.15em]
                  hover:border-border-active active:scale-[0.98] transition-all duration-200 cursor-pointer"
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
              <h2 className="text-foreground font-serif font-light text-2xl mb-2 lowercase">
                what do they call you?
              </h2>
              <p className="text-secondary text-[10px] font-mono uppercase tracking-widest mb-6">
                For the leaderboard. You can stay anonymous.
              </p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name (or leave blank)"
                className="w-full bg-surface-elevated border border-border-light rounded-lg px-4 py-3.5 text-foreground text-sm font-mono placeholder:text-muted
                  focus:outline-none focus:border-border-active transition-colors mb-6"
                autoFocus
              />
              <button
                onClick={() => setStep('ready')}
                className="w-full py-3.5 rounded-lg border border-border-light text-foreground font-mono text-[11px] uppercase tracking-[0.15em]
                  hover:border-border-active active:scale-[0.98] transition-all duration-200 cursor-pointer"
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
              <h2 className="text-foreground font-serif font-light text-2xl mb-3 lowercase">
                your first rejection is out there.
              </h2>
              <p className="text-secondary font-serif font-light text-lg italic mb-2">
                Go find it.
              </p>
              <p className="text-muted text-[11px] font-mono leading-relaxed mb-8">
                Goal: 1,000 rejections this year. That sounds impossible until you
                realize it&apos;s about 3 per day. Three asks. Three chances to be brave.
              </p>
              <button
                onClick={handleComplete}
                className="w-full py-3.5 rounded-lg border border-border-light text-foreground font-mono text-[11px] uppercase tracking-[0.15em]
                  hover:border-border-active active:scale-[0.98] transition-all duration-200 cursor-pointer"
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
