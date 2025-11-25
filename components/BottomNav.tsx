'use client'

import { Home, TrendingUp, Wallet, Clock, Settings } from 'lucide-react'
import { useState } from 'react'

export function BottomNav() {
  const [active, setActive] = useState('home')

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'charts', icon: TrendingUp, label: 'Charts' },
    { id: 'wallet', icon: Wallet, label: 'Wallet' },
    { id: 'history', icon: Clock, label: 'History' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ]

  return (
    <nav className="bottom-nav fixed bottom-0 left-0 right-0 pb-safe">
      <div className="flex items-center justify-around py-4 px-6">
        {navItems.map((item) => {
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className="flex flex-col items-center gap-1 transition-all"
            >
              <div
                className={`p-2 rounded-xl transition-all ${
                  isActive ? 'scale-110' : ''
                }`}
                style={{
                  background: isActive
                    ? 'linear-gradient(135deg, rgba(255, 215, 108, 0.2), rgba(196, 154, 43, 0.3))'
                    : 'transparent',
                  boxShadow: isActive ? '0 0 20px rgba(255, 215, 108, 0.3)' : 'none',
                }}
              >
                <item.icon
                  className={`w-6 h-6 ${
                    isActive ? 'text-yellow-400' : 'text-gray-400'
                  }`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </div>
              <span
                className={`text-xs ${
                  isActive ? 'text-yellow-400 font-bold' : 'text-gray-500'
                }`}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
