'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Star, Bell, TrendingUp, Menu } from 'lucide-react';
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { useThemeStore } from '@/lib/themeStore';
import { useUserTier } from '@/lib/hooks/useUserTier';
import UserProfileDropdown from '@/components/UserProfileDropdown';
import MobileMenu from '@/components/MobileMenu';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme } = useThemeStore();
  const userTier = useUserTier();

  const navItems = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/watchlist', label: 'Watchlist', icon: Star },
    { href: '/alerts', label: 'Alerts', icon: Bell },
    { href: '/portfolio', label: 'Portfolio', icon: TrendingUp },
  ];

  const getLinkClass = (isActive: boolean) => {
    const base = 'relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 group';
    if (isActive) {
      return `${base} glass-strong text-white`;
    }
    return `${base} text-gray-400 hover:text-white hover:glass`;
  };

  const getIconClass = (isActive: boolean) => {
    const base = 'transition-all duration-300';
    if (isActive) {
      return `${base} drop-shadow-lg`;
    }
    return base;
  };

  return (
    <header className="glass-strong sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className="group-hover:scale-110 transition-all duration-300"
              style={{ filter: `drop-shadow(0 0 8px ${theme.glow})` }}
            >
              <Image
                src="/logo-192.png"
                alt="ꓘK"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <span className="text-2xl font-bold text-gradient bg-animate">ꓘrypto Kings</span>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={getLinkClass(isActive)}
                  style={isActive ? { boxShadow: `0 0 20px ${theme.glow}` } : {}}
                >
                  <Icon size={18} className={getIconClass(isActive)} />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <div 
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 animate-pulse-slow"
                      style={{ background: `linear-gradient(90deg, transparent, ${theme.primary}, transparent)` }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button 
                  className="glass px-4 py-2 rounded-lg font-medium text-white hover:glass-strong transition-all duration-300"
                  style={{ boxShadow: `0 0 15px ${theme.glow}` }}
                >
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserProfileDropdown />
            </SignedIn>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex md:hidden p-2 rounded-lg glass hover:glass-strong transition-all"
            >
              <Menu size={24} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        userTier={userTier}
      />
    </header>
  );
}
