'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';
import { ReceiptIcon, FlameIcon, TrophyIcon, ArrowRightIcon, CheckIcon } from './Icons';

type OnboardingStep = 'intro' | 'name' | 'ready';

const FIRST_ASK_IDEAS = [
  'Ask for a discount',
  'Cold-email your hero',
  'Request the corner table',
  'Ask for an intro',
];

export default function Onboarding() {
  const { completeOnboarding } = useStore();
  const [step, setStep] = useState<OnboardingStep>('intro');
  const [name, setName] = useState('');

  function handleComplete() {
    completeOnboarding(name.trim() || 'Anonymous');
  }

  const displayName = name.trim() || 'collector';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'var(--pp-bg)' }}
    >
      <div className="w-full max-w-sm h-full flex flex-col px-6 py-8">
        <AnimatePresence mode="wait">
          {step === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col justify-center"
            >
              <div className="text-center">
                <div className="relative inline-block mb-7">
                  <div
                    className="pp-num"
                    style={{
                      fontSize: 120,
                      color: 'var(--pp-coral)',
                      textShadow: '4px 4px 0 var(--pp-ink)',
                    }}
                  >
                    0
                  </div>
                  <div
                    className="pp-sticker absolute"
                    style={{
                      top: 18,
                      right: -30,
                      background: 'var(--pp-mint)',
                      color: '#fff',
                      transform: 'rotate(12deg)',
                    }}
                  >
                    for now
                  </div>
                </div>

                <h1 className="font-display text-3xl mb-3">Welcome, future collector.</h1>
                <p
                  className="text-base mx-auto mb-6"
                  style={{ color: 'var(--pp-ink-2)', lineHeight: 1.55, maxWidth: 320 }}
                >
                  The people who win the most hear no the most. We made this app to cheer you on
                  every time you ask — whatever the answer is.
                </p>
              </div>

              <div className="flex flex-col gap-2.5 mb-7">
                {[
                  { icon: <ReceiptIcon size={22} />, text: 'Log every ask, big or small' },
                  { icon: <FlameIcon size={22} style={{ color: 'var(--pp-coral)' }} />, text: 'Build streaks that compound' },
                  { icon: <TrophyIcon size={22} />, text: 'Hit milestones from 1 to 1,000' },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="pp-card pp-card-sm flex items-center gap-3 px-3.5 py-3"
                    style={{ boxShadow: 'var(--pp-shadow-soft)' }}
                  >
                    {row.icon}
                    <span className="font-semibold text-sm">{row.text}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setStep('name')}
                className="pp-btn pp-btn-primary w-full text-base"
                style={{ padding: '14px 0' }}
              >
                I&rsquo;m in
                <ArrowRightIcon size={16} />
              </button>
              <p className="text-center text-xs mt-3" style={{ color: 'var(--pp-ink-3)' }}>
                Free, no card, no nonsense.
              </p>
            </motion.div>
          )}

          {step === 'name' && (
            <motion.div
              key="name"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col pt-4"
            >
              <div className="flex items-center gap-2 mb-5">
                {[1, 2, 3].map((n) => (
                  <span
                    key={n}
                    className="flex-1"
                    style={{
                      height: 6,
                      borderRadius: 999,
                      background: n <= 2 ? 'var(--pp-coral)' : 'var(--pp-coral-sf)',
                      border: '1.5px solid var(--pp-ink)',
                    }}
                  />
                ))}
              </div>

              <h2 className="font-display text-3xl mb-2">What should we call you?</h2>
              <p className="text-sm mb-6" style={{ color: 'var(--pp-ink-2)' }}>
                Shown on the leaderboard. You can stay anonymous if you&rsquo;d rather.
              </p>

              <label className="block">
                <span className="block text-xs font-bold mb-1.5" style={{ color: 'var(--pp-ink-2)' }}>
                  Your name
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jess, or rejection-king-42"
                  autoFocus
                  className="w-full px-4 py-3 text-sm font-medium outline-none"
                  style={{
                    border: '2px solid var(--pp-ink)',
                    borderRadius: 12,
                    background: 'var(--pp-card)',
                    color: 'var(--pp-ink)',
                    boxShadow: 'var(--pp-shadow-sm)',
                  }}
                />
              </label>

              <div className="pp-tip mt-5">
                <span className="pp-tip-icon">!</span>
                <div>
                  <b>Tip:</b> Pick something fun — you&rsquo;ll see this name on the leaderboard and on
                  milestone cards.
                </div>
              </div>

              <div className="flex-1" />

              <button
                onClick={() => setStep('ready')}
                className="pp-btn pp-btn-primary w-full text-base"
                style={{ padding: '14px 0' }}
              >
                Next
                <ArrowRightIcon size={16} />
              </button>
              <button
                onClick={() => {
                  setName('');
                  setStep('ready');
                }}
                className="pp-btn pp-btn-ghost w-full mt-2 text-xs"
                style={{ padding: '10px 0' }}
              >
                Skip, I&rsquo;ll stay anonymous
              </button>
            </motion.div>
          )}

          {step === 'ready' && (
            <motion.div
              key="ready"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col justify-center"
            >
              <div className="text-center">
                <div
                  className="mx-auto mb-6 flex items-center justify-center"
                  style={{
                    width: 96,
                    height: 96,
                    borderRadius: 28,
                    background: 'var(--pp-mint)',
                    border: '2.5px solid var(--pp-ink)',
                    boxShadow: 'var(--pp-shadow-lg)',
                    transform: 'rotate(-6deg)',
                    color: '#fff',
                  }}
                >
                  <CheckIcon size={50} strokeWidth={5} />
                </div>

                <h2 className="font-display text-3xl mb-3">You&rsquo;re ready, {displayName}!</h2>
                <p className="text-base mb-7" style={{ color: 'var(--pp-ink-2)', lineHeight: 1.55 }}>
                  Your goal: <b>1,000 rejections this year</b>. That&rsquo;s about 3 a day. Three asks.
                  Three small braveries.
                </p>
              </div>

              <div className="pp-card mb-4" style={{ padding: 16, background: 'var(--pp-sun-sf)' }}>
                <div className="text-xs font-bold mb-2" style={{ color: 'var(--pp-ink-2)' }}>
                  FIRST-ASK IDEAS ↓
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {FIRST_ASK_IDEAS.map((t) => (
                    <span key={t} className="pp-pill" style={{ background: 'var(--pp-card)' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={handleComplete}
                className="pp-btn pp-btn-primary w-full text-base"
                style={{ padding: '14px 0' }}
              >
                Start collecting
                <ArrowRightIcon size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
