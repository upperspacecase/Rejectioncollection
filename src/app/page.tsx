'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { StoreProvider, useStore } from '@/lib/store';
import { getRejections } from '@/lib/utils';
import { getNewMilestone } from '@/lib/milestones';
import { MilestoneDef } from '@/lib/types';
import { AuthProvider, useAuth } from '@/lib/auth';
import AuthScreen from '@/components/AuthScreen';
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
        <div className="w-4 h-4 border border-accent border-t-transparent rounded-full animate-spin" />
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
              {/* Count */}
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
                  <h3 className="text-secondary text-[10px] font-mono uppercase tracking-[0.2em]">
                    Recent
                  </h3>
                  {state.entries.length > 3 && (
                    <button
                      onClick={() => setActiveTab('feed')}
                      className="text-accent text-[10px] font-mono uppercase tracking-wider hover:text-foreground transition-colors cursor-pointer"
                    >
                      See all
                    </button>
                  )}
                </div>
                <div className="space-y-1.5 pb-4">
                  {state.entries.length === 0 && (
                    <p className="text-muted font-serif font-light italic text-base text-center py-8">
                      Your first rejection is out there. Go find it.
                    </p>
                  )}
                  {state.entries.slice(0, 5).map((entry) => (
                    <div
                      key={entry.id}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${
                        entry.useful
                          ? 'border border-accent/20 bg-accent/5'
                          : 'border border-border-light'
                      }`}
                    >
                      <span className="text-[10px] font-mono uppercase tracking-wider text-secondary">
                        {entry.isYes ? 'YES' : 'NO'}
                      </span>
                      <span className="text-foreground font-serif font-light text-base truncate flex-1">
                        {entry.ask}
                      </span>
                      {entry.useful && (
                        <span className="text-accent text-[10px] font-mono uppercase tracking-wider">
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
              <h1 className="text-foreground font-serif font-light text-2xl mb-4 flex-shrink-0 lowercase">
                your log
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
      <div className="flex-shrink-0 border-t border-border-light safe-bottom">
        {/* Log button */}
        <div className="flex justify-center -mt-6 mb-2">
          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={() => setShowLog(true)}
            className="w-14 h-14 rounded-lg border border-border-active bg-background text-foreground font-mono text-xl
              flex items-center justify-center cursor-pointer
              hover:border-foreground/50 transition-colors"
            aria-label="Log a rejection"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
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
          />
          <TabButton
            label="Log"
            active={activeTab === 'feed'}
            onClick={() => setActiveTab('feed')}
          />
          <div className="w-14" /> {/* Spacer for center button */}
          <TabButton
            label="Board"
            active={activeTab === 'board'}
            onClick={() => setActiveTab('board')}
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
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-0.5 px-3 py-1 min-h-[44px] min-w-[44px] justify-center transition-colors duration-200 cursor-pointer ${
        active ? 'text-foreground' : 'text-muted hover:text-secondary'
      }`}
    >
      <span className="text-[10px] font-mono uppercase tracking-[0.15em]">{label}</span>
    </button>
  );
}

function AuthGate() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-4 h-4 border border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}

export default function Home() {
  return (
    <AuthProvider>
      <AuthGate />
    </AuthProvider>
  );
}
