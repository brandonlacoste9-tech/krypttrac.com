'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { DashboardHeader } from '@/components/DashboardHeader'
import { TreasuryCard } from '@/components/TreasuryCard'
import { QuickActions } from '@/components/QuickActions'
import { RoyalAssets, type RoyalAssetRow } from '@/components/RoyalAssets'
import { BottomNav } from '@/components/BottomNav'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { AIAgent } from '@/components/AIAgent'
import type { DashboardSnapshot } from '@/lib/server/market-fetch'
import { formatPct, formatUsd } from '@/lib/dashboard-context'

const REFRESH_MS = 120_000

export function DashboardShell() {
  const [snapshot, setSnapshot] = useState<DashboardSnapshot | null>(null)
  const [bootLoading, setBootLoading] = useState(true)

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/dashboard-data')
      const json = (await res.json()) as DashboardSnapshot
      setSnapshot(json)
    } catch {
      setSnapshot({
        markets: [],
        global: {
          totalMarketCapUsd: null,
          totalVolumeUsd: null,
          marketCapChange24hPct: null,
          btcDominancePct: null,
          ethDominancePct: null,
          activeCryptocurrencies: null,
        },
        aiContext: { gainers: [], losers: [], stablecoins: [] },
        updatedAt: new Date().toISOString(),
        error: 'Network error',
      })
    } finally {
      setBootLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  useEffect(() => {
    const t = setInterval(load, REFRESH_MS)
    return () => clearInterval(t)
  }, [load])

  const royalAssets: RoyalAssetRow[] = useMemo(() => {
    if (!snapshot?.markets?.length) return []
    return snapshot.markets.slice(0, 8).map((m) => {
      const spark = m.sparkline?.filter((n) => typeof n === 'number' && Number.isFinite(n)) ?? []
      const chartData =
        spark.length >= 2 ? spark : [m.price ?? 0, m.price ?? 0, m.price ?? 0, m.price ?? 0]
      return {
        id: m.id,
        name: m.name,
        symbol: m.symbol,
        price: formatUsd(m.price),
        changePercent: formatPct(m.change24h),
        isPositive: (m.change24h ?? 0) >= 0,
        chartData,
        image: m.image,
      }
    })
  }, [snapshot])

  const g = snapshot?.global
  const mcap = g?.totalMarketCapUsd ?? null
  const mcapDelta = g?.marketCapChange24hPct ?? null
  const isMcapUp = mcapDelta == null ? null : mcapDelta >= 0

  const footnoteParts: string[] = []
  if (g?.btcDominancePct != null) {
    footnoteParts.push(`BTC dominance ${g.btcDominancePct.toFixed(1)}%`)
  }
  if (g?.ethDominancePct != null) {
    footnoteParts.push(`ETH ${g.ethDominancePct.toFixed(1)}%`)
  }
  if (g?.totalVolumeUsd != null) {
    footnoteParts.push(`24h vol ${formatUsd(g.totalVolumeUsd, true)}`)
  }
  const footnote = footnoteParts.length ? footnoteParts.join(' · ') : undefined

  return (
    <div className="min-h-screen pb-24 relative">
      <ThemeSwitcher />
      <DashboardHeader />
      <TreasuryCard
        loading={bootLoading}
        primaryValue={mcap != null ? formatUsd(mcap, true) : '—'}
        changeLabel="24h market cap"
        changePercent={formatPct(mcapDelta)}
        isPositive={isMcapUp}
        footnote={footnote}
      />
      <QuickActions />
      <RoyalAssets
        assets={royalAssets}
        loading={bootLoading}
        error={snapshot?.error}
        onRetry={load}
      />
      <BottomNav />
      <AIAgent dashboardData={snapshot?.aiContext} />
    </div>
  )
}
