'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Mail, Lock, User, Crown, Github, Chrome } from 'lucide-react'

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

    // In this NextAuth pattern, we leverage the CredentialsProvider's 
    // ability to auto-create a user if they don't exist for simplicity in this build.
    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (res?.error) {
        setError('The decree was rejected. Try a different identity.')
      } else {
        router.push('/dashboard')
      }
    } catch (err) {
      setError('The royal registry is currently unavailable.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#1A0B2E] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-600/10 blur-[120px] rounded-full" />

      <div className="w-full max-w-md z-10">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl mb-4 group hover:scale-105 transition-transform duration-500">
            <Image 
              src="/kk-logo.png" 
              width={80} 
              height={80} 
              alt="Krypto Kings" 
              className="drop-shadow-[0_0_15px_rgba(255,215,108,0.4)]"
            />
          </div>
          <h1 className="text-3xl font-black gold-text tracking-tighter mb-2">JOIN THE REALM</h1>
          <p className="text-gray-400 text-sm font-medium">Your crypto empire begins here.</p>
        </div>

        {/* Auth Card */}
        <div 
          className="rounded-3xl p-8 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          style={{
            background: 'linear-gradient(135deg, rgba(74, 21, 128, 0.3), rgba(26, 11, 46, 0.6))',
          }}
        >
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs py-3 px-4 rounded-xl mb-6 flex items-center gap-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-5">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-yellow-500/70 uppercase tracking-[0.2em] ml-1">Imperial Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="king@kryptokings.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-yellow-500/70 uppercase tracking-[0.2em] ml-1">Master Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div className="pt-2">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/10 mb-4">
                <Crown className="w-4 h-4 text-yellow-500" />
                <span className="text-[10px] font-bold text-yellow-500/80 uppercase tracking-widest">Initial Access: Free Tier</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FFD76C] via-[#F4C430] to-[#C49A2B] text-[#1A0B2E] font-black uppercase tracking-widest shadow-[0_10px_30px_rgba(244,196,48,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 mt-2"
            >
              {loading ? 'Registering...' : 'Claim My Throne'}
            </button>
          </form>

          {/* Footer Link */}
          <div className="flex items-center gap-4 my-8">
            <div className="h-[1px] flex-1 bg-white/10" />
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">Or quick join</span>
            <div className="h-[1px] flex-1 bg-white/10" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => signIn('google')} className="flex items-center justify-center gap-3 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <Chrome className="w-5 h-5 text-gray-400" />
              <span className="text-xs font-bold text-gray-300">Google</span>
            </button>
            <button onClick={() => signIn('github')} className="flex items-center justify-center gap-3 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <Github className="w-5 h-5 text-gray-400" />
              <span className="text-xs font-bold text-gray-300">GitHub</span>
            </button>
          </div>
        </div>

        <p className="text-center mt-8 text-sm text-gray-500 font-medium">
          Already a citizen? <Link href="/sign-in" className="text-yellow-500/80 hover:text-yellow-400 font-bold underline-offset-4 hover:underline transition-all">Sign in here</Link>
        </p>
      </div>
    </div>
  )
}
