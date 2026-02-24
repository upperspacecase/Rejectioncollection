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
                className="w-full py-3.5 rounded-xl bg-accent text-accent-text font-bold text-base
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
                onClick={() => setStep('ready')}
                className="w-full py-3.5 rounded-xl bg-accent text-accent-text font-bold text-base
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
                className="w-full py-3.5 rounded-xl bg-accent text-accent-text font-bold text-base
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
