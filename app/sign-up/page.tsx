'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Mail, Lock, User, Shield, Github, Chrome, Satellite, ArrowRight } from 'lucide-react'

export default function SignUpPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (res?.error) {
        setError('Identification failed. Check entry credentials.')
      } else {
        router.push('/dashboard')
      }
    } catch (err) {
      setError('Central registry connection error.')
    } finally {
      setLoading(false)
    }
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
           <Link href="/" className="inline-block transition-transform duration-500 hover:scale-105 mb-6">
              <div className="p-4 rounded-[2rem] bg-white/5 border border-white/10 shadow-2xl">
                 <Image src="/kk-logo.png" width={56} height={56} alt="krypttrac" className="animate-float" />
              </div>
           </Link>
           <h1 className="text-4xl font-serif tracking-[0.2em] text-white uppercase mb-2">Initialize</h1>
           <div className="flex items-center justify-center gap-2">
              <Shield className="w-3 h-3 text-amber-500" />
              <p className="text-[10px] font-black tracking-[0.4em] text-gray-500 uppercase">Sovereign Asset Registration</p>
           </div>
        </div>

        {/* The Registration Card */}
        <div className="rounded-[2.5rem] bg-[#0C0C0E]/80 backdrop-blur-3xl border border-white/10 p-10 shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
           {error && <p className="bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold tracking-widest text-center uppercase p-3 rounded-xl mb-6">{error}</p>}

           <form onSubmit={handleSignUp} className="space-y-6">
              <div className="space-y-2">
                 <label className="text-[9px] font-black tracking-[0.3em] text-gray-400 uppercase px-1">Email Terminal</label>
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
                 <label className="text-[9px] font-black tracking-[0.3em] text-gray-400 uppercase px-1">Security Key</label>
                 <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-amber-500 transition-colors" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-amber-500/50 focus:bg-white/10 transition-all font-medium"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                 </div>
              </div>

              <div className="pt-2">
                 <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center">
                       <Satellite className="w-4 h-4 text-amber-500" />
                    </div>
                    <div>
                       <p className="text-[9px] font-black tracking-[0.2em] text-amber-500 uppercase">Initial Clearance</p>
                       <p className="text-[10px] text-gray-500 font-medium">Standard Citizen Access (Elevate post-init)</p>
                    </div>
                 </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black py-4 rounded-2xl font-black text-[11px] tracking-[0.3em] uppercase hover:bg-amber-500 transition-all duration-500 flex items-center justify-center gap-2 group disabled:opacity-50 mt-4"
              >
                {loading ? 'Initializing...' : 'Confirm Registration'}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
           </form>

           <div className="relative my-10 text-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
              <span className="relative px-4 bg-transparent text-[8px] font-black tracking-[0.5em] text-gray-600 uppercase">Direct Protocol</span>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <button onClick={() => signIn('google')} className="flex items-center justify-center gap-3 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                 <Chrome className="w-4 h-4 text-gray-400" />
                 <span className="text-[9px] font-black tracking-widest text-gray-300 uppercase">Google</span>
              </button>
              <button onClick={() => signIn('github')} className="flex items-center justify-center gap-3 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                 <Github className="w-4 h-4 text-gray-400" />
                 <span className="text-[9px] font-black tracking-widest text-gray-300 uppercase">GitHub</span>
              </button>
           </div>
        </div>

        <p className="mt-8 text-center text-[10px] font-medium tracking-[0.2em] text-gray-600 uppercase">
           Already within the network? <Link href="/sign-in" className="text-amber-500/80 hover:text-amber-400 transition-colors underline underline-offset-4">Authenticate Portal</Link>
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
