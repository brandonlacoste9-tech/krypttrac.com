'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Card from './components/ui/Card';
import Button from './components/ui/Button';
import Sparkline from './components/charts/Sparkline';
import LoadingSkeleton from './components/ui/LoadingSkeleton';
import { useWatchlistStore } from '@/store/watchlist';
import { formatCurrency, formatPercent } from '@/lib/utils';
import { CoinListItem } from '@/lib/coingecko';
import { TrendingUp, TrendingDown, Plus, Bell, Settings } from 'lucide-react';

export default function Dashboard() {
  const { watchlist } = useWatchlistStore();
  const [watchlistCoins, setWatchlistCoins] = useState<CoinListItem[]>([]);
  const [topMovers, setTopMovers] = useState<{
    gainers: CoinListItem[];
    losers: CoinListItem[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        // Fetch all coins
        const coinsRes = await fetch('/api/coins/list?per_page=100');
        const allCoins = await coinsRes.json();
        
        // Filter watchlist coins
        const watchlistData = allCoins.filter((coin: CoinListItem) =>
          watchlist.includes(coin.id)
        );
        setWatchlistCoins(watchlistData);
        
        // Fetch top movers
        const moversRes = await fetch('/api/coins/top-movers');
        const moversData = await moversRes.json();
        setTopMovers(moversData);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, [watchlist]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LoadingSkeleton className="h-32 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <LoadingSkeleton className="h-96" />
          <LoadingSkeleton className="h-96" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <Card variant="glass-heavy" className="mb-8 hover-glow-gold">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Welcome to Krypttrac
            </h1>
            <p className="text-white/60 text-lg">
              Your premium crypto dashboard
            </p>
          </div>
          <div className="text-right">
            <p className="text-white/60 text-sm mb-1">Net Worth</p>
            <p className="text-4xl font-bold text-cyan-400">
              $125,430.50
            </p>
            <p className="text-green-400 text-sm">+12.5% (24h)</p>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 mb-8">
        <Link href="/asset/bitcoin">
          <Button variant="default" size="md">
            <Plus size={20} className="mr-2" />
            Add Coin
          </Button>
        </Link>
        <Link href="/alerts">
          <Button variant="outline" size="md">
            <Bell size={20} className="mr-2" />
            Set Alert
          </Button>
        </Link>
        <Link href="/portfolio">
          <Button variant="outline" size="md">
            <Settings size={20} className="mr-2" />
            Manage Portfolio
          </Button>
        </Link>
      </div>

      {/* Watchlist */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Watchlist
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {watchlistCoins.length === 0 ? (
            <Card className="col-span-full text-center py-12">
              <p className="text-white/60 mb-4">Your watchlist is empty</p>
              <Link href="/asset/bitcoin">
                <Button>Add Coins</Button>
              </Link>
            </Card>
          ) : (
            watchlistCoins.map((coin) => (
              <Link key={coin.id} href={`/asset/${coin.id}`}>
                <Card className="hover-glow-cyan cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h3 className="font-bold">{coin.name}</h3>
                        <p className="text-white/60 text-sm uppercase">
                          {coin.symbol}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">
                        {formatCurrency(coin.current_price)}
                      </p>
                      <p
                        className={`text-sm ${
                          coin.price_change_percentage_24h >= 0
                            ? 'text-green-400'
                            : 'text-red-400'
                        }`}
                      >
                        {formatPercent(coin.price_change_percentage_24h)}
                      </p>
                    </div>
                  </div>
                  {coin.sparkline_in_7d && (
                    <Sparkline
                      data={coin.sparkline_in_7d.price}
                      color={
                        coin.price_change_percentage_24h >= 0
                          ? '#00ffff'
                          : '#ff0055'
                      }
                    />
                  )}
                </Card>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Top Movers */}
      {topMovers && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Gainers */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center text-green-400">
              <TrendingUp className="mr-2" />
              Top Gainers
            </h2>
            <Card>
              <div className="space-y-4">
                {topMovers.gainers.map((coin, index) => (
                  <Link key={coin.id} href={`/asset/${coin.id}`}>
                    <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/5 transition-all cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <span className="text-white/40 w-6">{index + 1}</span>
                        <img
                          src={coin.image}
                          alt={coin.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="font-semibold">{coin.name}</p>
                          <p className="text-white/60 text-sm">
                            {formatCurrency(coin.current_price)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-bold">
                          {formatPercent(coin.price_change_percentage_24h)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          </div>

          {/* Top Losers */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center text-red-400">
              <TrendingDown className="mr-2" />
              Top Losers
            </h2>
            <Card>
              <div className="space-y-4">
                {topMovers.losers.map((coin, index) => (
                  <Link key={coin.id} href={`/asset/${coin.id}`}>
                    <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/5 transition-all cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <span className="text-white/40 w-6">{index + 1}</span>
                        <img
                          src={coin.image}
                          alt={coin.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="font-semibold">{coin.name}</p>
                          <p className="text-white/60 text-sm">
                            {formatCurrency(coin.current_price)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-red-400 font-bold">
                          {formatPercent(coin.price_change_percentage_24h)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
