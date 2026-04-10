'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useEffect, useState, useRef } from 'react'

interface Particle {
  id: number
  width: string
  height: string
  left: string
  top: string
  delay: string
  duration: string
}

export default function SplashScreen() {
  const { status } = useSession()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState<Particle[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Generate particles once on mount to avoid impure render errors
    const newParticles = [...Array(20)].map((_, i) => ({
      id: i,
      width: Math.random() * 4 + 'px',
      height: Math.random() * 4 + 'px',
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      delay: Math.random() * 10 + 's',
      duration: Math.random() * 20 + 10 + 's'
    }))
    setParticles(newParticles)

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const { left, top, width, height } = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - left) / width - 0.5
      const y = (e.clientY - top) / height - 0.5
      setMousePos({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-[#050507]"
    >
      {/* Interactive Layered Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1A1A2E] via-[#050507] to-black opacity-60" />
        
        {/* Floating Particles */}
        <div className="absolute inset-0 opacity-20">
          {particles.map((p) => (
            <div 
              key={p.id}
              className="absolute rounded-full bg-amber-500/40 blur-[1px] animate-drift"
              style={{
                width: p.width,
                height: p.height,
                left: p.left,
                top: p.top,
                animationDelay: p.delay,
                animationDuration: p.duration
              }}
            />
          ))}
        </div>

        {/* The "Glass Monogram" Layer */}
        <div 
          className="absolute inset-0 opacity-[0.05] pointer-events-none transition-transform duration-700 ease-out"
          style={{
            transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px) scale(1.1)`,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 10 L45 25 L60 25 L48 35 L52 50 L40 40 L28 50 L32 35 L20 25 L35 25 Z' fill='%23FFD76C'/%3E%3C/svg%3E")`,
            backgroundSize: '120px 120px',
          }}
        />
      </div>

      <div className="relative z-10 text-center flex flex-col items-center max-w-4xl">
        <div 
          className="relative mb-8 group transition-transform duration-500 ease-out"
          style={{
            transform: `translate(${mousePos.x * -40}px, ${mousePos.y * -40}px)`
          }}
        >
          <div className="absolute inset-0 bg-cyan-500/10 blur-[100px] rounded-full scale-110" />
          <div className="absolute inset-0 bg-amber-500/10 blur-[100px] rounded-full scale-110 translate-x-12" />
          
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            <Image
              src="/luxury-crown.png"
              alt="kryptotrac Core"
              fill
              priority
              className="object-contain drop-shadow-[0_0_80px_rgba(251,191,36,0.4)] animate-float"
            />
          </div>
        </div>

        <div 
          className="space-y-6 transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)`
          }}
        >
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black tracking-[1em] text-cyan-400/80 uppercase mb-4 animate-pulse">
              Precision Intelligence
            </span>
            <h1 className="text-7xl md:text-9xl font-extralight tracking-[0.2em] text-white uppercase font-serif luxury-text">
              kryptotrac
            </h1>
          </div>
          
          <div className="flex items-center justify-center gap-6 opacity-60">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-500/50" />
            <p className="text-xs md:text-sm font-light tracking-[0.5em] text-amber-100 uppercase">
              Trace the wealth. Rule the market.
            </p>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-500/50" />
          </div>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-12 w-full max-w-lg">
          {status === 'authenticated' ? (
            <Link href="/dashboard" className="relative group w-full sm:w-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-cyan-500 rounded-full blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <button className="relative px-16 py-5 bg-white text-black text-[12px] font-black tracking-[0.3em] uppercase rounded-full leading-none flex items-center transition-all duration-300 group-hover:bg-black group-hover:text-white">
                Access Terminal
              </button>
            </Link>
          ) : (
            <Link href="/sign-up" className="relative group w-full sm:w-auto">
              <button className="relative px-16 py-5 border border-white/20 text-white text-[12px] font-black tracking-[0.3em] uppercase rounded-full transition-all duration-500 overflow-hidden group-hover:bg-white group-hover:text-black hover:scale-105 active:scale-95 shadow-2xl">
                Get Started
              </button>
            </Link>
          )}

          <Link href="/markets" className="group">
            <span className="text-[11px] font-bold tracking-[0.4em] text-amber-500/60 group-hover:text-amber-400 uppercase transition-colors cursor-pointer flex items-center gap-2">
              Market View
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            </span>
          </Link>
        </div>
      </div>

      <style jsx global>{`
        @font-face {
          font-family: 'LuxurySerif';
          src: local('Times New Roman');
        }
        .luxury-text {
          font-family: 'LuxurySerif', serif;
          background: linear-gradient(180deg, #FFFFFF 30%, #FFD76C 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(1deg); }
        }
        @keyframes drift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -20px); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-drift {
          animation: drift linear infinite;
        }
      `}</style>
    </div>
  )
}
