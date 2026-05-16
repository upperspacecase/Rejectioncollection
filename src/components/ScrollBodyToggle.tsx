'use client';

import { useEffect } from 'react';

export default function ScrollPageBodyToggle() {
  useEffect(() => {
    document.body.classList.add('scroll-page');
    return () => document.body.classList.remove('scroll-page');
  }, []);
  return null;
}
