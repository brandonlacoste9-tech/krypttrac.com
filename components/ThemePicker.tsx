'use client';

import { useThemeStore, themes, canAccessTheme, getTierDisplayName, UserTier, Theme } from '@/lib/themeStore';
import { useEffect, useState } from 'react';
import { Palette, Lock, Crown, Sparkles } from 'lucide-react';
import { speak } from '@/lib/audio/audioManager';
import { useUserTier } from '@/lib/hooks/useUserTier';
import Link from 'next/link';

export default function ThemePicker() {
  const userTier = useUserTier();
  const { currentTheme, setTheme } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [lockedTheme, setLockedTheme] = useState<{ key: string; theme: Theme } | null>(null);

  useEffect(() => {
    setMounted(true);
    // Apply theme on mount
    const storedTheme = localStorage.getItem('krypto-kings-theme');
    if (storedTheme) {
      try {
        const parsed = JSON.parse(storedTheme);
        if (parsed.state?.currentTheme) {
          // Only apply if user has access
          const theme = themes[parsed.state.currentTheme];
          if (theme && canAccessTheme(theme, userTier)) {
            setTheme(parsed.state.currentTheme);
          }
        }
      } catch (e) {
        console.error('Failed to parse theme', e);
      }
    }
  }, [setTheme, userTier]);

  if (!mounted) return null;

  const themeEntries = Object.entries(themes);
  const freeThemes = themeEntries.filter(([, t]) => !t.tierRequired);
  const exclusiveThemes = themeEntries.filter(([, t]) => t.tierRequired);

  const handleThemeClick = (key: string, theme: Theme) => {
    if (!canAccessTheme(theme, userTier)) {
      // Show upgrade modal
      setLockedTheme({ key, theme });
      return;
    }

    setTheme(key);
    setIsOpen(false);

    // Voice announcement for exclusive themes
    if (theme.isExclusive) {
      if (theme.tierRequired === 'gold') {
        speak("Golden Child activated! Now you're shinin', King!");
      } else if (theme.tierRequired === 'platinum') {
        speak("Platinum Suite unlocked! Chrome everything, baby!");
      }
    }
  };

  return (
    <>
      <div className="fixed top-20 right-4 z-50">
        {/* Toggle button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="glass-strong p-3 rounded-full hover:scale-110 transition-all duration-300 group"
          style={{
            boxShadow: `0 0 20px ${themes[currentTheme].glow}`,
          }}
        >
          <Palette
            size={20}
            className="transition-colors duration-300"
            style={{ color: themes[currentTheme].primary }}
          />
        </button>

        {/* Theme panel */}
        {isOpen && (
          <div className="absolute top-14 right-0 glass-strong p-4 rounded-2xl min-w-[280px] animate-fadeIn">
            {/* Free Themes */}
            <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider">
              Themes
            </p>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {freeThemes.map(([key, theme]) => (
                <button
                  key={key}
                  onClick={() => handleThemeClick(key, theme)}
                  className={`relative w-12 h-12 rounded-full transition-all duration-300 hover:scale-110 ${
                    currentTheme === key ? 'ring-2 ring-white ring-offset-2 ring-offset-black' : ''
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
                    boxShadow: `0 0 10px ${theme.glow}`,
                  }}
                  title={theme.name}
                />
              ))}
            </div>

            {/* Exclusive Themes Section */}
            {exclusiveThemes.length > 0 && (
              <>
                <div className="flex items-center gap-2 mb-3 pt-3 border-t border-white/10">
                  <Crown size={14} className="text-yellow-500" />
                  <p className="text-xs text-yellow-500 uppercase tracking-wider">
                    Exclusive
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {exclusiveThemes.map(([key, theme]) => {
                    const isLocked = !canAccessTheme(theme, userTier);
                    const isActive = currentTheme === key;

                    return (
                      <button
                        key={key}
                        onClick={() => handleThemeClick(key, theme)}
                        className={`relative flex flex-col items-center p-3 rounded-xl transition-all duration-300 ${
                          isActive
                            ? 'ring-2 ring-white ring-offset-2 ring-offset-black'
                            : isLocked
                              ? 'opacity-60 hover:opacity-80'
                              : 'hover:scale-105'
                        }`}
                        style={{
                          background: `linear-gradient(135deg, ${theme.bgStart}, ${theme.bgEnd})`,
                          boxShadow: isLocked ? 'none' : `0 0 15px ${theme.glow}`,
                        }}
                      >
                        {/* Theme preview circle */}
                        <div
                          className="w-10 h-10 rounded-full mb-2"
                          style={{
                            background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
                            boxShadow: `0 0 10px ${theme.glow}`,
                          }}
                        />

                        {/* Lock overlay */}
                        {isLocked && (
                          <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/40 backdrop-blur-sm">
                            <div className="flex flex-col items-center">
                              <Lock size={18} className="text-white mb-1" />
                              <span className="text-[10px] text-gray-300 uppercase">
                                {getTierDisplayName(theme.tierRequired!)}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Theme name */}
                        <span
                          className="text-xs font-medium truncate w-full text-center"
                          style={{ color: theme.primary }}
                        >
                          {theme.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {/* Current theme */}
            <div className="mt-3 pt-3 border-t border-white/10">
              <p className="text-center text-sm font-medium" style={{ color: themes[currentTheme].primary }}>
                {themes[currentTheme].name}
                {themes[currentTheme].isExclusive && (
                  <Sparkles size={12} className="inline ml-1" />
                )}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Upgrade Modal */}
      {lockedTheme && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeIn"
          onClick={() => setLockedTheme(null)}
        >
          <div
            className="glass-strong p-6 rounded-2xl max-w-sm mx-4 text-center"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: `0 0 40px ${lockedTheme.theme.glow}`,
            }}
          >
            {/* Theme preview */}
            <div
              className="w-20 h-20 rounded-full mx-auto mb-4"
              style={{
                background: `linear-gradient(135deg, ${lockedTheme.theme.primary}, ${lockedTheme.theme.accent})`,
                boxShadow: `0 0 30px ${lockedTheme.theme.glow}`,
              }}
            />

            {/* Lock icon */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <Lock size={18} className="text-yellow-500" />
              <span className="text-yellow-500 font-semibold uppercase text-sm">
                {getTierDisplayName(lockedTheme.theme.tierRequired!)} Only
              </span>
            </div>

            {/* Theme name */}
            <h3
              className="text-2xl font-bold mb-2"
              style={{ color: lockedTheme.theme.primary }}
            >
              {lockedTheme.theme.name}
            </h3>

            {/* Description */}
            <p className="text-gray-400 mb-6">
              {lockedTheme.theme.description}
            </p>

            {/* CTA */}
            <Link href="/pricing">
              <button
                className="w-full py-3 px-6 rounded-xl font-semibold text-black transition-all duration-300 hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${lockedTheme.theme.primary}, ${lockedTheme.theme.accent})`,
                  boxShadow: `0 0 20px ${lockedTheme.theme.glow}`,
                }}
                onClick={() => setLockedTheme(null)}
              >
                Upgrade to {getTierDisplayName(lockedTheme.theme.tierRequired!)}
              </button>
            </Link>

            {/* Close */}
            <button
              className="mt-3 text-gray-500 hover:text-white text-sm transition-colors"
              onClick={() => setLockedTheme(null)}
            >
              Maybe Later
            </button>
          </div>
        </div>
      )}
    </>
  );
}
