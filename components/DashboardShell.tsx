'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { DashboardHeader } from '@/components/DashboardHeader'
import { TreasuryCard } from '@/components/TreasuryCard'
import { QuickActions } from '@/components/QuickActions'
import { RoyalAssets, type RoyalAssetRow } from '@/components/RoyalAssets'
import { BottomNav } from '@/components/BottomNav'
import { PortfolioBreakdown, MOCK_CONNECTIONS } from '@/components/PortfolioBreakdown'
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

  return (
    <div className="min-h-screen pb-24 relative">
      <ThemeSwitcher />
      <DashboardHeader />
      <TreasuryCard
        loading={bootLoading}
        headline="Total Net Worth"
        primaryValue={bootLoading ? '—' : '$124,592.50'}
        changeLabel="24h Profit"
        changePercent="+1.4%"
        isPositive={true}
        footnote="Includes 3 connected real estate assets & 4 wallets"
      />
      <QuickActions />
      <PortfolioBreakdown />
      <RoyalAssets
        assets={royalAssets}
        loading={bootLoading}
        error={snapshot?.error}
        onRetry={load}
      />
      <BottomNav />
      <AIAgent 
        dashboardData={snapshot?.aiContext} 
        portfolioData={{
          totalNetWorth: '$124,592.50',
          dailyProfit: '+1.4%',
          connections: MOCK_CONNECTIONS
        }}
      />
    </div>
  )
}
