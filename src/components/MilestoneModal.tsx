'use client';

import { motion } from 'framer-motion';
import { MilestoneDef } from '@/lib/types';
import { ArrowRightIcon, Confetti, TrophyIcon } from './Icons';

interface MilestoneModalProps {
  milestone: MilestoneDef;
  onClose: () => void;
}

export default function MilestoneModal({ milestone, onClose }: MilestoneModalProps) {
  async function handleShare() {
    const text = `Just hit ${milestone.count.toLocaleString()} rejections collected on Rejection Collection. ${milestone.title}.`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'Rejection Collection', text });
        return;
      } catch {
        // fall through to clipboard
      }
    }
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-5"
      style={{
        background: 'rgba(34,23,51,0.55)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
      }}
    >
      <Confetti color="var(--pp-grape)" />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22, delay: 0.1 }}
        className="relative w-full text-center z-10"
        style={{
          maxWidth: 320,
          padding: '28px 22px',
          background: 'var(--pp-card)',
          borderRadius: 22,
          border: '2.5px solid var(--pp-ink)',
          boxShadow: 'var(--pp-shadow-lg)',
        }}
      >
        <div
          className="pp-sticker absolute"
          style={{
            top: -14,
            right: -10,
            background: 'var(--pp-sun)',
            transform: 'rotate(10deg)',
            gap: 6,
          }}
        >
          <TrophyIcon size={14} />
          milestone
        </div>

        <motion.div
          initial={{ scale: 0.5, rotate: -15, opacity: 0 }}
          animate={{ scale: 1, rotate: -3, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.25 }}
          className="inline-block mb-4"
          style={{
            padding: '10px 20px',
            background: 'var(--pp-grape)',
            color: '#fff',
            border: '2.5px solid var(--pp-ink)',
            borderRadius: 18,
            boxShadow: 'var(--pp-shadow-lg)',
          }}
        >
          <div className="pp-num" style={{ fontSize: 64 }}>
            {milestone.count.toLocaleString()}
          </div>
        </motion.div>

        <div className="font-display text-2xl mb-2">{milestone.title}.</div>
        <p className="text-sm mb-5" style={{ color: 'var(--pp-ink-2)', lineHeight: 1.55 }}>
          {milestone.message}
        </p>

        <div className="flex gap-2">
          <button
            onClick={handleShare}
            className="pp-btn flex-1"
            style={{ padding: '12px 0', fontSize: 13 }}
          >
            Share win
          </button>
          <button
            onClick={onClose}
            className="pp-btn pp-btn-primary flex-1"
            style={{ padding: '12px 0', fontSize: 13 }}
          >
            Keep going
            <ArrowRightIcon size={14} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
