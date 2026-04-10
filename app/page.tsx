import Image from 'next/image'
import Link from 'next/link'
import { SignedIn, SignedOut } from '@clerk/nextjs'

export default function SplashScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-[#1A0B2E]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10 L20 25 L25 25 L25 35 L35 35 L35 25 L40 25 Z' fill='%23FFD76C' fill-opacity='0.1'/%3E%3C/svg%3E")`,
            backgroundSize: '120px 120px',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center space-y-8 max-w-md">
        {/* Logo Container */}
        <div className="flex justify-center mb-8">
          <div className="relative w-48 h-48 rounded-[2.5rem] p-1 bg-gradient-to-br from-[#FFD76C] to-[#C49A2B] shadow-2xl">
            <div className="w-full h-full rounded-[2.3rem] flex items-center justify-center bg-[#1A0B2E]">
              <Image
                src="/kk-logo.png"
                alt="Krypto Kings Crown"
                width={120}
                height={120}
                priority
                className="drop-shadow-[0_0_20px_rgba(255,215,108,0.4)]"
              />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-5xl md:text-6xl font-black tracking-wider gold-text uppercase">
            Krypto Kings
          </h1>
          <p className="text-xl font-light text-gray-300">
            Rule Your Portfolio.
          </p>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <SignedIn>
            <Link href="/dashboard" className="w-full sm:w-auto">
              <span className="block px-12 py-4 rounded-full font-bold text-lg tracking-wide uppercase transition-all duration-300 hover:scale-105 text-center cursor-pointer bg-gradient-to-r from-[#FFD76C] to-[#C49A2B] text-[#1A0B2E] shadow-[0_8px_32px_rgba(255,215,108,0.3)]">
                Command Center
              </span>
            </Link>
          </SignedIn>
          
          <SignedOut>
            <Link href="/sign-up" className="w-full sm:w-auto">
              <span className="block px-12 py-4 rounded-full font-bold text-lg tracking-wide uppercase transition-all duration-300 hover:scale-105 text-center cursor-pointer bg-gradient-to-r from-[#FFD76C] to-[#C49A2B] text-[#1A0B2E] shadow-[0_8px_32px_rgba(255,215,108,0.3)]">
                Join the Realm
              </span>
            </Link>
          </SignedOut>

          <Link href="/markets" className="w-full sm:w-auto">
            <span className="block px-10 py-4 rounded-full font-bold text-lg tracking-wide uppercase transition-all duration-300 hover:scale-105 text-center cursor-pointer border-2 border-[#FFD76C]/40 text-[#FFD76C]">
              Markets
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
