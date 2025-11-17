'use client';

import { useEffect, useState } from 'react';
import { CryptoData } from '@/types/crypto';
import { fetchTopCryptos, searchCryptos } from '@/lib/api';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import CryptoCard from '@/components/CryptoCard';
import TopMovers from '@/components/TopMovers';
import GlassCard from '@/components/GlassCard';
import { TrendingUp, Zap, Shield } from 'lucide-react';

export default function Home() {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [filteredCryptos, setFilteredCryptos] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadCryptos();
    loadWatchlist();
    
    // Auto-refresh every 60 seconds
    const interval = setInterval(loadCryptos, 60000);
    return () => clearInterval(interval);
  }, []);

  const loadCryptos = async () => {
    setLoading(true);
    const data = await fetchTopCryptos(50);
    setCryptos(data);
    setFilteredCryptos(data);
    setLoading(false);
  };

  const loadWatchlist = () => {
    const saved = localStorage.getItem('watchlist');
    if (saved) {
      setWatchlist(new Set(JSON.parse(saved)));
    }
  };

  const handleSearch = async (query: string) => {
    if (!query) {
      setFilteredCryptos(cryptos);
      return;
    }
    const results = await searchCryptos(query);
    setFilteredCryptos(results);
  };

  const toggleWatchlist = (id: string) => {
    const newWatchlist = new Set(watchlist);
    if (newWatchlist.has(id)) {
      newWatchlist.delete(id);
    } else {
      newWatchlist.add(id);
    }
    setWatchlist(newWatchlist);
    localStorage.setItem('watchlist', JSON.stringify([...newWatchlist]));
  };

  if (loading && cryptos.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
              <p className="text-white text-xl">Loading crypto data...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Welcome to <span className="text-gradient">Krypttrac</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Your premium crypto dashboard. Built for kings who demand speed, clarity, and style.
          </p>
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <GlassCard className="text-center">
            <TrendingUp className="mx-auto mb-3 text-green-400" size={32} />
            <h3 className="text-2xl font-bold text-white mb-1">
              {cryptos.filter(c => c.price_change_percentage_24h > 0).length}
            </h3>
            <p className="text-gray-400">Coins Up 24h</p>
          </GlassCard>
          <GlassCard className="text-center">
            <Zap className="mx-auto mb-3 text-yellow-400" size={32} />
            <h3 className="text-2xl font-bold text-white mb-1">Real-Time</h3>
            <p className="text-gray-400">Live Price Updates</p>
          </GlassCard>
          <GlassCard className="text-center">
            <Shield className="mx-auto mb-3 text-purple-400" size={32} />
            <h3 className="text-2xl font-bold text-white mb-1">Premium</h3>
            <p className="text-gray-400">King-Level Quality</p>
          </GlassCard>
        </div>

        {/* Top Movers */}
        {cryptos.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            <TopMovers cryptos={cryptos} type="gainers" />
            <TopMovers cryptos={cryptos} type="losers" />
          </div>
        )}

        {/* All Cryptos Grid */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-6">All Cryptocurrencies</h2>
          {filteredCryptos.length === 0 ? (
            <GlassCard>
              <p className="text-center text-gray-400 py-8">No cryptocurrencies found</p>
            </GlassCard>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCryptos.map((crypto) => (
                <CryptoCard
                  key={crypto.id}
                  crypto={crypto}
                  isWatchlisted={watchlist.has(crypto.id)}
                  onToggleWatchlist={toggleWatchlist}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="glass-strong border-t border-white/10 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-400">
            © 2025 Krypttrac. Built for kings. Powered by real-time data.
          </p>
        </div>
      </footer>
    </div>
  );
}
