'use client'

import { useTheme } from './ThemeProvider'
import { Crown, Lock } from 'lucide-react'

export function ThemeSwitcher() {
  const { theme, setTheme, canUsePlatinum } = useTheme()

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-3">
      {/* Royal Purple Theme */}
      <button
        onClick={() => setTheme('royal')}
        className={`relative w-16 h-16 rounded-2xl transition-all duration-300 ${
          theme === 'royal'
            ? 'ring-4 ring-yellow-400 scale-110'
            : 'hover:scale-105 opacity-70 hover:opacity-100'
        }`}
        style={{
          background: 'linear-gradient(135deg, #1A0B2E, #8A2BE2)',
          boxShadow: '0 8px 24px rgba(138, 43, 226, 0.4)',
        }}
        title="Royal Purple (Gold Tier)"
      >
        <div className="absolute inset-2 rounded-xl border-2 border-yellow-400/50" />
        <Crown className="absolute inset-0 m-auto w-6 h-6 text-yellow-400" />
      </button>

      {/* Platinum Suite Theme */}
      <button
        onClick={() => setTheme('platinum')}
        className={`relative w-16 h-16 rounded-2xl transition-all duration-300 ${
          theme === 'platinum'
            ? 'ring-4 ring-blue-300 scale-110'
            : 'hover:scale-105 opacity-70 hover:opacity-100'
        } ${!canUsePlatinum ? 'cursor-not-allowed' : ''}`}
        style={{
          background: 'linear-gradient(135deg, #0A1628, #4DA8DA)',
          boxShadow: '0 8px 24px rgba(77, 168, 218, 0.4)',
        }}
        title={canUsePlatinum ? "Platinum Suite (Platinum Tier)" : "Platinum Suite - Locked 🔒"}
      >
        <div className="absolute inset-2 rounded-xl border-2 border-blue-300/50" />
        {canUsePlatinum ? (
          <Crown className="absolute inset-0 m-auto w-6 h-6 text-blue-300" />
        ) : (
          <Lock className="absolute inset-0 m-auto w-6 h-6 text-gray-400" />
        )}
      </button>
    </div>
  )
}
