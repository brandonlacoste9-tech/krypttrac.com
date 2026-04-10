'use client'

import { Bell, User } from 'lucide-react'
import { useUser, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

export function DashboardHeader() {
  const { user } = useUser()
  const tier = (user?.publicMetadata?.tier as string) || 'free'
  
  return (
    <header className="flex items-center justify-between px-6 py-4">
      {/* Left - User Profile */}
      <div className="flex items-center gap-3">
        {/* Lion Head Icon / User Avatar */}
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center p-0.5"
          style={{
            background: 'linear-gradient(135deg, rgba(74, 21, 128, 0.4), rgba(26, 11, 46, 0.6))',
            border: '2px solid rgba(255, 215, 108, 0.3)',
          }}
        >
          {user?.imageUrl ? (
            <Image 
              src={user.imageUrl} 
              alt="Profile" 
              width={48} 
              height={48} 
              className="rounded-full"
            />
          ) : (
            <User className="w-6 h-6 text-yellow-400" />
          )}
        </div>

        {/* Platinum Subscriber Badge */}
        {tier === 'platinum' && (
          <div 
            className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5"
            style={{
              background: 'linear-gradient(135deg, rgba(77, 168, 218, 0.3), rgba(10, 22, 40, 0.5))',
              border: '2px solid rgba(232, 244, 248, 0.3)',
              color: '#E8F4F8',
            }}
          >
            <div className="w-2 h-2 rounded-full bg-blue-300 shadow-[0_0_8px_rgba(147,197,253,0.5)]" />
            Platinum Subscriber
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/markets"
          className="hidden sm:inline text-xs font-semibold text-yellow-400/90 hover:text-yellow-300 transition mr-2 uppercase tracking-widest"
        >
          Markets
        </Link>
        <button
          type="button"
          title="Alerts coming soon"
          className="relative w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{
            background: 'linear-gradient(135deg, rgba(74, 21, 128, 0.4), rgba(26, 11, 46, 0.6))',
            border: '2px solid rgba(255, 215, 108, 0.3)',
          }}
        >
          <Bell className="w-6 h-6 text-yellow-400" />
          <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-purple-950 shadow-lg" />
        </button>
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  )
}
