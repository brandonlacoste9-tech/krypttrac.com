'use client';

import { useThemeStore } from '@/lib/themeStore';
import { useEffect, useState } from 'react';

export default function AnimatedBorder() {
  const { theme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div 
      className="rgb-border"
      style={{
        '--theme-primary': theme.primary,
        '--theme-accent': theme.accent,
      } as React.CSSProperties}
    />
  );
}
