'use client'

import { useState } from 'react'
import { TierBadge } from '@/components/TierBadge'
import { AIAgent } from '@/components/AIAgent'
import { TrendingUp, TrendingDown, DollarSign, Activity, Crown, Sparkles } from 'lucide-react'

interface CryptoData {
  portfolio: {
    value: string
    change: string
    changePercent: string
  }
  cryptos: Array<{
    id: string
    name: string
    symbol: string
    price: string
    change24h: string
    volume: string
    marketCap: string
    isPositive: boolean
  }>
}

interface DashboardClientProps {
  initialData: CryptoData
}

export function DashboardClient({ initialData }: DashboardClientProps) {
  const [userTier] = useState<'free' | 'silver' | 'gold' | 'platinum'>('platinum')

  return (
    <main className="container mx-auto px-4 sm:px-6 py-8 space-y-6 sm:space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Welcome, King 👑</h2>
          <p className="text-gray-400 mt-2">Your royal crypto dashboard</p>
        </div>
        <TierBadge tier={userTier} size="lg" />
      </div>

      {/* Portfolio Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-gray-400">
            <DollarSign className="w-5 h-5" />
            <span className="font-semibold">Total Portfolio</span>
          </div>
          <div className="text-3xl sm:text-4xl font-bold text-white">{initialData.portfolio.value}</div>
          <div className="text-green-400 text-sm font-semibold">
            {initialData.portfolio.change} ({initialData.portfolio.changePercent})
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-gray-400">
            <Activity className="w-5 h-5" />
            <span className="font-semibold">24h Performance</span>
          </div>
          <div className="text-3xl sm:text-4xl font-bold text-green-400">{initialData.portfolio.changePercent}</div>
          <div className="text-gray-400 text-sm">Above market average</div>
        </div>

        <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-xl border border-purple-500/40 rounded-2xl p-6 space-y-3 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 text-purple-300">
            <Crown className="w-5 h-5" />
            <span className="font-semibold">Premium Features</span>
          </div>
          <div className="text-2xl font-bold text-white">Unlocked</div>
          <div className="flex items-center gap-2 text-purple-300 text-sm">
            <Sparkles className="w-4 h-4" />
            <span>AI Agent • Live Alerts • Kings Lounge</span>
          </div>
        </div>
      </div>

      {/* Market Data Table */}
      <div className="bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-700">
          <h3 className="text-xl sm:text-2xl font-bold text-white">Live Market Data</h3>
          <p className="text-gray-400 text-sm mt-1">Real-time crypto prices • Updates every 30s</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 text-left">
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-gray-400 font-semibold text-sm">Asset</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-gray-400 font-semibold text-sm">Price</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-gray-400 font-semibold text-sm">24h Change</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-gray-400 font-semibold text-sm hidden md:table-cell">Volume</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-gray-400 font-semibold text-sm hidden lg:table-cell">Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {initialData.cryptos.map((crypto) => (
                <tr key={crypto.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition">
                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    <div className="font-bold text-white text-sm sm:text-base">{crypto.name}</div>
                    <div className="text-xs sm:text-sm text-gray-400">{crypto.symbol}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-white font-semibold text-sm sm:text-base">{crypto.price}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    <div className={`flex items-center gap-1 text-sm sm:text-base ${crypto.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                      {crypto.isPositive ? <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" /> : <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4" />}
                      <span className="font-semibold">{crypto.change24h}</span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-300 text-sm hidden md:table-cell">{crypto.volume}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-300 text-sm hidden lg:table-cell">{crypto.marketCap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Premium Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-gradient-to-br from-yellow-600/10 to-yellow-600/5 backdrop-blur-xl border border-yellow-500/30 rounded-2xl p-6">
          <Crown className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400 mb-4" />
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Kings Lounge</h3>
          <p className="text-gray-400 mb-4 text-sm sm:text-base">
            Exclusive chat for Gold & Platinum members. Share alpha and connect with premium traders.
          </p>
          <button className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 rounded-xl text-white font-semibold transition-all hover:scale-105">
            Enter Lounge →
          </button>
        </div>

        <div className="bg-gradient-to-br from-purple-600/10 to-pink-600/5 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6">
          <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-purple-400 mb-4" />
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">AI Agent</h3>
          <p className="text-gray-400 mb-4 text-sm sm:text-base">
            Your personal crypto assistant. Get instant market analysis, price alerts, and trading insights.
          </p>
          <button className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-white font-semibold transition-all hover:scale-105">
            Chat with AI →
          </button>
        </div>
      </div>

      {/* AI Agent Component - Floating */}
      <AIAgent
        dashboardData={{ stablecoins: initialData.cryptos }}
        portfolioData={{ value: initialData.portfolio.value }}
      />
    </main>
  )
}
