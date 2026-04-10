'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Satellite, Shield } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#050507]/90 backdrop-blur-3xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="p-3 rounded-2xl bg-white/5 group-hover:bg-white/10 transition-all border border-white/5 group-hover:border-amber-500/30">
            <Image src="/kk-logo.png" width={32} height={32} alt="kryptotrac" />
          </div>
          <span className="text-2xl font-black tracking-tighter gold-text uppercase">kryptotrac</span>
        </Link>

        {/* Global Suites */}
        <div className="hidden md:flex items-center gap-10">
          <Link href="/markets" className="text-[10px] font-black tracking-[0.4em] text-gray-400 hover:text-white transition-colors uppercase">
            Market View
          </Link>
          <Link href="/pricing" className="text-[10px] font-black tracking-[0.4em] text-amber-500/80 hover:text-amber-500 transition-colors uppercase flex items-center gap-2">
            <Shield className="w-3 h-3" /> Noble Access
          </Link>
          <Link href="#" className="text-[10px] font-black tracking-[0.4em] text-gray-600 cursor-not-allowed uppercase">
            Intelligence
          </Link>
        </div>

        {/* Action Center */}
        <div className="hidden md:flex items-center gap-6">
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-3 py-3 px-6 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] transition-all"
              >
                <div className="p-2 rounded-full border border-cyan-500/30 bg-cyan-500/10">
                   <Satellite className="w-3 h-3 text-cyan-400 animate-pulse" />
                </div>
                Dashboard
              </Link>
              <button 
                onClick={() => signOut()}
                className="text-[10px] font-black tracking-[0.3em] uppercase text-red-500/60 hover:text-red-500 px-4 py-2 border border-red-500/10 rounded-full"
              >
                Exit
              </button>
            </>
          ) : (
            <>
              <Link 
                href="/sign-in"
                className="text-[10px] font-black tracking-[0.3em] text-gray-400 hover:text-white uppercase"
              >
                Access
              </Link>
              <Link 
                href="/sign-up"
                className="flex items-center gap-2 py-3 px-8 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:bg-amber-500 hover:scale-105 active:scale-95 shadow-2xl"
              >
                Initialize
              </Link>
            </>
          )}
        </div>

        {/* Mobile Suite Toggle */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-white/50">
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Suite Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-24 left-0 w-full bg-[#050507] border-b border-white/10 p-8 flex flex-col gap-8 animate-in slide-in-from-top duration-500 backdrop-blur-3xl">
          <Link href="/markets" onClick={() => setIsMenuOpen(false)} className="text-xl font-serif tracking-widest text-white uppercase">Markets</Link>
          <Link href="/pricing" onClick={() => setIsMenuOpen(false)} className="text-xl font-serif tracking-widest text-amber-500 flex items-center gap-2 uppercase">Noble Access</Link>
          <div className="h-[1px] bg-white/10 w-full" />
          {session ? (
             <Link href="/dashboard" className="py-5 text-center rounded-3xl bg-white/5 font-black uppercase tracking-[0.3em] text-[10px]">Portal Dashboard</Link>
          ) : (
            <div className="flex flex-col gap-4">
              <Link href="/sign-in" className="py-5 text-center text-[10px] font-black uppercase tracking-[0.3em] border border-white/10 rounded-3xl">Sign In</Link>
              <Link href="/sign-up" className="py-5 text-center text-[10px] font-black uppercase tracking-[0.3em] bg-white text-black rounded-3xl">Get Started</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}
