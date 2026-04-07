'use client'

import Image from 'next/image'
import { MiniChart } from './MiniChart'
import { Coins } from 'lucide-react'
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
      <div className="px-6 my-6">
        <div className="flex items-center justify-between mb-4">
          <div className="h-7 w-40 bg-white/10 rounded animate-pulse" />
          <div className="h-4 w-16 bg-white/10 rounded animate-pulse" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 rounded-xl bg-white/5 animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (error && assets.length === 0) {
    return (
      <div className="px-6 my-6">
        <h3 className="text-xl font-bold gold-text mb-4">Royal Assets</h3>
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-6 text-center">
          <p className="text-red-200 text-sm mb-4">{error}</p>
          {onRetry ? (
            <button
              type="button"
              onClick={onRetry}
              className="text-sm font-semibold text-yellow-400 hover:text-yellow-300"
            >
              Retry
            </button>
          ) : null}
        </div>
      </div>
    )
  }

  return (
    <div className="px-6 my-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold gold-text">Royal Assets</h3>
        <Link href="/markets" className="text-sm text-yellow-400 hover:text-yellow-300 transition font-medium">
          See all
        </Link>
      </div>

      <div className="space-y-3">
        {assets.map((asset) => (
          <div key={asset.id} className="royal-asset-bar">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 overflow-hidden relative"
                  style={{
                    background: 'linear-gradient(135deg, #FFD76C, #C49A2B)',
                  }}
                >
                  {asset.image ? (
                    <Image src={asset.image} alt="" width={40} height={40} className="object-cover" />
                  ) : (
                    <Coins className="w-5 h-5 text-purple-950" strokeWidth={2.5} />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-white truncate">{asset.name}</p>
                  <p className="text-xs text-gray-400">{asset.symbol}</p>
                </div>
              </div>

              <div className="flex-1 flex justify-center max-w-[100px]">
                <MiniChart data={asset.chartData} isPositive={asset.isPositive} />
              </div>

              <div className="text-right shrink-0">
                <p className="font-bold gold-text text-sm">{asset.price}</p>
                <p className={`text-xs font-semibold ${asset.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  {asset.changePercent}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
