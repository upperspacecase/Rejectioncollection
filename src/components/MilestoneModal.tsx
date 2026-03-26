'use client';

import { motion } from 'framer-motion';
import { MilestoneDef } from '@/lib/types';

interface MilestoneModalProps {
  milestone: MilestoneDef;
  onClose: () => void;
}

export default function MilestoneModal({ milestone, onClose }: MilestoneModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-6"
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 22,
          delay: 0.1,
        }}
        className="relative bg-surface rounded-lg p-8 max-w-sm w-full text-center z-10
          border border-accent/20"
      >
        {/* Milestone count */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 15,
            delay: 0.3,
          }}
          className="font-serif font-light text-accent leading-none mb-4"
          style={{ fontSize: 'clamp(3rem, 12vw, 5rem)' }}
        >
          {milestone.count.toLocaleString()}
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="text-foreground font-mono text-[10px] uppercase tracking-[0.2em] mb-4"
        >
          {milestone.title}
        </motion.h2>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="text-secondary font-serif font-light text-base italic leading-relaxed mb-8"
        >
          {milestone.message}
        </motion.p>

        {/* Dismiss */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          onClick={onClose}
          className="px-6 py-2.5 rounded-lg border border-border-light text-foreground font-mono text-[11px] uppercase tracking-[0.15em]
            hover:border-border-active active:scale-[0.97] transition-all duration-200 cursor-pointer"
        >
          Keep going
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
