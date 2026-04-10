'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { Crown, Menu, X, LogIn, LayoutDashboard, Sparkles } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0F051D]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="p-2 rounded-xl bg-white/5 group-hover:bg-white/10 transition-all border border-white/5 group-hover:border-yellow-500/30">
            <Image src="/kk-logo.png" width={32} height={32} alt="Logo" />
          </div>
          <span className="text-xl font-black tracking-tighter gold-text uppercase">kryptotrac.com</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/markets" className="text-sm font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest">Markets</Link>
          <Link href="/pricing" className="text-sm font-bold text-yellow-500/80 hover:text-yellow-400 transition-colors uppercase tracking-widest flex items-center gap-2">
            <Crown className="w-4 h-4" /> Elite Access
          </Link>
          <Link href="/referrals" className="text-sm font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest">Kingdom Rewards</Link>
        </div>

        {/* Auth Actions */}
        <div className="hidden md:flex items-center gap-4">
          {session ? (
            <>
              <Link 
                href="/dashboard"
                className="flex items-center gap-2 py-2.5 px-5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-black uppercase tracking-widest transition-all"
              >
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
              <button 
                onClick={() => signOut()}
                className="py-2.5 px-5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-black uppercase tracking-widest transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                href="/sign-in"
                className="flex items-center gap-2 py-2.5 px-5 rounded-xl text-gray-400 hover:text-white text-xs font-black uppercase tracking-widest transition-all"
              >
                <LogIn className="w-4 h-4" /> Login
              </Link>
              <Link 
                href="/sign-up"
                className="flex items-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#0F051D] text-xs font-black uppercase tracking-widest shadow-lg shadow-yellow-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Join Realm
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-gray-400">
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#0F051D] border-b border-white/10 p-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
          <Link href="/markets" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-gray-300">Markets</Link>
          <Link href="/pricing" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-yellow-500 flex items-center gap-2"><Crown className="w-5 h-5" /> Elite Access</Link>
          <div className="h-[1px] bg-white/5 w-full" />
          {session ? (
             <Link href="/dashboard" className="py-4 text-center rounded-2xl bg-white/5 font-black uppercase tracking-widest">Dashboard</Link>
          ) : (
            <>
              <Link href="/sign-in" className="py-4 text-center rounded-2xl bg-white/5 font-black uppercase tracking-widest">Login</Link>
              <Link href="/sign-up" className="py-4 text-center rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-black uppercase tracking-widest">Join Realm</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
