'use client';

import React, { memo } from 'react';
import { TrendingUp, Zap, Shield } from 'lucide-react';
import GlassCard from './GlassCard';
import { useThemeStore } from '@/lib/themeStore';

interface StatCardsProps {
  portfolioValue?: string;
  realTimeCoins?: number;
  premiumFeature?: string;
}

const StatCards = memo(function StatCards({ 
  portfolioValue = '$128,430',
  realTimeCoins = 23,
  premiumFeature = 'Active'
}: StatCardsProps) {
  const { theme } = useThemeStore();

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {/* Portfolio Card */}
      <GlassCard className="text-center group hover:scale-[1.02] transition-all duration-300">
        <div className="mb-4 flex justify-center">
          <div 
            className="p-4 rounded-full glass transition-all duration-300"
            style={{ boxShadow: `0 0 0 rgba(34,197,94,0)` }}
          >
            <TrendingUp className="text-green-400" size={32} />
          </div>
        </div>
        <h3 className="text-3xl font-bold text-white mb-2">
          {portfolioValue}
        </h3>
        <p className="text-gray-400 font-medium">Your Empire</p>
        <div className="mt-3 pt-3 border-t border-white/10">
          <span className="text-green-400 text-sm font-semibold">+12.4% Today (W)</span>
        </div>
      </GlassCard>

      {/* Real-Time Card */}
      <GlassCard className="text-center group hover:scale-[1.02] transition-all duration-300">
        <div className="mb-4 flex justify-center">
          <div 
            className="p-4 rounded-full glass transition-all duration-300"
            style={{ boxShadow: `0 0 0 ${theme.glow}` }}
          >
            <Zap size={32} style={{ color: theme.accent }} />
          </div>
        </div>
        <h3 className="text-3xl font-bold text-white mb-2">
          {realTimeCoins}
        </h3>
        <p className="text-gray-400 font-medium">Live Juice</p>
        <div className="mt-3 pt-3 border-t border-white/10">
          <span
            className="text-sm font-semibold inline-flex items-center gap-1"
            style={{ color: theme.accent }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: theme.accent }}
            />
            Juiced Up
          </span>
        </div>
      </GlassCard>

      {/* Premium Card */}
      <GlassCard className="text-center group hover:scale-[1.02] transition-all duration-300">
        <div className="mb-4 flex justify-center">
          <div 
            className="p-4 rounded-full glass transition-all duration-300"
            style={{ boxShadow: `0 0 25px ${theme.glow}` }}
          >
            <Shield size={32} style={{ color: theme.primary }} />
          </div>
        </div>
        <h3 className="text-3xl font-bold text-white mb-2">
          {premiumFeature}
        </h3>
        <p className="text-gray-400 font-medium">King Status</p>
        <div className="mt-3 pt-3 border-t border-white/10">
          <span style={{ color: theme.primary }} className="text-sm font-semibold">Locked In 👑</span>
        </div>
      </GlassCard>
    </section>
  );
});

export default StatCards;
