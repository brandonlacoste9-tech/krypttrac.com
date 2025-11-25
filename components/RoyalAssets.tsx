'use client'

import { MiniChart } from './MiniChart'
import { Bitcoin, Cpu } from 'lucide-react'

export function RoyalAssets() {
  const assets = [
    {
      icon: Bitcoin,
      name: 'Bitcoin',
      symbol: 'BTC',
      price: '$124,500.25',
      change: '+6.030025',
      changePercent: '+0.37%',
      isPositive: true,
      chartData: [42000, 43500, 42800, 44200, 43800, 45100, 44500, 45800],
    },
    {
      icon: Cpu,
      name: 'Ethereum',
      symbol: 'ETH',
      price: '$10,345.53',
      change: '-$0.50',
      changePercent: '-0.60%',
      isPositive: false,
      chartData: [2300, 2350, 2280, 2400, 2320, 2380, 2310, 2280],
    },
  ]

  return (
    <div className="px-6 my-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold gold-text">Royal Assets</h3>
        <button className="text-sm text-yellow-400 hover:text-yellow-300 transition">
          See All
        </button>
      </div>

      <div className="space-y-3">
        {assets.map((asset, idx) => (
          <div key={idx} className="royal-asset-bar">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #FFD76C, #C49A2B)',
                  }}
                >
                  <asset.icon className="w-5 h-5 text-purple-950" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="font-bold text-white">{asset.name}</p>
                  <p className="text-xs text-gray-400">{asset.symbol}</p>
                </div>
              </div>

              <div className="flex-1 flex justify-center">
                <MiniChart data={asset.chartData} isPositive={asset.isPositive} />
              </div>

              <div className="text-right">
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
