'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { formatPct, formatUsd } from '@/lib/dashboard-context'
import type { DashboardSnapshot } from '@/lib/server/market-fetch'
import { TrendingDown, TrendingUp } from 'lucide-react'

export function MarketsView() {
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
    <div className="min-h-screen pb-12">
      <header className="flex flex-wrap items-center justify-between gap-4 px-4 py-4 max-w-5xl mx-auto border-b border-white/10">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/kk-logo.png" width={40} height={40} alt="" className="rounded-lg shadow-[0_0_15px_rgba(255,215,108,0.2)]" />
          <span className="font-bold tracking-tighter gold-text text-xl">KRYPTO KINGS</span>
        </Link>
        <div className="flex items-center gap-3">
          <SignedOut>
            <Link
              href="/sign-in"
              className="text-sm font-bold uppercase tracking-widest text-[#FFD76C] hover:text-white transition-all px-4 py-2 border border-[#FFD76C]/30 rounded-full"
            >
              Sign in
            </Link>
          </SignedOut>
          <SignedIn>
            <Link
              href="/dashboard"
              className="text-sm font-bold uppercase tracking-widest text-gray-300 hover:text-white transition mr-2"
            >
              Dashboard
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-black gold-text mb-2 tracking-wide text-shadow-gold">Royal Markets</h1>
        <p className="text-gray-400 text-sm mb-8">
          Live top cryptocurrencies. The pulse of your empire.
        </p>

        {loading ? (
          <div className="space-y-2">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-14 rounded-xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : !snap?.markets?.length ? (
          <p className="text-red-300 text-sm">{snap?.error || 'No market data.'}</p>
        ) : (
          <div className="rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl"
               style={{
                 background: 'linear-gradient(135deg, rgba(74, 21, 128, 0.25), rgba(26, 11, 46, 0.4))',
                 border: '1px solid rgba(255, 215, 108, 0.15)'
               }}>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-yellow-500/70 border-b" style={{ borderColor: 'rgba(255, 215, 108, 0.15)' }}>
                  <th className="py-4 px-4 font-medium w-10">#</th>
                  <th className="py-4 px-4 font-medium uppercase tracking-wider text-xs">Asset</th>
                  <th className="py-4 px-4 font-medium text-right uppercase tracking-wider text-xs">Price</th>
                  <th className="py-4 px-4 font-medium text-right hidden sm:table-cell uppercase tracking-wider text-xs">24h</th>
                  <th className="py-4 px-4 font-medium text-right hidden md:table-cell uppercase tracking-wider text-xs">Market Cap</th>
                </tr>
              </thead>
              <tbody>
                {snap.markets.map((m, idx) => {
                  const up = (m.change24h ?? 0) >= 0
                  return (
                    <tr key={m.id} className="border-b transition-all duration-300 hover:bg-white/5" style={{ borderColor: 'rgba(255, 215, 108, 0.05)' }}>
                      <td className="py-4 px-4 text-gray-500 font-mono">{m.rank ?? idx + 1}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          {m.image ? (
                            <Image src={m.image} alt="" width={32} height={32} className="rounded-full shadow-[0_0_10px_rgba(255,215,108,0.2)]" />
                          ) : null}
                          <div>
                            <div className="font-bold text-gray-100">{m.name}</div>
                            <div className="text-xs text-yellow-500/70 font-mono tracking-widest uppercase">{m.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right font-bold text-white tabular-nums tracking-wide">
                        {formatUsd(m.price)}
                      </td>
                      <td className="py-4 px-4 text-right hidden sm:table-cell">
                        <span
                          className={`inline-flex items-center gap-1 font-bold tabular-nums ${
                            up ? 'text-green-400' : 'text-red-400'
                          }`}
                        >
                          {up ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                          {formatPct(m.change24h)}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right text-gray-400 hidden md:table-cell tabular-nums font-mono">
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
    </div>
  )
}
