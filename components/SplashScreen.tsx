'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [animationStage, setAnimationStage] = useState(0);

  useEffect(() => {
    // Animation sequence - smoother and longer
    const stage1 = setTimeout(() => setAnimationStage(1), 500);   // Logo fades in
    const stage2 = setTimeout(() => setAnimationStage(2), 1200);  // Flash glow
    const stage3 = setTimeout(() => setAnimationStage(3), 1800);  // Crown drops
    const stage4 = setTimeout(() => setAnimationStage(4), 3000);  // Start fade out
    const hide = setTimeout(() => setIsVisible(false), 3600);     // Complete

    return () => {
      clearTimeout(stage1);
      clearTimeout(stage2);
      clearTimeout(stage3);
      clearTimeout(stage4);
      clearTimeout(hide);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-700 ease-out ${
        animationStage >= 4 ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* White flash overlay */}
      <div
        className={`absolute inset-0 bg-white transition-opacity duration-300 ease-in-out ${
          animationStage === 2 ? 'opacity-25' : 'opacity-0'
        }`}
      />

      {/* Main logo container */}
      <div className="relative flex flex-col items-center">
        {/* Crown */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 transition-all duration-700 ease-out ${
            animationStage >= 3
              ? '-top-20 opacity-100'
              : '-top-32 opacity-0'
          }`}
        >
          <svg
            width="60"
            height="48"
            viewBox="0 0 60 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]"
          >
            {/* Crown shape */}
            <path
              d="M5 38L10 15L20 25L30 8L40 25L50 15L55 38H5Z"
              fill="#FFD700"
              stroke="#B8860B"
              strokeWidth="2"
            />
            {/* Crown base */}
            <rect x="5" y="38" width="50" height="8" rx="2" fill="#FFD700" stroke="#B8860B" strokeWidth="2" />
            {/* Crown jewels */}
            <circle cx="15" cy="42" r="3" fill="#8B5CF6" />
            <circle cx="30" cy="42" r="3" fill="#8B5CF6" />
            <circle cx="45" cy="42" r="3" fill="#8B5CF6" />
            {/* Top jewel */}
            <circle cx="30" cy="14" r="4" fill="#8B5CF6" stroke="#FFD700" strokeWidth="1" />
          </svg>
        </div>

        {/* KK Logo Image */}
        <div
          className={`relative transition-all duration-700 ease-out ${
            animationStage >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Glow effect behind logo */}
          <div
            className={`absolute inset-0 blur-2xl transition-opacity duration-500 ease-in-out ${
              animationStage >= 2 ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: 'radial-gradient(circle, rgba(255,215,0,0.6) 0%, rgba(139,92,246,0.4) 50%, transparent 70%)',
            }}
          />

          {/* Logo Image */}
          <div
            className={`relative z-10 transition-all duration-300 ${
              animationStage >= 2 ? 'drop-shadow-[0_0_30px_rgba(255,215,0,0.6)]' : ''
            }`}
          >
            <Image
              src="/logo-512.png"
              alt="ꓘK"
              width={200}
              height={200}
              priority
              className="object-contain"
            />
          </div>
        </div>

        {/* Tagline */}
        <div
          className={`mt-8 text-center transition-all duration-700 ease-out ${
            animationStage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p
            className="text-lg font-medium tracking-[0.3em] uppercase"
            style={{
              background: 'linear-gradient(90deg, #FFD700, #FFA500, #FFD700)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Krypto Kings
          </p>
        </div>
      </div>
    </div>
  );
}
