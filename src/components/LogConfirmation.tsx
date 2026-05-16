'use client';

import { motion } from 'framer-motion';
import { CheckIcon, Confetti } from './Icons';

interface LogConfirmationProps {
  isRejection: boolean;
  onDone: () => void;
}

export default function LogConfirmation({ isRejection, onDone }: LogConfirmationProps) {
  const color = isRejection ? 'var(--pp-coral)' : 'var(--pp-mint)';
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onAnimationComplete={() => {
        setTimeout(onDone, 1400);
      }}
      className="fixed inset-0 z-[55] flex items-center justify-center pointer-events-none"
      style={{
        background: 'rgba(34,23,51,0.35)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
      }}
    >
      <Confetti color={color} />

      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.05, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18, mass: 0.8 }}
        className="text-center relative z-10"
        style={{
          padding: '28px 26px',
          maxWidth: 280,
          background: 'var(--pp-card)',
          borderRadius: 22,
          border: '2.5px solid var(--pp-ink)',
          boxShadow: 'var(--pp-shadow-lg)',
        }}
      >
        <motion.div
          initial={{ rotate: -20, scale: 0.6 }}
          animate={{ rotate: -6, scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 220, damping: 16 }}
          className="mx-auto mb-3.5 flex items-center justify-center"
          style={{
            width: 76,
            height: 76,
            background: color,
            borderRadius: 22,
            border: '2.5px solid var(--pp-ink)',
            boxShadow: 'var(--pp-shadow)',
            color: '#fff',
          }}
        >
          <CheckIcon size={40} strokeWidth={5} />
        </motion.div>

        <div className="font-display text-2xl mb-1">
          {isRejection ? 'Logged!' : 'A yes!'}
        </div>
        <p className="text-sm" style={{ color: 'var(--pp-ink-2)' }}>
          {isRejection ? 'That counted. Onto the next one.' : 'Bonus points. Keep the volume up.'}
        </p>
      </motion.div>
    </motion.div>
  );
}
