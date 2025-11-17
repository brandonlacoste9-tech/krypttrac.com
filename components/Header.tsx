'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Crown, LayoutDashboard, Star, Bell, TrendingUp } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/watchlist', label: 'Watchlist', icon: Star },
    { href: '/alerts', label: 'Alerts', icon: Bell },
    { href: '/portfolio', label: 'Portfolio', icon: TrendingUp },
  ];

  return (
    <header className="glass-strong sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <Crown className="text-purple-400 group-hover:text-purple-300 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" size={32} />
            <span className="text-2xl font-bold text-gradient bg-animate">Krypttrac</span>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 group ${
                    isActive
                      ? 'glass-strong text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                      : 'text-gray-400 hover:text-white hover:glass hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                  }`}
                >
                  <Icon size={18} className={`transition-all duration-300 ${isActive ? 'drop-shadow-[0_0_4px_rgba(168,85,247,0.8)]' : 'group-hover:drop-shadow-[0_0_4px_rgba(168,85,247,0.6)]'}`} />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse-slow" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex md:hidden">
            <button className="p-2 rounded-lg glass hover:glass-strong transition-all hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
