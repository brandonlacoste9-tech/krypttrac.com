'use client'

import { Home, TrendingUp, Wallet, Clock, Settings } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    { id: 'home', href: '/dashboard', icon: Home, label: 'Home' },
    { id: 'charts', href: '/markets', icon: TrendingUp, label: 'Markets' },
    { id: 'wallet', href: '#', icon: Wallet, label: 'Wallet', soon: true },
    { id: 'history', href: '#', icon: Clock, label: 'History', soon: true },
    { id: 'settings', href: '#', icon: Settings, label: 'Settings', soon: true },
  ]

  return (
    <nav className="bottom-nav fixed bottom-0 left-0 right-0 pb-safe">
      <div className="flex items-center justify-around py-4 px-6">
        {navItems.map((item) => {
          const isActive =
            item.href !== '#' && (pathname === item.href || pathname?.startsWith(item.href + '/'))
          const inner = (
            <>
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
                    isActive ? 'text-yellow-400' : item.soon ? 'text-gray-600' : 'text-gray-400'
                  }`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </div>
              <span
                className={`text-xs ${
                  isActive ? 'text-yellow-400 font-bold' : item.soon ? 'text-gray-600' : 'text-gray-500'
                }`}
              >
                {item.label}
              </span>
            </>
          )

          return item.soon ? (
            <button
              key={item.id}
              type="button"
              title="Coming soon"
              className="flex flex-col items-center gap-1 transition-all opacity-60 cursor-not-allowed"
            >
              {inner}
            </button>
          ) : (
            <Link
              key={item.id}
              href={item.href}
              className="flex flex-col items-center gap-1 transition-all"
            >
              {inner}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
