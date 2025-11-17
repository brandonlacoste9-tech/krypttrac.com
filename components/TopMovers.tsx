'use client';

import React from 'react';
import { CryptoData } from '@/types/crypto';
import { formatPrice, formatPercentage } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';
import GlassCard from './GlassCard';

interface TopMoversProps {
  cryptos: CryptoData[];
  type: 'gainers' | 'losers';
}

export default function TopMovers({ cryptos, type }: TopMoversProps) {
  const sorted = [...cryptos].sort((a, b) => {
    if (type === 'gainers') {
      return b.price_change_percentage_24h - a.price_change_percentage_24h;
    }
    return a.price_change_percentage_24h - b.price_change_percentage_24h;
  });

  const top5 = sorted.slice(0, 5);
  const isGainers = type === 'gainers';

  return (
    <GlassCard>
      <div className="flex items-center gap-2 mb-4">
        {isGainers ? (
          <TrendingUp className="text-green-400" size={24} />
        ) : (
          <TrendingDown className="text-red-400" size={24} />
        )}
        <h2 className="text-xl font-bold text-white">
          Top {isGainers ? 'Gainers' : 'Losers'} 24h
        </h2>
      </div>

      <div className="space-y-3">
        {top5.map((crypto, index) => {
          const isPositive = crypto.price_change_percentage_24h >= 0;
          return (
            <div
              key={crypto.id}
              className="flex items-center justify-between p-3 rounded-lg glass hover:glass-strong transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <span className="text-gray-500 font-semibold w-6">#{index + 1}</span>
                <div>
                  <p className="text-white font-semibold">{crypto.name}</p>
                  <p className="text-sm text-gray-400 uppercase">{crypto.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-semibold">{formatPrice(crypto.current_price)}</p>
                <p className={`text-sm font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  {formatPercentage(crypto.price_change_percentage_24h)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
