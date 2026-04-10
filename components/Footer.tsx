'use client'

import Link from 'next/link'
import { Zap } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative bg-[#050507] border-t border-white/5 py-10">
      {/* Subtle top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left side - Data attribution */}
          <div className="text-[10px] font-black tracking-[0.3em] text-gray-600 uppercase">
            Data provided by CoinGecko API • Live Feed
          </div>

          {/* Right side - Opus Magnum badge (clickable) */}
          <Link
            href="https://colony.io"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-amber-500/20 rounded-2xl px-5 py-3 transition-all duration-500 hover:scale-105"
          >
            <div className="bg-gradient-to-br from-amber-500/80 to-amber-700 rounded-xl p-2 group-hover:shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-shadow duration-500">
              <Zap className="w-4 h-4 text-black" />
            </div>
            <div className="text-left">
              <p className="text-[8px] font-black tracking-[0.4em] text-gray-600 uppercase">Powered by</p>
              <p className="text-sm font-black tracking-widest gold-text uppercase">
                Opus Magnum
              </p>
              <p className="text-[9px] tracking-widest text-gray-700 font-medium">Colony OS</p>
            </div>
          </Link>
        </div>

        {/* Bottom row - Copyright */}
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-[9px] font-black tracking-[0.6em] text-white/15 uppercase">
            © {new Date().getFullYear()} kryptotrac — Precision Intelligence — SSL Encrypted
          </p>
        </div>
      </div>
    </footer>
  )
}
