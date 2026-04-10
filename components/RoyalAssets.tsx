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
          <div className="h-6 w-32 bg-white/5 rounded-full animate-pulse" />
        </div>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 rounded-[2rem] bg-white/5 animate-pulse border border-white/5" />
        ))}
      </div>
    )
  }

  if (error && assets.length === 0) {
    return (
      <div className="p-12 text-center rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl">
        <p className="text-amber-500 text-[10px] font-black tracking-[0.4em] uppercase mb-6">{error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="text-[10px] font-black tracking-[0.2em] text-white uppercase border border-white/10 px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all hover:scale-105"
          >
            Reconnect Cipher Stream
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
           <h3 className="text-[11px] font-black tracking-[0.3em] text-white uppercase py-1">Royal Intelligence</h3>
        </div>
        <Link href="/markets" className="text-[9px] font-black tracking-[0.3em] text-amber-500/60 hover:text-amber-500 transition-colors uppercase">
          Full Access Hub
        </Link>
      </div>

      <div className="space-y-3">
        {assets.map((asset) => (
          <div 
            key={asset.id} 
            className="group relative p-5 rounded-[2rem] bg-white/[0.03] backdrop-blur-xl border border-white/5 hover:border-amber-500/30 transition-all duration-500 cursor-pointer overflow-hidden"
          >
            {/* Ambient Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-5 min-w-0">
                <div className="relative w-14 h-14 rounded-2xl bg-black/40 flex items-center justify-center overflow-hidden border border-white/10 group-hover:border-amber-500/40 transition-all duration-500 group-hover:scale-105">
                  {asset.image ? (
                    <Image src={asset.image} alt="" fill className="object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                  ) : (
                    <Coins className="w-7 h-7 text-amber-500/40" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-serif text-xl tracking-wide text-white group-hover:text-amber-500 transition-colors">{asset.name}</p>
                  <p className="text-[10px] font-black tracking-[0.2em] text-gray-500 uppercase mt-0.5">{asset.symbol}</p>
                </div>
              </div>

              <div className="flex-1 px-8 hidden sm:block">
                <MiniChart data={asset.chartData} isPositive={asset.isPositive} />
              </div>

              <div className="text-right shrink-0">
                <p className="text-xl font-light tracking-tighter text-white tabular-nums group-hover:text-amber-200 transition-colors">{asset.price}</p>
                <p className={`text-[10px] font-black tracking-widest uppercase mt-1 ${asset.isPositive ? 'text-cyan-400' : 'text-red-400'}`}>
                  {asset.changePercent}
                </p>
              </div>
              
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0 ml-2">
                <ChevronRight className="w-5 h-5 text-amber-500" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
