'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { StoreProvider, useStore } from '@/lib/store';
import { getRejections } from '@/lib/utils';
import { getNewMilestone } from '@/lib/milestones';
import { MilestoneDef } from '@/lib/types';
import { AuthProvider, useAuth } from '@/lib/auth';
import AuthScreen from '@/components/AuthScreen';
import Onboarding from '@/components/Onboarding';
import HomeTab from '@/components/HomeTab';
import RejectionFeed from '@/components/RejectionFeed';
import ChallengeView from '@/components/ChallengeView';
import Leaderboard from '@/components/Leaderboard';
import MeTab from '@/components/MeTab';
import BottomNav, { type Tab } from '@/components/BottomNav';
import QuickLog from '@/components/QuickLog';
import LogConfirmation from '@/components/LogConfirmation';
import MilestoneModal from '@/components/MilestoneModal';

function AppContent() {
  const { state, isLoaded } = useStore();
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [showLog, setShowLog] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationIsRejection, setConfirmationIsRejection] = useState(true);
  const [pendingMilestone, setPendingMilestone] = useState<MilestoneDef | null>(null);
  const prevCountRef = useRef<number>(0);

  const rejectionCount = getRejections(state.entries).length;

  useEffect(() => {
    if (isLoaded) {
      prevCountRef.current = rejectionCount;
    }
  }, [isLoaded, rejectionCount]);

  const handleLogged = useCallback((wasRejection: boolean) => {
    setConfirmationIsRejection(wasRejection);
    setShowConfirmation(true);

    if (wasRejection) {
      const newCount = prevCountRef.current + 1;
      const milestone = getNewMilestone(prevCountRef.current, newCount);
      if (milestone) {
        setTimeout(() => setPendingMilestone(milestone), 1800);
      }
      prevCountRef.current = newCount;
    }
  }, []);

  if (!isLoaded) {
    return (
      <div className="h-dvh flex items-center justify-center">
        <div className="pp-spinner" />
      </div>
    );
  }

  if (!state.profile.onboardingComplete) {
    return <Onboarding />;
  }

  return (
    <div
      className="h-dvh flex flex-col overflow-hidden"
      style={{ background: 'var(--pp-bg)' }}
    >
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="h-full"
            >
              <HomeTab
                onSeeAll={() => setActiveTab('feed')}
                onOpenChallenge={() => setActiveTab('challenge')}
              />
            </motion.div>
          )}

          {activeTab === 'feed' && (
            <motion.div
              key="feed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="h-full"
            >
              <RejectionFeed />
            </motion.div>
          )}

          {activeTab === 'challenge' && (
            <motion.div
              key="challenge"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="h-full"
            >
              <ChallengeView />
            </motion.div>
          )}

          {activeTab === 'board' && (
            <motion.div
              key="board"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="h-full"
            >
              <Leaderboard />
            </motion.div>
          )}

          {activeTab === 'me' && (
            <motion.div
              key="me"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="h-full"
            >
              <MeTab />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <BottomNav active={activeTab} onTab={setActiveTab} onLog={() => setShowLog(true)} />

      <AnimatePresence>
        {showLog && (
          <QuickLog onClose={() => setShowLog(false)} onLogged={handleLogged} />
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

function AuthGate() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-dvh flex items-center justify-center">
        <div className="pp-spinner" />
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
