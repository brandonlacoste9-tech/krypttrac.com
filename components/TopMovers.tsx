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
    <GlassCard className="hover:scale-[1.01] transition-transform duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-lg ${isGainers ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
          {isGainers ? (
            <TrendingUp className="text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]" size={28} />
          ) : (
            <TrendingDown className="text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]" size={28} />
          )}
        </div>
        <h2 className="text-2xl font-bold text-white">
          Top {isGainers ? 'Gainers' : 'Losers'} 24h
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
                <span className="text-gray-500 font-bold text-lg w-8">#{index + 1}</span>
                <div>
                  <p className="text-white font-semibold text-lg group-hover:text-purple-300 transition-colors">{crypto.name}</p>
                  <p className="text-sm text-gray-400 uppercase tracking-wider">{crypto.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-semibold text-lg">{formatPrice(crypto.current_price)}</p>
                <p className={`text-sm font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
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
