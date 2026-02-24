'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CountDisplayProps {
  count: number;
  label?: string;
}

function Digit({ value, index }: { value: string; index: number }) {
  return (
    <div className="relative inline-block overflow-hidden h-[1em]" style={{ width: value === ',' ? '0.35em' : '0.65em' }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value + '-' + index}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 25,
            mass: 0.8,
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function CountDisplay({ count, label }: CountDisplayProps) {
  const [displayCount, setDisplayCount] = useState(count);
  const prevCount = useRef(count);

  useEffect(() => {
    if (count !== prevCount.current) {
      prevCount.current = count;
      setDisplayCount(count);
    }
  }, [count]);

  const formatted = displayCount.toLocaleString();
  const digits = formatted.split('');

  return (
    <div className="flex flex-col items-center select-none">
      <div
        className="font-display font-black tracking-tight leading-none text-foreground"
        style={{ fontSize: 'clamp(5rem, 20vw, 10rem)' }}
        aria-label={`${count} rejections`}
      >
        {digits.map((d, i) => (
          <Digit key={i} value={d} index={i} />
        ))}
      </div>
      <p className="mt-2 text-secondary text-sm tracking-widest uppercase font-medium">
        {label || 'times you didn\u2019t play it safe'}
      </p>
    </div>
  );
}
