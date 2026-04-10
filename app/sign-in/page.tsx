'use client'

import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Mail, Github, Lock, Eye, EyeOff, ArrowRight, Satellite } from 'lucide-react'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const result = await signIn('credentials', { 
        email, 
        password, 
        redirect: false 
      })
      
      if (result?.error) {
        setError('Identification failed. Check entry credentials.')
      } else {
        router.push('/dashboard')
      }
    } catch {
      setError('An error occurred during authentication handshake.')
    } finally {
      setLoading(false)
    }
  }

  const handleGitHubSignIn = () => {
    signIn('github', { callbackUrl: '/dashboard' })
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#050507] px-4">
      {/* Universal Luxury Monogram Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 10 L45 25 L60 25 L48 35 L52 50 L40 40 L28 50 L32 35 L20 25 L35 25 Z' fill='%23FFD76C'/%3E%3C/svg%3E")`,
            backgroundSize: '120px 120px',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md my-12">
        {/* Branding */}
        <div className="text-center mb-10">
           <Link href="/" className="inline-block transition-transform duration-500 hover:scale-105 mb-8">
              <div className="p-4 rounded-[2rem] bg-white/5 border border-white/10 shadow-2xl">
                 <Image src="/kk-logo.png" width={64} height={64} alt="krypttrac" className="animate-float" />
              </div>
           </Link>
           <h1 className="text-4xl font-serif tracking-[0.2em] text-white uppercase mb-2">Access Portal</h1>
           <div className="flex items-center justify-center gap-2">
              <Satellite className="w-3 h-3 text-cyan-400 animate-pulse" />
              <p className="text-[10px] font-black tracking-[0.4em] text-gray-500 uppercase">Secure Verification Required</p>
           </div>
        </div>

        {/* The Auth Card */}
        <div className="rounded-[2.5rem] bg-[#0C0C0E]/80 backdrop-blur-3xl border border-white/10 p-10 shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
           <form onSubmit={handleSignIn} className="space-y-6">
              <div className="space-y-2">
                 <label className="text-[9px] font-black tracking-[0.3em] text-gray-400 uppercase px-1">Email Identifier</label>
                 <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-amber-500 transition-colors" />
                    <input
                      type="email"
                      required
                      placeholder="noble@kryptotrac.com"
                      className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-amber-500/50 focus:bg-white/10 transition-all font-medium"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                 </div>
              </div>

              <div className="space-y-2">
                 <div className="flex items-center justify-between px-1">
                   <label className="text-[9px] font-black tracking-[0.3em] text-gray-400 uppercase">Security Key</label>
                   <Link href="#" className="text-[8px] font-black tracking-[0.2em] text-amber-500/60 hover:text-amber-500 transition-colors uppercase">Recover Access</Link>
                 </div>
                 <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-amber-500 transition-colors" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-12 text-white text-sm focus:outline-none focus:border-amber-500/50 focus:bg-white/10 transition-all font-medium"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                 </div>
              </div>

              {error && <p className="text-red-400 text-[10px] font-bold tracking-widest text-center uppercase border border-red-500/20 bg-red-500/5 p-3 rounded-xl">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black py-4 rounded-2xl font-black text-[11px] tracking-[0.3em] uppercase hover:bg-amber-500 transition-all duration-500 flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Authenticate Access'}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
           </form>

           <div className="relative my-10 text-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
              <span className="relative px-4 bg-transparent text-[8px] font-black tracking-[0.5em] text-gray-600 uppercase">External Handshake</span>
           </div>

           <button
             onClick={handleGitHubSignIn}
             className="w-full bg-white/5 border border-white/10 text-white py-4 rounded-2xl font-black text-[11px] tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-500 flex items-center justify-center gap-3"
           >
             <Github className="w-4 h-4" />
             Continue with GitHub
           </button>
        </div>

        <p className="mt-8 text-center text-[10px] font-medium tracking-[0.2em] text-gray-600 uppercase">
           New to the network? <Link href="/sign-up" className="text-amber-500/80 hover:text-amber-500 transition-colors underline underline-offset-4">Initialize Account</Link>
        </p>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
