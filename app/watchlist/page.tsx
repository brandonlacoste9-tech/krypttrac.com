'use client';

import { useEffect, useState } from 'react';
import { CryptoData } from '@/types/crypto';
import { fetchTopCryptos } from '@/lib/api';
import Header from '@/components/Header';
import CryptoCard from '@/components/CryptoCard';
import GlassCard from '@/components/GlassCard';
import { Star } from 'lucide-react';

export default function WatchlistPage() {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 60000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    const saved = localStorage.getItem('watchlist');
    if (saved) {
      const watchlistIds = JSON.parse(saved);
      setWatchlist(new Set(watchlistIds));
      
      const data = await fetchTopCryptos(100);
      const watchlistCryptos = data.filter(crypto => watchlistIds.includes(crypto.id));
      setCryptos(watchlistCryptos);
    }
    setLoading(false);
  };

  const toggleWatchlist = (id: string) => {
    const newWatchlist = new Set(watchlist);
    newWatchlist.delete(id);
    setWatchlist(newWatchlist);
    localStorage.setItem('watchlist', JSON.stringify([...newWatchlist]));
    setCryptos(cryptos.filter(crypto => crypto.id !== id));
  };

  return (
    <div className="min-h-screen bg-deep-space">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 page-transition">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Star className="text-yellow-400" size={32} />
            <h1 className="text-4xl font-bold text-white">Your Watchlist</h1>
          </div>
          <p className="text-gray-300 text-lg">
            Keep track of your favorite cryptocurrencies in one place
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center min-h-[40vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
              <p className="text-white text-xl">Loading watchlist...</p>
            </div>
          </div>
        ) : cryptos.length === 0 ? (
          <GlassCard>
            <div className="text-center py-12">
              <Star className="mx-auto mb-4 text-gray-500" size={48} />
              <h2 className="text-2xl font-bold text-white mb-2">Your watchlist is empty</h2>
              <p className="text-gray-400 mb-6">
                Start adding cryptocurrencies to track them here
              </p>
              <a
                href="/"
                className="inline-block px-6 py-3 glass rounded-lg hover:glass-strong hover:neon-glow transition-all duration-300 text-white font-semibold hover:scale-105"
              >
                Browse Cryptocurrencies
              </a>
            </div>
          </GlassCard>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cryptos.map((crypto) => (
              <CryptoCard
                key={crypto.id}
                crypto={crypto}
                isWatchlisted={true}
                onToggleWatchlist={toggleWatchlist}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
