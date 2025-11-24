'use client';

import { useThemeStore } from '@/lib/themeStore';
import { useEffect, useState } from 'react';

export default function LuxuryBackground() {
  const { theme, currentTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getHueRotation = () => {
    const hueMap: Record<string, number> = {
      royalPurple: 0,
      diamond: 180,
      goldRush: 45,
      emerald: 120,
      ruby: -60,
      sapphire: 220,
    };
    return hueMap[currentTheme] || 0;
  };

  if (!mounted) return null;

  return (
    <>
      {/* LV Pattern Background */}
      <div 
        className="lv-pattern themed"
        style={{
          '--hue-rotate': `${getHueRotation()}deg`,
          opacity: 0.05,
        } as React.CSSProperties}
      />
      
      {/* Gradient overlay for depth */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(ellipse at top, transparent 0%, ${theme.bgStart}99 70%, ${theme.bgEnd} 100%)`,
        }}
      />
      
      {/* Floating orbs for atmosphere */}
      <div 
        className="fixed top-20 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse-slow pointer-events-none z-0"
        style={{
          background: `${theme.primary}15`,
        }}
      />
      <div 
        className="fixed bottom-20 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse-slow pointer-events-none z-0"
        style={{
          background: `${theme.accent}10`,
          animationDelay: '1.5s',
        }}
      />
    </>
  );
}
