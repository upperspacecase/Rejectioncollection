'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { StoreProvider, useStore } from '@/lib/store';
import { getRejections } from '@/lib/utils';
import { getNewMilestone } from '@/lib/milestones';
import { MilestoneDef } from '@/lib/types';
import CountDisplay from '@/components/CountDisplay';
import StatsBar from '@/components/StatsBar';
import QuickLog from '@/components/QuickLog';
import RejectionFeed from '@/components/RejectionFeed';
import Leaderboard from '@/components/Leaderboard';
import MilestoneModal from '@/components/MilestoneModal';
import LogConfirmation from '@/components/LogConfirmation';
import Onboarding from '@/components/Onboarding';

type Tab = 'home' | 'feed' | 'board';

function AppContent() {
  const { state, isLoaded } = useStore();
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [showLog, setShowLog] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationIsRejection, setConfirmationIsRejection] = useState(true);
  const [pendingMilestone, setPendingMilestone] = useState<MilestoneDef | null>(null);
  const prevCountRef = useRef<number>(0);

  const rejectionCount = getRejections(state.entries).length;

  // Track previous count for milestone detection
  useEffect(() => {
    if (isLoaded) {
      prevCountRef.current = rejectionCount;
    }
  }, [isLoaded, rejectionCount]);

  const handleLogged = useCallback(
    (wasRejection: boolean) => {
      setConfirmationIsRejection(wasRejection);
      setShowConfirmation(true);

      if (wasRejection) {
        const newCount = prevCountRef.current + 1;
        const milestone = getNewMilestone(prevCountRef.current, newCount);
        if (milestone) {
          // Show milestone after confirmation dismisses
          setTimeout(() => {
            setPendingMilestone(milestone);
          }, 1600);
        }
        prevCountRef.current = newCount;
      }
    },
    []
  );

  if (!isLoaded) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!state.profile.onboardingComplete) {
    return <Onboarding />;
  }

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Main content area */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="h-full flex flex-col px-5 pt-12 pb-4 overflow-y-auto"
            >
              {/* Count — the hook */}
              <div className="flex-shrink-0 mb-8">
                <CountDisplay count={rejectionCount} />
              </div>

              {/* Stats */}
              <div className="flex-shrink-0 mb-6">
                <StatsBar />
              </div>

              {/* Recent rejections preview */}
              <div className="flex-1 min-h-0">
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="text-secondary text-xs font-bold uppercase tracking-wider">
                    Recent
                  </h3>
                  {state.entries.length > 3 && (
                    <button
                      onClick={() => setActiveTab('feed')}
                      className="text-accent text-xs font-medium hover:underline"
                    >
                      See all
                    </button>
                  )}
                </div>
                <div className="space-y-1.5 pb-4">
                  {state.entries.length === 0 && (
                    <p className="text-muted text-sm text-center py-8">
                      Your first rejection is out there. Go find it.
                    </p>
                  )}
                  {state.entries.slice(0, 5).map((entry) => (
                    <div
                      key={entry.id}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl ${
                        entry.useful
                          ? 'bg-accent/10 border border-accent/15'
                          : 'bg-surface-elevated'
                      }`}
                    >
                      <span className="text-base">
                        {entry.isYes ? '\u{1F44D}' : '\u{1F44E}'}
                      </span>
                      <span className="text-foreground text-sm font-medium truncate flex-1">
                        {entry.ask}
                      </span>
                      {entry.useful && (
                        <span className="text-accent text-[10px] font-bold uppercase">
                          Useful
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'feed' && (
            <motion.div
              key="feed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="h-full flex flex-col px-5 pt-12 pb-4"
            >
              <h1 className="text-foreground font-bold text-lg mb-4 flex-shrink-0">
                Your Log
              </h1>
              <div className="flex-1 min-h-0 overflow-hidden">
                <RejectionFeed />
              </div>
            </motion.div>
          )}

          {activeTab === 'board' && (
            <motion.div
              key="board"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="h-full flex flex-col px-5 pt-12 pb-4"
            >
              <Leaderboard />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom bar: Log button + nav */}
      <div className="flex-shrink-0 border-t border-surface-elevated safe-bottom">
        {/* Log button */}
        <div className="flex justify-center -mt-6 mb-2">
          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={() => setShowLog(true)}
            className="w-14 h-14 rounded-2xl bg-accent text-accent-text font-bold text-xl
              shadow-lg shadow-accent/30 flex items-center justify-center
              hover:bg-accent-hover transition-colors"
            aria-label="Log a rejection"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </motion.button>
        </div>

        {/* Tab bar */}
        <nav className="flex justify-around pb-2 px-4">
          <TabButton
            label="Home"
            active={activeTab === 'home'}
            onClick={() => setActiveTab('home')}
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            }
          />
          <TabButton
            label="Log"
            active={activeTab === 'feed'}
            onClick={() => setActiveTab('feed')}
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            }
          />
          <div className="w-14" /> {/* Spacer for center button */}
          <TabButton
            label="Board"
            active={activeTab === 'board'}
            onClick={() => setActiveTab('board')}
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20V10" />
                <path d="M18 20V4" />
                <path d="M6 20v-4" />
              </svg>
            }
          />
          <TabButton
            label="More"
            active={false}
            onClick={() => {}}
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            }
          />
        </nav>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showLog && (
          <QuickLog
            onClose={() => setShowLog(false)}
            onLogged={handleLogged}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showConfirmation && (
          <LogConfirmation
            isRejection={confirmationIsRejection}
            onDone={() => setShowConfirmation(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {pendingMilestone && (
          <MilestoneModal
            milestone={pendingMilestone}
            onClose={() => setPendingMilestone(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function TabButton({
  label,
  active,
  onClick,
  icon,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-0.5 px-3 py-1 transition-colors duration-150 ${
        active ? 'text-accent' : 'text-muted hover:text-secondary'
      }`}
    >
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}

export default function Home() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
