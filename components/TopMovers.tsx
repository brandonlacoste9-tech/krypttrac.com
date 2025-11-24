'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import { Coin, formatPrice } from '@/lib/api/cryptoAPI';
import { formatPercentWithWL } from '@/lib/lingo/kingsLingo';
import { TrendingUp, TrendingDown } from 'lucide-react';
import GlassCard from './GlassCard';
import { useThemeStore } from '@/lib/themeStore';

interface TopMoversProps {
  cryptos: Coin[];
  type: 'gainers' | 'losers';
}

const TopMovers = memo(function TopMovers({ cryptos, type }: TopMoversProps) {
  const { theme } = useThemeStore();
  
  // Assume data is already sorted - just take top 5
  // Parent should pass pre-sorted data to avoid redundant sorting
  const top5 = cryptos.slice(0, 5);
  const isGainers = type === 'gainers';

  return (
    <GlassCard className="hover:scale-[1.01] transition-transform duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div 
          className="p-2 rounded-lg"
          style={{ background: isGainers ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)' }}
        >
          {isGainers ? (
            <TrendingUp className="text-green-400 drop-shadow-lg" size={28} />
          ) : (
            <TrendingDown className="text-red-400 drop-shadow-lg" size={28} />
          )}
        </div>
        <h2 className="text-2xl font-bold text-white">
          {isGainers ? "Moonin' Right Now 🌙" : "Takin' L's Today"}
        </h2>
      </div>

      <div className="space-y-3">
        {top5.map((crypto, index) => {
          const isPositive = crypto.price_change_percentage_24h >= 0;
          return (
            <div
              key={crypto.id}
              className="flex items-center justify-between p-4 rounded-xl glass hover:glass-strong transition-all duration-200 group"
            >
              <div className="flex items-center gap-3">
                <span className="text-gray-500 font-bold text-lg w-6">#{index + 1}</span>
                {crypto.image && (
                  <Image
                    src={crypto.image}
                    alt={crypto.name}
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                )}
                <div>
                  <p
                    className="text-white font-semibold text-lg transition-colors"
                    style={{ '--hover-color': theme.primary } as React.CSSProperties}
                  >
                    {crypto.name}
                  </p>
                  <p className="text-sm text-gray-400 uppercase tracking-wider">{crypto.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-semibold text-lg">{formatPrice(crypto.current_price)}</p>
                <p className={`text-sm font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  {formatPercentWithWL(crypto.price_change_percentage_24h)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
});

export default TopMovers;
