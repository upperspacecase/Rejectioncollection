'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';
import { Rejection } from '@/lib/types';
import { formatRelativeTime, getRejections, getYeses } from '@/lib/utils';
import { StarIcon, TrashIcon } from './Icons';

type Filter = 'all' | 'rejections' | 'yeses' | 'useful';

export default function RejectionFeed() {
  const { state, toggleUseful, deleteEntry } = useStore();
  const [filter, setFilter] = useState<Filter>('all');

  const all = state.entries;
  const counts = {
    all: all.length,
    rejections: getRejections(all).length,
    yeses: getYeses(all).length,
    useful: all.filter((e) => e.useful).length,
  };

  let filtered = all;
  if (filter === 'rejections') filtered = all.filter((e) => !e.isYes);
  else if (filter === 'yeses') filtered = all.filter((e) => e.isYes);
  else if (filter === 'useful') filtered = all.filter((e) => e.useful);

  const filters: { id: Filter; label: React.ReactNode }[] = [
    { id: 'all', label: 'All' },
    { id: 'rejections', label: 'Nos' },
    { id: 'yeses', label: 'Yeses' },
    {
      id: 'useful',
      label: (
        <span className="inline-flex items-center gap-1">
          <StarIcon size={11} style={{ color: 'var(--pp-sun)' }} /> Useful
        </span>
      ),
    },
  ];

  return (
    <div className="h-full flex flex-col px-5 pt-4 pb-2">
      <h1 className="font-display text-2xl mb-1">Your log</h1>
      <p className="text-sm mb-3" style={{ color: 'var(--pp-ink-3)' }}>
        Every ask, in order. Tap any to mark useful or remove.
      </p>

      <div className="flex gap-1.5 mb-3 overflow-x-auto scrollbar-hide pb-1">
        {filters.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className="pp-pill cursor-pointer"
              style={{
                padding: '6px 12px',
                fontSize: 12,
                background: active ? 'var(--pp-ink)' : 'var(--pp-card)',
                color: active ? 'var(--pp-bg)' : 'var(--pp-ink)',
                borderColor: 'var(--pp-ink)',
                boxShadow: active ? 'none' : 'var(--pp-shadow-sm)',
              }}
            >
              {f.label}
              <span style={{ opacity: 0.7, marginLeft: 2 }}>{counts[f.id]}</span>
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-2">
        <AnimatePresence initial={false}>
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pp-card pp-card-sm text-center"
              style={{
                padding: '24px 16px',
                background: 'var(--pp-card-2)',
              }}
            >
              <p className="text-sm" style={{ color: 'var(--pp-ink-2)' }}>
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
  const [open, setOpen] = useState(false);
  const isYes = entry.isYes;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      onClick={() => setOpen((o) => !o)}
      className="pp-card pp-card-sm cursor-pointer"
      style={{
        padding: '12px 14px',
        background: entry.useful ? 'var(--pp-sun-sf)' : 'var(--pp-card)',
      }}
    >
      <div className="flex items-center gap-2.5">
        <span
          className="font-bold text-xs"
          style={{
            flexShrink: 0,
            padding: '3px 10px',
            borderRadius: 999,
            background: isYes ? 'var(--pp-mint)' : 'var(--pp-coral)',
            color: '#fff',
            border: '1.5px solid var(--pp-ink)',
          }}
        >
          {isYes ? '✓ Yes' : '✕ No'}
        </span>
        <span
          className="flex-1 font-semibold text-sm"
          style={{
            color: 'var(--pp-ink)',
            whiteSpace: open ? 'normal' : 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {entry.ask}
        </span>
        {entry.useful && !open && (
          <span style={{ color: 'var(--pp-sun)', display: 'inline-flex' }} title="Marked useful">
            <StarIcon size={14} />
          </span>
        )}
        <span className="text-xs font-semibold whitespace-nowrap" style={{ color: 'var(--pp-ink-3)' }}>
          {formatRelativeTime(entry.timestamp)}
        </span>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden"
          >
            <div
              className="flex gap-2 mt-2.5 pt-2.5"
              style={{ borderTop: '1.5px dashed var(--pp-ink-3)' }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleUseful();
                }}
                className="pp-btn"
                style={{
                  padding: '6px 10px',
                  fontSize: 11,
                  background: entry.useful ? 'var(--pp-sun)' : 'var(--pp-sun-sf)',
                  boxShadow: 'var(--pp-shadow-sm)',
                  minHeight: 0,
                }}
              >
                <StarIcon size={12} style={{ color: 'var(--pp-ink)' }} />
                {entry.useful ? 'Unmark useful' : 'Mark useful'}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className="pp-btn pp-btn-ghost"
                style={{ padding: '6px 10px', fontSize: 11, minHeight: 0 }}
              >
                <TrashIcon size={12} />
                Delete
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
