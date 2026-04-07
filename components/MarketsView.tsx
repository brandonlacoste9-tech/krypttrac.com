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
          <Image src="/kk-logo.png" width={40} height={40} alt="" className="rounded-lg" />
          <span className="font-bold tracking-wide gold-text">KRYPTO KINGS</span>
        </Link>
        <div className="flex items-center gap-3">
          <SignedOut>
            <Link
              href="/sign-in"
              className="text-sm font-medium text-yellow-400 hover:text-yellow-300 transition"
            >
              Sign in
            </Link>
          </SignedOut>
          <SignedIn>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-gray-300 hover:text-white transition mr-2"
            >
              Dashboard
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-black gold-text mb-2">All markets</h1>
        <p className="text-gray-400 text-sm mb-8">
          Top cryptocurrencies by market cap. Updates about every minute.
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
          <div className="rounded-2xl border border-white/10 overflow-hidden bg-white/5 backdrop-blur-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-white/10">
                  <th className="py-3 px-3 font-medium w-10">#</th>
                  <th className="py-3 px-3 font-medium">Name</th>
                  <th className="py-3 px-3 font-medium text-right">Price</th>
                  <th className="py-3 px-3 font-medium text-right hidden sm:table-cell">24h</th>
                  <th className="py-3 px-3 font-medium text-right hidden md:table-cell">Mcap</th>
                </tr>
              </thead>
              <tbody>
                {snap.markets.map((m, idx) => {
                  const up = (m.change24h ?? 0) >= 0
                  return (
                    <tr key={m.id} className="border-b border-white/5 hover:bg-white/5 transition">
                      <td className="py-3 px-3 text-gray-500">{m.rank ?? idx + 1}</td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          {m.image ? (
                            <Image src={m.image} alt="" width={28} height={28} className="rounded-full" />
                          ) : null}
                          <div>
                            <div className="font-semibold text-white">{m.name}</div>
                            <div className="text-xs text-gray-500">{m.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right font-medium text-white tabular-nums">
                        {formatUsd(m.price)}
                      </td>
                      <td className="py-3 px-3 text-right hidden sm:table-cell">
                        <span
                          className={`inline-flex items-center gap-0.5 font-semibold tabular-nums ${
                            up ? 'text-green-400' : 'text-red-400'
                          }`}
                        >
                          {up ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                          {formatPct(m.change24h)}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right text-gray-400 hidden md:table-cell tabular-nums">
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
