'use client'

import Link from 'next/link'
import { Zap } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-slate-900/80 backdrop-blur-xl border-t border-purple-500/20 py-6">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left side - Data attribution */}
          <div className="text-sm text-gray-400">
            Data provided by CoinGecko API • Refreshes every 30s
          </div>

          {/* Right side - Opus Magnum badge (clickable) */}
          <Link
            href="https://colony.io" // Replace with your actual Colony OS link
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 border border-purple-500/30 hover:border-purple-500/60 rounded-xl px-4 py-2.5 transition-all hover:scale-105"
          >
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg p-1.5">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div className="text-left">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">Powered by</p>
              <p className="text-sm font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                OPUS MAGNUM
              </p>
              <p className="text-[10px] text-gray-500">Colony OS</p>
            </div>
          </Link>
        </div>

        {/* Bottom row - Copyright */}
        <div className="mt-6 pt-6 border-t border-slate-800 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Krypto Kings. Built for Kings 👑 Powered by premium technology.
        </div>
      </div>
    </footer>
  )
}
