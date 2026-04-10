'use client'

import { Bell, User, LogOut, Crown } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

export function DashboardHeader() {
  const { data: session } = useSession()
  const user = session?.user
  const tier = user?.tier || 'free'
  
  return (
    <header className="flex items-center justify-between px-6 py-6">
      {/* Left - User Profile */}
      <div className="flex items-center gap-4">
        {/* User Avatar */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/30 to-cyan-500/30 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div 
            className="relative w-12 h-12 rounded-full flex items-center justify-center overflow-hidden border-2 border-white/10 bg-white/5"
          >
            {user?.image ? (
              <Image 
                src={user.image} 
                alt="Profile" 
                width={48} 
                height={48} 
                className="rounded-full"
              />
            ) : (
              <User className="w-5 h-5 text-amber-500/70" />
            )}
          </div>
        </div>

        {/* Tier Badge */}
        {tier !== 'free' && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5">
            <Crown className="w-3 h-3 text-amber-500" />
            <span className="text-[9px] font-black tracking-[0.3em] text-amber-500/80 uppercase">
              {tier}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/markets"
          className="hidden sm:inline text-[10px] font-black tracking-[0.3em] text-amber-500/60 hover:text-amber-500 transition-colors uppercase mr-2"
        >
          Markets
        </Link>

        {/* Notifications */}
        <button
          type="button"
          title="Alerts coming soon"
          className="relative w-11 h-11 rounded-full flex items-center justify-center bg-white/5 border border-white/5 hover:border-amber-500/20 transition-all duration-300"
        >
          <Bell className="w-5 h-5 text-gray-400" />
          <div className="absolute top-2 right-2 w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
        </button>
        
        {/* Logout Button */}
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="w-11 h-11 rounded-full flex items-center justify-center bg-white/5 border border-white/5 hover:border-red-500/20 text-gray-500 hover:text-red-400 transition-all duration-300"
          title="Sign Out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  )
}
