'use client';

import { useState, useEffect } from 'react';
import { CryptoData } from '@/types/crypto';
import { mockCryptoData, getTopGainers, getTopLosers } from '@/lib/mockMarkets';
import { getTopGainersFromData, getTopLosersFromData } from '@/lib/markets';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import StatCards from '@/components/StatCards';
import TopMovers from '@/components/TopMovers';

export default function Home() {
  const [cryptos, setCryptos] = useState<CryptoData[]>(mockCryptoData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMarketData() {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch('/api/markets?limit=25');
        
        if (!response.ok) {
          throw new Error('Failed to fetch market data');
        }
        
        const data = await response.json();
        setCryptos(data.coins);
      } catch (err) {
        console.error('Error fetching market data:', err);
        setError('Using cached data');
        // Keep using mock data on error
        setCryptos(mockCryptoData);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMarketData();
    
    // Refresh data every 60 seconds
    const interval = setInterval(fetchMarketData, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const gainers = getTopGainersFromData(cryptos, 5);
  const losers = getTopLosersFromData(cryptos, 5);

  return (
    <div className="min-h-screen bg-deep-space">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 page-transition">
        {/* Hero Section */}
        <Hero />

        {/* Stats Cards */}
        <StatCards 
          portfolioValue="$128,430"
          realTimeCoins={cryptos.length}
          premiumFeature="Active"
        />

        {/* Top Movers Section */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-3 mb-8">
            <h2 className="text-4xl font-bold text-white text-center">
              <span className="text-gradient">Market Movers</span>
            </h2>
            {error && (
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                {error}
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TopMovers cryptos={gainers} type="gainers" isLoading={isLoading} />
            <TopMovers cryptos={losers} type="losers" isLoading={isLoading} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="glass-strong border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-400 text-sm">
            © 2025 Krypttrac. Built for kings. Powered by premium technology.
          </p>
          <p className="text-center text-gray-500 text-xs mt-2">
            Step 1 – KOOL AF Dashboard Shell
          </p>
        </div>
      </footer>
    </div>
  );
}
