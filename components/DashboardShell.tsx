'use client'

import { useCallback, useEffect, useMemo, useState, useRef } from 'react'
import { DashboardHeader } from '@/components/DashboardHeader'
import { TreasuryCard } from '@/components/TreasuryCard'
import { QuickActions } from '@/components/QuickActions'
import { RoyalAssets, type RoyalAssetRow } from '@/components/RoyalAssets'
import { BottomNav } from '@/components/BottomNav'
import { PortfolioBreakdown, MOCK_CONNECTIONS } from '@/components/PortfolioBreakdown'
import { AIAgent } from '@/components/AIAgent'
import type { DashboardSnapshot } from '@/lib/server/market-fetch'
import { formatPct, formatUsd } from '@/lib/dashboard-context'

const REFRESH_MS = 120_000

export function DashboardShell() {
  const [snapshot, setSnapshot] = useState<DashboardSnapshot | null>(null)
  const [bootLoading, setBootLoading] = useState(true)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

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
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const { left, top, width, height } = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - left) / width - 0.5
      const y = (e.clientY - top) / height - 0.5
      setMousePos({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
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

  return (
    <div 
      ref={containerRef}
      className="min-h-screen pb-24 relative bg-[#050507] overflow-x-hidden"
    >
      {/* Universal Luxury Monogram Background */}
      <div 
        className="fixed inset-0 opacity-[0.02] pointer-events-none transition-transform duration-700 ease-out z-0"
        style={{
          transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px) scale(1.05)`,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 10 L45 25 L60 25 L48 35 L52 50 L40 40 L28 50 L32 35 L20 25 L35 25 Z' fill='%23FFD76C'/%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px',
        }}
      />

      {/* Decorative Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-amber-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10">
        <DashboardHeader />
        
        <div className="max-w-5xl mx-auto space-y-8 px-4 py-8">
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PortfolioBreakdown />
            <RoyalAssets
              assets={royalAssets}
              loading={bootLoading}
              error={snapshot?.error}
              onRetry={load}
            />
          </div>
        </div>
      </div>

      <BottomNav />
      
      <AIAgent 
        dashboardData={snapshot?.aiContext} 
        portfolioData={{
          totalNetWorth: '$124,592.50',
          dailyProfit: '+1.4%',
          connections: MOCK_CONNECTIONS
        }}
      />

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
