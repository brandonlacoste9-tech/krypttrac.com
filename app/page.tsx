'use client';

import { useThemeStore } from '@/lib/themeStore';
import { useCryptoData } from '@/lib/hooks/useCryptoData';
import { formatMarketCap } from '@/lib/api/cryptoAPI';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import StatCards from '@/components/StatCards';
import TopMovers from '@/components/TopMovers';
import { TopMoversSkeleton } from '@/components/SkeletonLoader';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function Home() {
  const { theme } = useThemeStore();
  const { coins, gainers, losers, loading, error, refetch, lastUpdated } = useCryptoData(30);

  // Calculate total market cap from our coins
  const totalMarketCap = coins.reduce((sum, coin) => sum + coin.market_cap, 0);

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 page-transition">
        {/* Hero Section */}
        <Hero />

        {/* Demo Portfolio Section */}
        <div id="demo-portfolio" className="scroll-mt-8">
          {/* Stats Cards */}
          <StatCards
            portfolioValue={formatMarketCap(totalMarketCap)}
            realTimeCoins={coins.length}
            premiumFeature="Live"
          />

          {/* Error State */}
          {error && (
            <div
              className="mb-8 p-4 rounded-xl flex items-center justify-between"
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
              }}
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="text-red-400" size={20} />
                <span className="text-red-400">{error}</span>
              </div>
              <button
                onClick={refetch}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
              >
                <RefreshCw size={16} />
                Retry
              </button>
            </div>
          )}

          {/* Top Movers Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-bold text-white">
                <span className="text-gradient">What's Poppin'</span>
              </h2>
              {lastUpdated && (
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ background: '#22c55e' }}
                  />
                  <span>
                    Live • Updated {lastUpdated.toLocaleTimeString()}
                  </span>
                  <button
                    onClick={refetch}
                    className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                    title="Refresh data"
                  >
                    <RefreshCw size={14} />
                  </button>
                </div>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TopMoversSkeleton />
                <TopMoversSkeleton />
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TopMovers cryptos={gainers} type="gainers" />
                <TopMovers cryptos={losers} type="losers" />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="glass-strong border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 <span style={{ color: theme.accent }}>Krypto Kings</span>. Built for kings. Powered by premium technology.
            </p>
            <p className="text-gray-500 text-xs">
              Data provided by CoinGecko API • Refreshes every 30s
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
