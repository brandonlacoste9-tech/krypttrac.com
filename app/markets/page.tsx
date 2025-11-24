'use client';

import { mockCryptoData } from '@/lib/mockMarkets';
import { formatPrice, formatPercentage } from '@/lib/utils';
import { useThemeStore } from '@/lib/themeStore';
import Header from '@/components/Header';
import GlassCard from '@/components/GlassCard';
import { TrendingUp, TrendingDown, Search, Crown } from 'lucide-react';
import { useState, useMemo } from 'react';
import Image from 'next/image';

export default function MarketsPage() {
  const { theme } = useThemeStore();
  const [search, setSearch] = useState('');

  // Memoize filtered results to avoid recalculating on every render
  const filteredCryptos = useMemo(() => {
    if (!search) return mockCryptoData;
    const searchLower = search.toLowerCase();
    return mockCryptoData.filter(crypto =>
      crypto.name.toLowerCase().includes(searchLower) ||
      crypto.symbol.toLowerCase().includes(searchLower)
    );
  }, [search]);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 page-transition">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Crown size={40} style={{ color: theme.accent }} />
            <h1 className="text-5xl font-bold">
              <span className="text-gradient">Live Markets</span>
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Real-time cryptocurrency prices for kings 👑
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search cryptos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 glass rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all"
              style={{ '--tw-ring-color': theme.primary } as React.CSSProperties}
            />
          </div>
        </div>

        {/* Markets Table */}
        <GlassCard>
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-white/10 text-gray-400 text-sm font-medium">
            <div className="col-span-1">#</div>
            <div className="col-span-4">Name</div>
            <div className="col-span-2 text-right">Price</div>
            <div className="col-span-2 text-right">24h %</div>
            <div className="col-span-3 text-right hidden sm:block">Market Cap</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-white/5">
            {filteredCryptos.map((crypto) => {
              const isPositive = crypto.price_change_percentage_24h >= 0;
              return (
                <div
                  key={crypto.id}
                  className="grid grid-cols-12 gap-4 px-4 py-4 hover:bg-white/5 transition-all cursor-pointer group"
                >
                  <div className="col-span-1 text-gray-500 font-medium flex items-center">
                    {crypto.market_cap_rank}
                  </div>
                  <div className="col-span-4 flex items-center gap-3">
                    <Image
                      src={crypto.image}
                      alt={crypto.name}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="text-white font-semibold group-hover:text-gradient transition-all">
                        {crypto.name}
                      </p>
                      <p className="text-sm text-gray-400 uppercase">
                        {crypto.symbol}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-2 text-right flex items-center justify-end">
                    <span className="text-white font-semibold">
                      {formatPrice(crypto.current_price)}
                    </span>
                  </div>
                  <div className="col-span-2 text-right flex items-center justify-end gap-1">
                    {isPositive ? (
                      <TrendingUp size={16} className="text-green-400" />
                    ) : (
                      <TrendingDown size={16} className="text-red-400" />
                    )}
                    <span className={isPositive ? 'text-green-400 font-semibold' : 'text-red-400 font-semibold'}>
                      {formatPercentage(crypto.price_change_percentage_24h)}
                    </span>
                  </div>
                  <div className="col-span-3 text-right hidden sm:flex items-center justify-end">
                    <span className="text-gray-300">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        notation: 'compact',
                        maximumFractionDigits: 2,
                      }).format(crypto.market_cap)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>

        {/* Stats */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          Showing {filteredCryptos.length} of {mockCryptoData.length} cryptocurrencies
        </div>
      </main>
    </div>
  );
}
