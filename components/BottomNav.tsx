'use client'

import { LayoutGrid, TrendingUp, Wallet, List, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    { id: 'home', href: '/dashboard', icon: LayoutGrid, label: 'Portal' },
    { id: 'charts', href: '/markets', icon: TrendingUp, label: 'Markets' },
    { id: 'pricing', href: '/pricing', icon: Wallet, label: 'Noble' },
    { id: 'history', href: '#', icon: List, label: 'Feed', soon: true },
    { id: 'settings', href: '#', icon: User, label: 'Profile', soon: true },
  ]

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-lg z-50">
      <nav className="relative rounded-[2rem] bg-[#0C0C0E]/80 backdrop-blur-3xl border border-white/10 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-around relative">
          {navItems.map((item) => {
            const isActive =
              item.href !== '#' && (pathname === item.href || pathname?.startsWith(item.href + '/'))
            
            const content = (
              <div className="flex flex-col items-center gap-1.5 py-2 px-4 transition-all duration-300">
                <div className={`relative transition-all duration-500 ${isActive ? 'scale-110 -translate-y-1' : 'opacity-40 hover:opacity-100'}`}>
                  <item.icon
                    className={`w-6 h-6 ${isActive ? 'text-amber-500' : 'text-white'}`}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-pulse" />
                  )}
                </div>
                <span className={`text-[8px] font-black tracking-[0.2em] uppercase transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/30'}`}>
                  {item.label}
                </span>
              </div>
            )

            if (item.soon) {
              return (
                <div key={item.id} className="cursor-not-allowed opacity-30 grayscale saturate-0" title="Restricted Suite">
                  {content}
                </div>
              )
            }

            return (
              <Link key={item.id} href={item.href} className="flex-1">
                {content}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
