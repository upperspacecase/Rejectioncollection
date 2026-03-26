'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CountDisplayProps {
  count: number;
  label?: string;
}

function Digit({ value, index }: { value: string; index: number }) {
  return (
    <div className="relative inline-block overflow-hidden h-[1em]" style={{ width: value === ',' ? '0.3em' : '0.6em' }}>
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
        className="font-serif font-light tracking-tight leading-none text-foreground"
        style={{ fontSize: 'clamp(5rem, 20vw, 10rem)' }}
        aria-label={`${count} rejections`}
      >
        {digits.map((d, i) => (
          <Digit key={i} value={d} index={i} />
        ))}
      </div>
      <p className="mt-3 text-secondary text-[10px] tracking-[0.2em] uppercase font-mono font-light">
        {label || 'times you didn\u2019t play it safe'}
      </p>
    </div>
  );
}
