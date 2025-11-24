'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import { CryptoData } from '@/types/crypto';
import { formatPrice, formatMarketCap, formatPercentage } from '@/lib/utils';
import { TrendingUp, TrendingDown, Star } from 'lucide-react';
import GlassCard from './GlassCard';

interface CryptoCardProps {
  crypto: CryptoData;
  isWatchlisted?: boolean;
  onToggleWatchlist?: (id: string) => void;
}

const CryptoCard = memo(function CryptoCard({ crypto, isWatchlisted = false, onToggleWatchlist }: CryptoCardProps) {
  const isPositive = crypto.price_change_percentage_24h >= 0;

  return (
    <GlassCard hover className="relative">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden glass">
            <Image
              src={crypto.image}
              alt={crypto.name}
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{crypto.name}</h3>
            <p className="text-sm text-gray-400 uppercase">{crypto.symbol}</p>
          </div>
        </div>
        {onToggleWatchlist && (
          <button
            onClick={() => onToggleWatchlist(crypto.id)}
            className="p-2 rounded-lg glass hover:glass-strong transition-all duration-200"
          >
            <Star
              size={18}
              className={isWatchlisted ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}
            />
          </button>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-3xl font-bold text-white">{formatPrice(crypto.current_price)}</p>
          <div className="flex items-center gap-2 mt-1">
            {isPositive ? (
              <TrendingUp size={16} className="text-green-400" />
            ) : (
              <TrendingDown size={16} className="text-red-400" />
            )}
            <span className={`text-sm font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {formatPercentage(crypto.price_change_percentage_24h)}
            </span>
            <span className="text-sm text-gray-500">24h</span>
          </div>
        </div>

        <div className="flex justify-between text-sm pt-3 border-t border-white/10">
          <div>
            <p className="text-gray-400 mb-1">Market Cap</p>
            <p className="text-white font-semibold">{formatMarketCap(crypto.market_cap)}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 mb-1">Volume 24h</p>
            <p className="text-white font-semibold">{formatMarketCap(crypto.total_volume)}</p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
});

export default CryptoCard;
