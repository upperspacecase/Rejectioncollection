'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/auth';

export default function AuthScreen() {
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    setError('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
    } catch (err: any) {
      const code = err?.code || '';
      if (code === 'auth/email-already-in-use') {
        setError('Email already in use. Try signing in.');
      } else if (code === 'auth/invalid-credential' || code === 'auth/wrong-password') {
        setError('Invalid email or password.');
      } else if (code === 'auth/weak-password') {
        setError('Password must be at least 6 characters.');
      } else if (code === 'auth/invalid-email') {
        setError('Invalid email address.');
      } else {
        setError('Something went wrong. Try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-8">
              <h1
                className="font-serif font-light text-foreground leading-none mb-3 lowercase"
                style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)' }}
              >
                rejection collection
              </h1>
              <p className="text-secondary text-[10px] font-mono uppercase tracking-[0.2em]">
                {mode === 'signup' ? 'Create your account' : 'Welcome back'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-secondary text-[10px] font-mono uppercase tracking-widest mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface-elevated border border-border-light rounded-lg px-4 py-3 text-foreground text-sm font-mono placeholder:text-muted
                    focus:outline-none focus:border-border-active transition-colors"
                  placeholder="you@example.com"
                  autoFocus
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-secondary text-[10px] font-mono uppercase tracking-widest mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-surface-elevated border border-border-light rounded-lg px-4 py-3 text-foreground text-sm font-mono placeholder:text-muted
                    focus:outline-none focus:border-border-active transition-colors"
                  placeholder="At least 6 characters"
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-[11px] font-mono text-center"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={loading || !email.trim() || !password.trim()}
                className="w-full py-3.5 rounded-lg border border-border-light text-foreground font-mono text-[11px] uppercase tracking-[0.15em]
                  hover:border-border-active active:scale-[0.98] transition-all duration-200 cursor-pointer
                  disabled:opacity-30 disabled:cursor-not-allowed mt-2"
              >
                {loading ? '...' : mode === 'signup' ? 'Create account' : 'Sign in'}
              </button>
            </form>

            <div className="mt-6 flex flex-col items-center gap-4">
              <div className="flex items-center gap-3 w-full">
                <div className="flex-1 h-px bg-border-light" />
                <span className="text-muted text-[9px] font-mono uppercase tracking-widest">or</span>
                <div className="flex-1 h-px bg-border-light" />
              </div>

              <button
                onClick={async () => {
                  setError('');
                  setLoading(true);
                  try {
                    await signInWithGoogle();
                  } catch (err: any) {
                    if (err?.code !== 'auth/popup-closed-by-user') {
                      setError('Google sign-in failed. Try again.');
                    }
                  } finally {
                    setLoading(false);
                  }
                }}
                disabled={loading}
                className="w-full py-3.5 rounded-lg border border-border-light text-foreground font-mono text-[11px] uppercase tracking-[0.15em]
                  hover:border-border-active active:scale-[0.98] transition-all duration-200 cursor-pointer
                  disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>

              <button
                onClick={() => {
                  setMode(mode === 'signup' ? 'signin' : 'signup');
                  setError('');
                }}
                className="text-secondary text-[10px] font-mono uppercase tracking-wider hover:text-foreground transition-colors cursor-pointer"
              >
                {mode === 'signup' ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
