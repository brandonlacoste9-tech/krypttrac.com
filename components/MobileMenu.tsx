'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useClerk, useUser, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import {
  X,
  Crown,
  LayoutDashboard,
  Star,
  Bell,
  TrendingUp,
  Sparkles,
  Settings,
  LogOut,
  Zap,
  Lock,
} from 'lucide-react';
import { useThemeStore, themes, canAccessTheme, getTierDisplayName, UserTier, Theme } from '@/lib/themeStore';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  userTier?: UserTier;
}

export default function MobileMenu({ isOpen, onClose, userTier = 'free' }: MobileMenuProps) {
  const pathname = usePathname();
  const { signOut } = useClerk();
  const { user } = useUser();
  const { theme, setTheme } = useThemeStore();

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const navItems = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/watchlist', label: 'Watchlist', icon: Star },
    { href: '/alerts', label: 'Alerts', icon: Bell },
    { href: '/portfolio', label: 'Portfolio', icon: TrendingUp },
    { href: '/pricing', label: 'Pricing', icon: Sparkles },
  ];

  const handleNavClick = () => {
    onClose();
  };

  const handleSignOut = () => {
    signOut();
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 z-[101] h-full w-[280px] transition-transform duration-300 ease-out md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          background: 'rgba(15, 23, 42, 0.98)',
          backdropFilter: 'blur(20px)',
          boxShadow: isOpen ? `4px 0 30px ${theme.glow}` : 'none',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div style={{ filter: `drop-shadow(0 0 8px ${theme.glow})` }}>
              <Image
                src="/logo-192.png"
                alt="ꓘK"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold text-gradient">ꓘrypto Kings</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                style={isActive ? { boxShadow: `0 0 15px ${theme.glow}` } : {}}
              >
                <Icon
                  size={20}
                  style={isActive ? { color: theme.accent } : {}}
                />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="mx-4 border-t border-white/10" />

        {/* Theme Picker */}
        <div className="p-4">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Theme</p>
          {/* Free Themes */}
          <div className="flex flex-wrap gap-2 mb-3">
            {Object.entries(themes)
              .filter(([, t]) => !t.tierRequired)
              .map(([key, t]) => (
                <button
                  key={key}
                  onClick={() => setTheme(key as keyof typeof themes)}
                  className={`w-10 h-10 rounded-full transition-all duration-200 ${
                    theme.name === t.name
                      ? 'ring-2 ring-offset-2 ring-offset-black scale-110'
                      : 'hover:scale-105'
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`,
                    ringColor: t.primary,
                  }}
                  title={t.name}
                />
              ))}
          </div>
          {/* Exclusive Themes */}
          <div className="flex items-center gap-2 mb-2 pt-2 border-t border-white/10">
            <Crown size={12} className="text-yellow-500" />
            <span className="text-[10px] text-yellow-500 uppercase tracking-wider">Exclusive</span>
          </div>
          <div className="flex gap-2">
            {Object.entries(themes)
              .filter(([, t]) => t.tierRequired)
              .map(([key, t]) => {
                const isLocked = !canAccessTheme(t, userTier);
                return (
                  <button
                    key={key}
                    onClick={() => {
                      if (!isLocked) {
                        setTheme(key as keyof typeof themes);
                      }
                    }}
                    className={`relative w-10 h-10 rounded-full transition-all duration-200 ${
                      theme.name === t.name
                        ? 'ring-2 ring-offset-2 ring-offset-black scale-110'
                        : isLocked
                          ? 'opacity-50'
                          : 'hover:scale-105'
                    }`}
                    style={{
                      background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`,
                      ringColor: t.primary,
                    }}
                    title={isLocked ? `${t.name} (${getTierDisplayName(t.tierRequired!)} Only)` : t.name}
                  >
                    {isLocked && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                        <Lock size={14} className="text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {theme.name}
            {theme.isExclusive && <Sparkles size={10} className="inline ml-1 text-yellow-500" />}
          </p>
        </div>

        {/* Divider */}
        <div className="mx-4 border-t border-white/10" />

        {/* Settings & Auth */}
        <div className="p-4 space-y-1">
          <Link
            href="/settings"
            onClick={handleNavClick}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
          >
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </Link>

          <SignedIn>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
            >
              <LogOut size={20} />
              <span className="font-medium">Sign Out</span>
            </button>
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200">
                <Zap size={20} style={{ color: theme.accent }} />
                <span className="font-medium">Sign In</span>
              </button>
            </SignInButton>
          </SignedOut>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          {/* Mini Opus Badge */}
          <a
            href="https://colonyos.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors mb-3"
          >
            <Zap size={14} style={{ color: theme.accent }} />
            <span className="text-xs text-gray-400">
              Powered by <span className="text-white font-medium">Opus Magnum</span>
            </span>
          </a>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>v1.0.0</span>
            <span>For the Street Kings 👑</span>
          </div>
        </div>
      </div>
    </>
  );
}
