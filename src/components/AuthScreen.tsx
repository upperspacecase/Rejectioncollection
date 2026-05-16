'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/auth';
import { LogoMark, GoogleIcon, ArrowRightIcon } from './Icons';

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
    } catch (err) {
      const code = (err as { code?: string })?.code || '';
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

  async function handleGoogle() {
    setError('');
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      const code = (err as { code?: string })?.code || '';
      if (code !== 'auth/popup-closed-by-user') {
        setError('Google sign-in failed. Try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="pp-dots fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: 'var(--pp-bg)', backgroundSize: '18px 18px' }}
    >
      <div className="w-full max-w-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <div className="text-center mb-7">
              <div className="inline-block mb-4">
                <LogoMark size={44} />
              </div>
              <h1 className="font-display text-3xl mb-2" style={{ color: 'var(--pp-ink)' }}>
                {mode === 'signup' ? "Hey! Let's get you set up." : 'Welcome back, collector.'}
              </h1>
              <p className="text-sm" style={{ color: 'var(--pp-ink-2)' }}>
                {mode === 'signup'
                  ? 'Takes 30 seconds. Then you can go get rejected.'
                  : 'Your streak missed you.'}
              </p>
            </div>

            <button
              type="button"
              onClick={handleGoogle}
              disabled={loading}
              className="pp-btn w-full mb-3"
              style={{ background: 'var(--pp-card)' }}
            >
              <GoogleIcon />
              Continue with Google
            </button>

            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px" style={{ background: 'var(--pp-ink-3)', opacity: 0.3 }} />
              <span className="text-xs font-semibold" style={{ color: 'var(--pp-ink-3)' }}>or with email</span>
              <div className="flex-1 h-px" style={{ background: 'var(--pp-ink-3)', opacity: 0.3 }} />
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <PPField
                label="Email"
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={setEmail}
                autoFocus
              />
              <PPField
                label="Password"
                id="password"
                type="password"
                placeholder="At least 6 characters"
                value={password}
                onChange={setPassword}
              />

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-center font-semibold"
                  style={{ color: 'var(--pp-coral-dk)' }}
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={loading || !email.trim() || !password.trim()}
                className="pp-btn pp-btn-primary w-full mt-1"
              >
                {loading ? (
                  <span className="pp-spinner" style={{ borderColor: '#fff', borderTopColor: 'transparent' }} />
                ) : (
                  <>
                    {mode === 'signup' ? "Let's go" : 'Sign in'}
                    <ArrowRightIcon size={16} />
                  </>
                )}
              </button>
            </form>

            <p className="text-center mt-5 text-sm" style={{ color: 'var(--pp-ink-3)' }}>
              {mode === 'signup' ? 'Already a collector?' : 'New here?'}{' '}
              <button
                type="button"
                onClick={() => {
                  setMode(mode === 'signup' ? 'signin' : 'signup');
                  setError('');
                }}
                className="font-bold cursor-pointer"
                style={{ color: 'var(--pp-coral)', textDecoration: 'none' }}
              >
                {mode === 'signup' ? 'Sign in' : 'Make an account'}
              </button>
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function PPField({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  autoFocus,
}: {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  autoFocus?: boolean;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="block text-xs font-bold mb-1.5" style={{ color: 'var(--pp-ink-2)' }}>
        {label}
      </span>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus={autoFocus}
        className="w-full px-4 py-3 text-sm font-medium outline-none transition-shadow"
        style={{
          border: '2px solid var(--pp-ink)',
          borderRadius: 12,
          background: 'var(--pp-card)',
          color: 'var(--pp-ink)',
          boxShadow: 'var(--pp-shadow-sm)',
        }}
      />
    </label>
  );
}
