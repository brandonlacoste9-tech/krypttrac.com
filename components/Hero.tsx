'use client';

import React from 'react';
import { Crown, TrendingUp, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="text-center mb-16 relative">
      {/* Floating orbs for atmosphere */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute top-0 right-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      
      <div className="relative z-10">
        {/* Logo & Brand */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="relative">
            <Crown className="text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]" size={56} />
            <div className="absolute inset-0 animate-glow" />
          </div>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold">
            <span className="text-gradient">Krypttrac</span>
          </h1>
        </div>

        {/* Tagline */}
        <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-4 font-light tracking-wide">
          Built <span className="text-purple-400 font-semibold">for Kings</span>
        </p>
        
        <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
          Premium crypto tracking with real-time data, sleek glassmorphism, and crypto-king energy.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="glass-strong px-8 py-4 rounded-xl font-semibold text-white hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:shadow-[0_0_40px_rgba(168,85,247,0.7)]">
            <TrendingUp size={20} />
            View Dashboard
          </button>
          <button className="glass px-8 py-4 rounded-xl font-semibold text-white hover:glass-strong hover:scale-105 transition-all duration-300 flex items-center gap-2">
            <Zap size={20} />
            Live Markets
          </button>
        </div>

        {/* Decorative line */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
          <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
        </div>
      </div>
    </section>
  );
}
