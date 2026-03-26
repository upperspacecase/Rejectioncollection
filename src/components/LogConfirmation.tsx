'use client';

import { motion } from 'framer-motion';

interface LogConfirmationProps {
  isRejection: boolean;
  onDone: () => void;
}

export default function LogConfirmation({ isRejection, onDone }: LogConfirmationProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onAnimationComplete={() => {
        setTimeout(onDone, 1200);
      }}
      className="fixed inset-0 z-[55] flex items-center justify-center pointer-events-none"
    >
      <motion.div
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.2, opacity: 0 }}
        transition={{
          type: 'spring',
          stiffness: 250,
          damping: 18,
          mass: 0.8,
        }}
        className="text-center"
      >
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="font-serif font-light text-accent leading-none mb-2 lowercase"
          style={{ fontSize: 'clamp(2.5rem, 10vw, 4.5rem)' }}
        >
          {isRejection ? 'Logged.' : 'Nice.'}
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-secondary text-[10px] font-mono uppercase tracking-[0.2em]"
        >
          {isRejection ? 'That counted. Go again.' : 'A yes. Keep the volume up.'}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
