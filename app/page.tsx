'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function SplashScreen() {
  const { status } = useSession()

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-[#0C0C0E]">
      {/* Louis Vuitton Inspired Monogram Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 10 L45 25 L60 25 L48 35 L52 50 L40 40 L28 50 L32 35 L20 25 L35 25 Z' fill='%23FFD76C'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      {/* Luxury Gradient Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-amber-900/10 blur-[180px] rounded-full" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-amber-900/10 blur-[180px] rounded-full" />

      {/* Main Content */}
      <div className="relative z-10 text-center flex flex-col items-center max-w-2xl">
        
        {/* The Crown Jewel */}
        <div className="relative mb-16 group">
          <div className="absolute inset-0 bg-amber-500/20 blur-[60px] rounded-full scale-75 group-hover:scale-100 transition-all duration-1000" />
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <Image
              src="/kryptotrac_luxury_crown_1775838056747.png" // Using the generated luxury visual
              alt="kryptotrac Jewel"
              fill
              priority
              className="object-contain drop-shadow-[0_0_50px_rgba(251,191,36,0.3)] animate-float"
            />
          </div>
        </div>

        {/* Branding */}
        <div className="space-y-6">
          <div className="inline-block px-4 py-1 border border-amber-500/30 rounded-full mb-4">
            <span className="text-[10px] font-bold tracking-[0.4em] text-amber-500 uppercase">
              The Private Suite
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-light tracking-[0.2em] text-white uppercase font-sans">
            kryptotrac
          </h1>
          
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-amber-500/30" />
            <p className="text-sm md:text-base font-medium tracking-[0.3em] text-amber-200/60 uppercase">
              Trace the wealth. Rule the market.
            </p>
            <div className="h-[1px] w-12 bg-amber-500/30" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-8 w-full px-8">
          {status === 'authenticated' ? (
            <Link href="/dashboard" className="w-full sm:w-auto group">
              <span className="relative block px-16 py-5 rounded-full font-bold text-sm tracking-[0.3em] uppercase transition-all duration-500 overflow-hidden bg-white text-black hover:bg-amber-500">
                <span className="relative z-10">Dashboard</span>
              </span>
            </Link>
          ) : (
            <Link href="/sign-up" className="w-full sm:w-auto group">
              <span className="relative block px-16 py-5 rounded-full font-bold text-sm tracking-[0.3em] uppercase transition-all duration-500 overflow-hidden border border-white/20 text-white hover:bg-white hover:text-black">
                <span className="relative z-10">Get Started</span>
              </span>
            </Link>
          )}

          <Link href="/markets" className="w-full sm:w-auto group">
            <span className="block px-12 py-5 font-bold text-sm tracking-[0.3em] uppercase text-amber-500/70 hover:text-amber-500 transition-colors">
              The Markets
            </span>
          </Link>
        </div>

        {/* Bottom Detail */}
        <div className="mt-24 opacity-20">
          <p className="text-[9px] tracking-[0.8em] text-white uppercase">
            MMXIV — ESTABLISHED IN THE REVELATION
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .gold-text {
          background: linear-gradient(135deg, #FFD76C, #F4C430, #C49A2B);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  )
}
