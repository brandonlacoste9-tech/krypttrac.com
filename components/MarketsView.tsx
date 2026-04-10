'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import { formatPct, formatUsd } from '@/lib/dashboard-context'
import type { DashboardSnapshot } from '@/lib/server/market-fetch'
import { TrendingDown, TrendingUp, LogOut, Globe, Satellite, Zap } from 'lucide-react'

export function MarketsView() {
  const { status } = useSession()
  const [snap, setSnap] = useState<DashboardSnapshot | null>(null)
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/dashboard-data')
      const json = (await res.json()) as DashboardSnapshot
      setSnap(json)
    } catch {
      setSnap(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return (
    <div className="min-h-screen bg-[#050507] pb-24 relative overflow-hidden">
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

      <header className="relative z-10 flex flex-wrap items-center justify-between gap-4 px-8 py-8 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/5 group-hover:border-amber-500/30 transition-all">
            <Image src="/kk-logo.png" width={32} height={32} alt="kryptotrac" />
          </div>
          <span className="text-2xl font-black tracking-tighter gold-text uppercase">kryptotrac</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/pricing" className="text-[10px] font-black tracking-[0.3em] text-amber-500/60 hover:text-amber-500 transition-colors uppercase">
            Pricing
          </Link>
          {status === 'unauthenticated' ? (
            <Link
              href="/sign-in"
              className="text-[10px] font-black tracking-[0.3em] uppercase text-white hover:text-amber-500 transition-all px-6 py-2 border border-white/10 rounded-full"
            >
              Access
            </Link>
          ) : status === 'authenticated' ? (
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="text-[10px] font-black tracking-[0.3em] uppercase text-gray-300 hover:text-white transition"
              >
                Dashboard
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="p-2 rounded-full text-amber-500/50 hover:text-amber-500 transition-colors bg-white/5 border border-white/5"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : null}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/5 border border-amber-500/20 mb-4">
             <Satellite className="w-3 h-3 text-amber-500 animate-pulse" />
             <span className="text-[9px] font-bold tracking-[0.3em] text-amber-500 uppercase">Live Satellite Stream</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-light tracking-[0.1em] text-white uppercase font-serif luxury-text mb-4">
            Global Markets
          </h1>
          <p className="text-sm font-medium tracking-[0.4em] text-gray-500 uppercase">
            Real-time Institutional Data Feed
          </p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-20 rounded-3xl bg-white/5 animate-pulse border border-white/5" />
            ))}
          </div>
        ) : !snap?.markets?.length ? (
          <div className="p-20 text-center rounded-3xl bg-white/5 border border-white/5">
            <p className="text-amber-500 text-xs tracking-widest uppercase">{snap?.error || 'Intelligence Stream Offline'}</p>
          </div>
        ) : (
          <div className="rounded-[2.5rem] overflow-hidden backdrop-blur-3xl border border-white/10 bg-[#0C0C0E]/50 shadow-2xl overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="py-6 px-8 text-[10px] font-black tracking-[0.3em] text-amber-500/70 uppercase">#</th>
                  <th className="py-6 px-8 text-[10px] font-black tracking-[0.3em] text-amber-500/70 uppercase">Asset</th>
                  <th className="py-6 px-8 text-right text-[10px] font-black tracking-[0.3em] text-amber-500/70 uppercase">Valuation</th>
                  <th className="py-6 px-8 text-right text-[10px] font-black tracking-[0.3em] text-amber-500/70 uppercase">Delta (24h)</th>
                  <th className="py-6 px-8 text-right text-[10px] font-black tracking-[0.3em] text-amber-500/70 uppercase hidden md:table-cell">Market Cap</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {snap.markets.map((m, idx) => {
                  const up = (m.change24h ?? 0) >= 0
                  return (
                    <tr key={m.id} className="group hover:bg-white/5 transition-all duration-300">
                      <td className="py-8 px-8 text-xs font-mono text-gray-600">{m.rank ?? idx + 1}</td>
                      <td className="py-8 px-8">
                        <div className="flex items-center gap-5">
                          {m.image ? (
                            <div className="relative">
                               <div className="absolute inset-0 bg-amber-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                               <Image src={m.image} alt="" width={40} height={40} className="relative rounded-full border border-white/10" />
                            </div>
                          ) : null}
                          <div>
                            <div className="font-serif text-xl tracking-wider text-white group-hover:text-amber-500 transition-colors uppercase">{m.name}</div>
                            <div className="text-[10px] text-gray-500 font-black tracking-[0.2em] uppercase">{m.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-8 px-8 text-right font-light text-2xl text-white tabular-nums tracking-tighter">
                        {formatUsd(m.price)}
                      </td>
                      <td className="py-8 px-8 text-right">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black tracking-widest tabular-nums ${
                            up ? 'text-cyan-400 bg-cyan-400/10' : 'text-red-400 bg-red-400/10'
                          }`}
                        >
                          {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {formatPct(m.change24h)}
                        </span>
                      </td>
                      <td className="py-8 px-8 text-right text-gray-500 hidden md:table-cell tabular-nums font-mono text-xs">
                        {formatUsd(m.marketCap, true)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style jsx global>{`
        .luxury-text {
          font-family: 'Times New Roman', serif;
          background: linear-gradient(180deg, #FFFFFF 30%, #FFD76C 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  )
}
