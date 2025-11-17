'use client';

import React from 'react';
import { TrendingUp, Zap, Shield } from 'lucide-react';
import GlassCard from './GlassCard';

interface StatCardsProps {
  portfolioValue?: string;
  realTimeCoins?: number;
  premiumFeature?: string;
}

export default function StatCards({ 
  portfolioValue = '$128,430',
  realTimeCoins = 23,
  premiumFeature = 'Active'
}: StatCardsProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {/* Portfolio Card */}
      <GlassCard className="text-center group hover:scale-[1.02] transition-all duration-300">
        <div className="mb-4 flex justify-center">
          <div className="p-4 rounded-full glass group-hover:shadow-[0_0_25px_rgba(34,197,94,0.6)] transition-all duration-300">
            <TrendingUp className="text-green-400" size={32} />
          </div>
        </div>
        <h3 className="text-3xl font-bold text-white mb-2">
          {portfolioValue}
        </h3>
        <p className="text-gray-400 font-medium">Portfolio Value</p>
        <div className="mt-3 pt-3 border-t border-white/10">
          <span className="text-green-400 text-sm font-semibold">+12.4% Today</span>
        </div>
      </GlassCard>

      {/* Real-Time Card */}
      <GlassCard className="text-center group hover:scale-[1.02] transition-all duration-300">
        <div className="mb-4 flex justify-center">
          <div className="p-4 rounded-full glass group-hover:shadow-[0_0_25px_rgba(234,179,8,0.6)] transition-all duration-300">
            <Zap className="text-yellow-400" size={32} />
          </div>
        </div>
        <h3 className="text-3xl font-bold text-white mb-2">
          {realTimeCoins}
        </h3>
        <p className="text-gray-400 font-medium">Real-Time Updates</p>
        <div className="mt-3 pt-3 border-t border-white/10">
          <span className="text-yellow-400 text-sm font-semibold inline-flex items-center gap-1">
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            Live Data
          </span>
        </div>
      </GlassCard>

      {/* Premium Card */}
      <GlassCard className="text-center group hover:scale-[1.02] transition-all duration-300">
        <div className="mb-4 flex justify-center">
          <div className="p-4 rounded-full glass group-hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-all duration-300">
            <Shield className="text-purple-400" size={32} />
          </div>
        </div>
        <h3 className="text-3xl font-bold text-white mb-2">
          {premiumFeature}
        </h3>
        <p className="text-gray-400 font-medium">Premium Status</p>
        <div className="mt-3 pt-3 border-t border-white/10">
          <span className="text-purple-400 text-sm font-semibold">King-Level Quality</span>
        </div>
      </GlassCard>
    </section>
  );
}
