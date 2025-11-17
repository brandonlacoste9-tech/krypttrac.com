'use client';

import { mockCryptoData, getTopGainers, getTopLosers } from '@/lib/mockMarkets';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import StatCards from '@/components/StatCards';
import TopMovers from '@/components/TopMovers';

export default function Home() {
  // Use mock data for now
  const cryptos = mockCryptoData;
  const gainers = getTopGainers(5);
  const losers = getTopLosers(5);

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
          <h2 className="text-4xl font-bold text-white mb-8 text-center">
            <span className="text-gradient">Market Movers</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TopMovers cryptos={gainers} type="gainers" />
            <TopMovers cryptos={losers} type="losers" />
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
