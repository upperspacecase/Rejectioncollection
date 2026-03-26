'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';
import { Rejection } from '@/lib/types';
import { formatRelativeTime } from '@/lib/utils';

type Filter = 'all' | 'rejections' | 'yeses' | 'useful';

export default function RejectionFeed() {
  const { state, toggleUseful, deleteEntry } = useStore();
  const [filter, setFilter] = useState<Filter>('all');

  let filtered = state.entries;

  if (filter === 'rejections') filtered = filtered.filter((e) => !e.isYes);
  else if (filter === 'yeses') filtered = filtered.filter((e) => e.isYes);
  else if (filter === 'useful') filtered = filtered.filter((e) => e.useful);

  return (
    <div className="flex flex-col h-full">
      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-3 scrollbar-hide px-1">
        {(['all', 'rejections', 'yeses', 'useful'] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3.5 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-[0.15em] whitespace-nowrap transition-all duration-200 cursor-pointer min-h-[36px] ${
              filter === f
                ? 'border border-foreground/40 text-foreground'
                : 'border border-border-light text-secondary hover:text-foreground hover:border-border-active'
            }`}
          >
            {f === 'all' ? 'All' : f === 'rejections' ? 'Nos' : f === 'yeses' ? 'Yeses' : 'Useful'}
          </button>
        ))}
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        <AnimatePresence initial={false}>
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-secondary font-mono text-[10px] uppercase tracking-widest">
                {state.entries.length === 0
                  ? 'Nothing here yet. Go get rejected.'
                  : 'No entries match that filter.'}
              </p>
            </motion.div>
          )}
          {filtered.map((entry) => (
            <FeedItem
              key={entry.id}
              entry={entry}
              onToggleUseful={() => toggleUseful(entry.id)}
              onDelete={() => deleteEntry(entry.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function FeedItem({
  entry,
  onToggleUseful,
  onDelete,
}: {
  entry: Rejection;
  onToggleUseful: () => void;
  onDelete: () => void;
}) {
  const [showActions, setShowActions] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`rounded-lg p-4 transition-colors duration-300 cursor-pointer ${
        entry.useful
          ? 'border border-accent/20 bg-accent/5'
          : 'border border-border-light'
      }`}
      onClick={() => setShowActions(!showActions)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-secondary">
              {entry.isYes ? 'YES' : 'NO'}
            </span>
            {entry.useful && (
              <span className="text-accent text-[10px] font-mono uppercase tracking-wider">
                Useful
              </span>
            )}
          </div>
          <p className="text-foreground font-serif text-base font-light truncate">
            {entry.ask}
          </p>
        </div>
        <span className="text-muted text-[10px] font-mono whitespace-nowrap mt-0.5">
          {formatRelativeTime(entry.timestamp)}
        </span>
      </div>

      {/* Actions */}
      <AnimatePresence>
        {showActions && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            <div className="flex gap-2 mt-3 pt-3 border-t border-border-light">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleUseful();
                }}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer min-h-[36px] ${
                  entry.useful
                    ? 'border border-accent/30 text-accent'
                    : 'border border-border-light text-secondary hover:text-foreground hover:border-border-active'
                }`}
              >
                {entry.useful ? 'Unmark useful' : 'Mark useful'}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className="px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider border border-border-light text-secondary
                  hover:text-red-400 hover:border-red-400/30 transition-colors cursor-pointer min-h-[36px]"
              >
                Delete
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
