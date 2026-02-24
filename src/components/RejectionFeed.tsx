'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';
import { CATEGORY_LABELS, RejectionCategory, Rejection } from '@/lib/types';
import { formatRelativeTime } from '@/lib/utils';

type Filter = 'all' | 'rejections' | 'yeses' | 'useful';

export default function RejectionFeed() {
  const { state, toggleUseful, deleteEntry } = useStore();
  const [filter, setFilter] = useState<Filter>('all');
  const [categoryFilter, setCategoryFilter] = useState<RejectionCategory | 'all'>('all');

  let filtered = state.entries;

  if (filter === 'rejections') filtered = filtered.filter((e) => !e.isYes);
  else if (filter === 'yeses') filtered = filtered.filter((e) => e.isYes);
  else if (filter === 'useful') filtered = filtered.filter((e) => e.useful);

  if (categoryFilter !== 'all') {
    filtered = filtered.filter((e) => e.category === categoryFilter);
  }

  return (
    <div className="flex flex-col h-full">
      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-3 scrollbar-hide px-1">
        {(['all', 'rejections', 'yeses', 'useful'] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-150 ${
              filter === f
                ? 'bg-accent text-white'
                : 'bg-surface-elevated text-secondary hover:text-foreground'
            }`}
          >
            {f === 'all' ? 'All' : f === 'rejections' ? 'Nos' : f === 'yeses' ? 'Yeses' : 'Useful'}
          </button>
        ))}
        <div className="w-px bg-muted/20 mx-1 self-stretch" />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as RejectionCategory | 'all')}
          className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider
            bg-surface-elevated text-secondary appearance-none cursor-pointer
            hover:text-foreground transition-colors"
        >
          <option value="all">All types</option>
          {state.profile.categories.map((cat) => (
            <option key={cat} value={cat}>
              {CATEGORY_LABELS[cat]}
            </option>
          ))}
        </select>
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
              <p className="text-secondary text-sm">
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
      className={`rounded-xl p-4 transition-colors duration-300 ${
        entry.useful
          ? 'bg-accent/10 border border-accent/20'
          : 'bg-surface-elevated border border-transparent'
      }`}
      onClick={() => setShowActions(!showActions)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`text-xs font-bold uppercase tracking-wider ${
                entry.isYes ? 'text-success' : 'text-accent'
              }`}
            >
              {entry.isYes ? 'YES' : 'NO'}
            </span>
            <span className="text-muted text-xs">
              {CATEGORY_LABELS[entry.category]}
            </span>
            {entry.useful && (
              <span className="text-accent text-xs font-medium">
                Useful
              </span>
            )}
          </div>
          <p className="text-foreground text-sm font-medium truncate">
            {entry.ask}
          </p>
          {entry.outcome && (
            <p className="text-secondary text-xs mt-0.5 truncate">
              {entry.outcome}
            </p>
          )}
        </div>
        <span className="text-muted text-xs whitespace-nowrap mt-0.5">
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
            <div className="flex gap-2 mt-3 pt-3 border-t border-muted/10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleUseful();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                  entry.useful
                    ? 'bg-accent/20 text-accent'
                    : 'bg-surface text-secondary hover:text-foreground'
                }`}
              >
                {entry.useful ? 'Mark not useful' : 'Mark useful'}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-surface text-secondary
                  hover:text-red-400 transition-colors"
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
