'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useUser, useClerk } from '@clerk/nextjs';
import {
  Crown,
  LayoutDashboard,
  Sparkles,
  Settings,
  LogOut,
  ChevronDown,
  Coins,
  Volume2
} from 'lucide-react';
import { useThemeStore } from '@/lib/themeStore';
import AudioSettings from '@/components/AudioSettings';

export default function UserProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();
  const { signOut } = useClerk();
  const { theme } = useThemeStore();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false);
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  if (!user) return null;

  const userTier = {
    name: 'Silver King',
    badge: '🥈',
    color: '#C0C0C0'
  };

  const menuItems = [
    { href: '/dashboard', label: 'View Dashboard', icon: LayoutDashboard },
    { href: '/pricing', label: 'Pricing & Tiers', icon: Sparkles },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div ref={dropdownRef} className="relative">
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 rounded-full transition-all duration-300 hover:scale-105"
        style={{
          boxShadow: isOpen ? `0 0 20px ${theme.glow}` : 'none',
        }}
      >
        <div
          className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-offset-2 ring-offset-black transition-all duration-300"
          style={{ ['--tw-ring-color' as string]: theme.primary } as React.CSSProperties}
        >
          {user.imageUrl ? (
            <Image
              src={user.imageUrl}
              alt={user.fullName || 'User'}
              fill
              className="object-cover"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-white font-bold"
              style={{ background: theme.primary }}
            >
              {user.firstName?.charAt(0) || 'K'}
            </div>
          )}
        </div>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 top-full mt-2 w-72 transition-all duration-300 origin-top-right ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        }`}
      >
        <div
          className="rounded-xl overflow-hidden backdrop-blur-xl border border-white/10"
          style={{
            background: 'rgba(15, 23, 42, 0.95)',
            boxShadow: `0 0 30px ${theme.glow}, 0 20px 40px rgba(0,0,0,0.5)`,
          }}
        >
          {/* User Info Section */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div
                className="relative w-12 h-12 rounded-full overflow-hidden ring-2"
                style={{ ['--tw-ring-color' as string]: theme.primary } as React.CSSProperties}
              >
                {user.imageUrl ? (
                  <Image
                    src={user.imageUrl}
                    alt={user.fullName || 'User'}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-white font-bold text-lg"
                    style={{ background: theme.primary }}
                  >
                    {user.firstName?.charAt(0) || 'K'}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white truncate">
                  {user.fullName || user.firstName || 'King'}
                </p>
                <p className="text-sm text-gray-400 truncate">
                  {user.primaryEmailAddress?.emailAddress}
                </p>
              </div>
            </div>

            {/* Tier Badge */}
            <div
              className="mt-3 flex items-center gap-2 px-3 py-1.5 rounded-lg w-fit"
              style={{ background: `${userTier.color}15`, border: `1px solid ${userTier.color}40` }}
            >
              <Crown size={14} style={{ color: userTier.color }} />
              <span className="text-xs font-medium" style={{ color: userTier.color }}>
                {userTier.badge} {userTier.name}
              </span>
            </div>
          </div>

          {/* Stats Section */}
          <div className="px-4 py-3 border-b border-white/10 grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <Coins size={16} className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-400">Tracking</p>
                <p className="text-sm font-semibold text-white">23 Coins</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles size={16} style={{ color: theme.accent }} />
              <div>
                <p className="text-xs text-gray-400">Portfolio</p>
                <p className="text-sm font-semibold" style={{ color: theme.accent }}>$128,430</p>
              </div>
            </div>
          </div>

          {/* Audio Settings */}
          <div className="border-b border-white/10">
            <div className="flex items-center gap-2 px-4 pt-3 pb-1">
              <Volume2 size={14} style={{ color: theme.accent }} />
              <span className="text-xs font-medium text-gray-400">Voice Settings</span>
            </div>
            <AudioSettings compact />
          </div>

          {/* Menu Items */}
          <div className="p-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200 group"
                >
                  <Icon
                    size={18}
                    className="text-gray-400 group-hover:text-white transition-colors"
                    style={{ color: undefined }}
                  />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}

            {/* Divider */}
            <div className="my-2 border-t border-white/10" />

            {/* Sign Out */}
            <button
              onClick={() => signOut()}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 group"
            >
              <LogOut size={18} />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
