'use client'

import Image from 'next/image'
import { MiniChart } from './MiniChart'
import { Coins, ChevronRight, Activity } from 'lucide-react'
import Link from 'next/link'

export type RoyalAssetRow = {
  id: string
  name: string
  symbol: string
  price: string
  changePercent: string
  isPositive: boolean
  chartData: number[]
  image: string | null
}

type RoyalAssetsProps = {
  assets: RoyalAssetRow[]
  loading?: boolean
  error?: string | null
  onRetry?: () => void
}

export function RoyalAssets({ assets, loading, error, onRetry }: RoyalAssetsProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between px-4">
          <div className="h-6 w-32 bg-white/5 rounded animate-pulse" />
        </div>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 rounded-3xl bg-white/5 animate-pulse border border-white/5" />
        ))}
      </div>
    )
  }

  if (error && assets.length === 0) {
    return (
      <div className="p-8 text-center rounded-3xl bg-white/5 border border-white/5">
        <p className="text-amber-500 text-xs tracking-[0.3em] uppercase mb-4">{error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="text-[10px] font-black tracking-[0.2em] text-white uppercase border border-white/10 px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all"
          >
            Reconnect Stream
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
           <Activity className="w-4 h-4 text-amber-500" />
           <h3 className="text-xl font-serif tracking-widest text-white uppercase">Trac Assets</h3>
        </div>
        <Link href="/markets" className="text-[10px] font-black tracking-[0.3em] text-amber-500/60 hover:text-amber-500 transition-colors uppercase">
          Full Market
        </Link>
      </div>

      <div className="space-y-3">
        {assets.map((asset) => (
          <div 
            key={asset.id} 
            className="group relative p-4 rounded-3xl bg-[#0C0C0E]/40 border border-white/5 hover:border-amber-500/30 transition-all duration-500"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className="relative w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center overflow-hidden border border-white/10 group-hover:scale-110 transition-transform duration-500">
                  {asset.image ? (
                    <Image src={asset.image} alt="" fill className="object-cover opacity-80 group-hover:opacity-100" />
                  ) : (
                    <Coins className="w-6 h-6 text-amber-500/40" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-serif text-lg tracking-wide text-white group-hover:text-amber-500 transition-colors">{asset.name}</p>
                  <p className="text-[10px] font-black tracking-[0.2em] text-gray-500 uppercase">{asset.symbol}</p>
                </div>
              </div>

              <div className="flex-1 px-4 hidden sm:block">
                <MiniChart data={asset.chartData} isPositive={asset.isPositive} />
              </div>

              <div className="text-right shrink-0">
                <p className="text-lg font-light tracking-tighter text-white tabular-nums">{asset.price}</p>
                <p className={`text-[10px] font-black tracking-widest uppercase ${asset.isPositive ? 'text-cyan-400' : 'text-red-400'}`}>
                  {asset.changePercent}
                </p>
              </div>
              
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0">
                <ChevronRight className="w-4 h-4 text-amber-500" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
