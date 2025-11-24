'use client';

import { Zap } from 'lucide-react';

export default function OpusMagnumBadge() {
  return (
    <a
      href="https://colonyos.ai"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 group cursor-pointer"
    >
      <div
        className="relative flex items-center gap-3 px-4 py-3 rounded-xl
                   backdrop-blur-xl bg-[#0F1729]/90
                   border border-[#8B5CF6]/50
                   shadow-[0_0_20px_rgba(139,92,246,0.3)]
                   transition-all duration-300 ease-out
                   hover:scale-105 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]
                   hover:border-[#8B5CF6]"
      >
        {/* Glow background effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#8B5CF6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Lightning bolt icon */}
        <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-[#8B5CF6]/20 group-hover:bg-[#8B5CF6]/30 transition-colors duration-300">
          <Zap
            className="w-5 h-5 text-[#8B5CF6] group-hover:text-[#A78BFA] transition-colors duration-300"
            fill="currentColor"
          />
        </div>

        {/* Text content */}
        <div className="relative flex flex-col">
          <span className="text-[10px] font-medium tracking-widest text-gray-400 uppercase">
            Powered by
          </span>
          <span className="text-sm font-bold tracking-wide text-white">
            OPUS MAGNUM
          </span>
          <span className="text-[9px] font-medium text-[#8B5CF6]/70 tracking-wider">
            Colony OS
          </span>
        </div>
      </div>
    </a>
  );
}
