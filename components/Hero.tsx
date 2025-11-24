'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TrendingUp, Zap, LayoutDashboard } from 'lucide-react';
import { SignUpButton, SignedIn } from '@clerk/nextjs';
import { useThemeStore } from '@/lib/themeStore';

export default function Hero() {
  const { theme } = useThemeStore();

  const scrollToDemo = () => {
    document.getElementById('demo-portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="text-center mb-16 relative">
      <div className="relative z-10">
        {/* Logo & Brand */}
        <div className="flex flex-col items-center justify-center gap-4 mb-6">
          <div
            className="relative animate-pulse-slow"
            style={{
              filter: `drop-shadow(0 0 20px ${theme.accent}) drop-shadow(0 0 40px ${theme.primary})`
            }}
          >
            <Image
              src="/logo-512.png"
              alt="ꓘK"
              width={120}
              height={120}
              priority
              className="object-contain"
            />
          </div>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold">
            <span className="text-gradient bg-animate">ꓘrypto Kings</span>
          </h1>
        </div>

        {/* Tagline */}
        <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-4 font-light tracking-wide">
          Built <span className="font-semibold" style={{ color: theme.accent }}>for Kings</span>
        </p>
        
        <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
          Track your bag like a king. Real-time data, luxury themes, and that royal energy. 👑
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Try Demo - Scrolls to portfolio */}
          <button
            onClick={scrollToDemo}
            className="glass-strong px-8 py-4 rounded-xl font-semibold text-white hover:scale-105 transition-all duration-300 flex items-center gap-2 cursor-pointer"
            style={{ boxShadow: `0 0 30px ${theme.glow}, 0 0 60px ${theme.glow}` }}
          >
            <TrendingUp size={20} />
            Try Demo
          </button>

          {/* Sign Up Free - Opens Clerk modal */}
          <SignUpButton mode="modal">
            <button className="glass px-8 py-4 rounded-xl font-semibold text-white hover:glass-strong hover:scale-105 transition-all duration-300 flex items-center gap-2 cursor-pointer">
              <Zap size={20} />
              Join the Kingdom
            </button>
          </SignUpButton>

          {/* View Dashboard - Only when signed in */}
          <SignedIn>
            <Link href="/dashboard">
              <button className="glass px-8 py-4 rounded-xl font-semibold text-white hover:glass-strong hover:scale-105 transition-all duration-300 flex items-center gap-2 cursor-pointer">
                <LayoutDashboard size={20} />
                Check Your Bag
              </button>
            </Link>
          </SignedIn>
        </div>

        {/* Decorative line */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <div 
            className="h-px w-20"
            style={{ background: `linear-gradient(90deg, transparent, ${theme.primary}, transparent)` }}
          />
          <div 
            className="w-3 h-3 rounded-full animate-pulse-slow"
            style={{ 
              background: theme.accent,
              boxShadow: `0 0 15px ${theme.accent}` 
            }}
          />
          <div 
            className="h-px w-20"
            style={{ background: `linear-gradient(90deg, transparent, ${theme.primary}, transparent)` }}
          />
        </div>
      </div>
    </section>
  );
}
