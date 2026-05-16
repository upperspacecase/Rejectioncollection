'use client';

import { motion } from 'framer-motion';
import { HomeIcon, ListIcon, BoardIcon, MeIcon, PlusIcon } from './Icons';

export type Tab = 'home' | 'feed' | 'board' | 'me';

interface BottomNavProps {
  active: Tab;
  onTab: (t: Tab) => void;
  onLog: () => void;
}

export default function BottomNav({ active, onTab, onLog }: BottomNavProps) {
  return (
    <div className="flex-shrink-0 safe-bottom pb-2 px-3.5 pt-2">
      <div
        className="flex items-center justify-between gap-1 px-2.5 py-2"
        style={{
          background: 'var(--pp-ink)',
          border: '2px solid var(--pp-ink)',
          borderRadius: 999,
          boxShadow: 'var(--pp-shadow)',
        }}
      >
        <NavBtn label="Home" active={active === 'home'} onClick={() => onTab('home')}>
          <HomeIcon />
        </NavBtn>
        <NavBtn label="Log" active={active === 'feed'} onClick={() => onTab('feed')}>
          <ListIcon />
        </NavBtn>

        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={onLog}
          aria-label="Log a rejection"
          className="flex items-center justify-center cursor-pointer flex-shrink-0"
          style={{
            width: 56,
            height: 56,
            borderRadius: 999,
            background: 'var(--pp-coral)',
            color: '#fff',
            border: '2.5px solid var(--pp-bg)',
            boxShadow: '0 3px 0 rgba(0,0,0,0.4)',
          }}
        >
          <PlusIcon size={26} />
        </motion.button>

        <NavBtn label="Board" active={active === 'board'} onClick={() => onTab('board')}>
          <BoardIcon />
        </NavBtn>
        <NavBtn label="Me" active={active === 'me'} onClick={() => onTab('me')}>
          <MeIcon />
        </NavBtn>
      </div>
    </div>
  );
}

function NavBtn({
  label,
  active,
  onClick,
  children,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center cursor-pointer flex-1"
      style={{
        background: 'transparent',
        border: 0,
        padding: '6px 0',
        gap: 2,
        color: active ? 'var(--pp-sun)' : 'rgba(255,255,255,0.65)',
      }}
    >
      {children}
      <span className="text-[10px] font-bold">{label}</span>
    </button>
  );
}
