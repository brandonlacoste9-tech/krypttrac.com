'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Card from '@/app/components/ui/Card';
import Button from '@/app/components/ui/Button';
import PriceChart from '@/app/components/charts/PriceChart';
import LoadingSkeleton from '@/app/components/ui/LoadingSkeleton';
import { useWatchlistStore } from '@/store/watchlist';
import { useAlertsStore } from '@/store/alerts';
import { formatCurrency, formatPercent, formatNumber } from '@/lib/utils';
import { CoinDetail, MarketChartData } from '@/lib/coingecko';
import { Star, Bell, TrendingUp, TrendingDown } from 'lucide-react';

export default function AssetPage() {
  const params = useParams();
  const coinId = params.id as string;
  
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlistStore();
  const { addAlert } = useAlertsStore();
  
  const [coin, setCoin] = useState<CoinDetail | null>(null);
  const [chartData, setChartData] = useState<MarketChartData | null>(null);
  const [timeframe, setTimeframe] = useState<string>('7');
  const [loading, setLoading] = useState(true);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertType, setAlertType] = useState<'above' | 'below'>('above');
  const [alertPrice, setAlertPrice] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        const [coinRes, chartRes] = await Promise.all([
          fetch(`/api/coins/${coinId}`),
          fetch(`/api/coins/${coinId}/chart?days=${timeframe}`)
        ]);
        
        const coinData = await coinRes.json();
        const chartDataRes = await chartRes.json();
        
        setCoin(coinData);
        setChartData(chartDataRes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching asset data:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, [coinId, timeframe]);

  const handleWatchlist = () => {
    if (isInWatchlist(coinId)) {
      removeFromWatchlist(coinId);
    } else {
      addToWatchlist(coinId);
    }
  };

  const handleCreateAlert = () => {
    if (coin && alertPrice) {
      addAlert({
        coinId: coin.id,
        coinName: coin.name,
        coinSymbol: coin.symbol,
        type: alertType,
        targetPrice: parseFloat(alertPrice),
      });
      setShowAlertModal(false);
      setAlertPrice('');
    }
  };

  if (loading || !coin) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LoadingSkeleton className="h-32 mb-8" />
        <LoadingSkeleton className="h-96 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <LoadingSkeleton className="h-48" count={3} />
        </div>
      </div>
    );
  }

  const priceChange24h = coin.market_data.price_change_percentage_24h;
  const isPositive = priceChange24h >= 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <Card variant="glass-heavy" className="mb-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={coin.image.large}
              alt={coin.name}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h1 className="text-4xl font-bold">{coin.name}</h1>
              <p className="text-white/60 text-lg uppercase">{coin.symbol}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant={isInWatchlist(coinId) ? 'default' : 'outline'}
              onClick={handleWatchlist}
            >
              <Star
                size={20}
                className="mr-2"
                fill={isInWatchlist(coinId) ? 'currentColor' : 'none'}
              />
              {isInWatchlist(coinId) ? 'In Watchlist' : 'Add to Watchlist'}
            </Button>
            <Button variant="outline" onClick={() => setShowAlertModal(true)}>
              <Bell size={20} className="mr-2" />
              Set Alert
            </Button>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-white/60 text-sm mb-1">Current Price</p>
            <p className="text-3xl font-bold">
              {formatCurrency(coin.market_data.current_price.usd)}
            </p>
          </div>
          <div>
            <p className="text-white/60 text-sm mb-1">24h Change</p>
            <p className={`text-3xl font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {formatPercent(priceChange24h)}
            </p>
          </div>
          <div>
            <p className="text-white/60 text-sm mb-1">Market Cap Rank</p>
            <p className="text-3xl font-bold">#{coin.market_data.market_cap_rank}</p>
          </div>
        </div>
      </Card>

      {/* Chart */}
      <Card className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Price Chart</h2>
          <div className="flex space-x-2">
            {['1', '7', '30', '365'].map((days) => (
              <Button
                key={days}
                variant={timeframe === days ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setTimeframe(days)}
              >
                {days === '1' ? '24h' : days === '7' ? '7d' : days === '30' ? '30d' : '1y'}
              </Button>
            ))}
          </div>
        </div>
        {chartData && (
          <PriceChart
            data={chartData.prices}
            color={isPositive ? '#00ffff' : '#ff0055'}
          />
        )}
      </Card>

      {/* Market Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover-glow-cyan">
          <p className="text-white/60 text-sm mb-2">Market Cap</p>
          <p className="text-2xl font-bold">
            {formatCurrency(coin.market_data.market_cap.usd, 0)}
          </p>
        </Card>
        
        <Card className="hover-glow-cyan">
          <p className="text-white/60 text-sm mb-2">24h Volume</p>
          <p className="text-2xl font-bold">
            {formatCurrency(coin.market_data.total_volume.usd, 0)}
          </p>
        </Card>
        
        <Card className="hover-glow-cyan">
          <p className="text-white/60 text-sm mb-2">Circulating Supply</p>
          <p className="text-2xl font-bold">
            {formatNumber(coin.market_data.circulating_supply)} {coin.symbol.toUpperCase()}
          </p>
        </Card>
        
        <Card className="hover-glow-gold">
          <p className="text-white/60 text-sm mb-2">All-Time High</p>
          <p className="text-2xl font-bold">
            {formatCurrency(coin.market_data.ath.usd)}
          </p>
        </Card>
        
        <Card className="hover-glow-gold">
          <p className="text-white/60 text-sm mb-2">All-Time Low</p>
          <p className="text-2xl font-bold">
            {formatCurrency(coin.market_data.atl.usd)}
          </p>
        </Card>
        
        <Card className="hover-glow-gold">
          <p className="text-white/60 text-sm mb-2">
            {coin.market_data.total_supply ? 'Total Supply' : 'Max Supply'}
          </p>
          <p className="text-2xl font-bold">
            {coin.market_data.total_supply
              ? formatNumber(coin.market_data.total_supply)
              : coin.market_data.max_supply
              ? formatNumber(coin.market_data.max_supply)
              : 'Unlimited'}{' '}
            {coin.market_data.total_supply || coin.market_data.max_supply
              ? coin.symbol.toUpperCase()
              : ''}
          </p>
        </Card>
      </div>

      {/* Alert Modal */}
      {showAlertModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <Card variant="glass-heavy" className="max-w-md w-full">
            <h3 className="text-2xl font-bold mb-6">Create Price Alert</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-white/60 text-sm mb-2">Alert Type</label>
                <div className="flex space-x-2">
                  <Button
                    variant={alertType === 'above' ? 'default' : 'outline'}
                    className="flex-1"
                    onClick={() => setAlertType('above')}
                  >
                    <TrendingUp size={16} className="mr-2" />
                    Above
                  </Button>
                  <Button
                    variant={alertType === 'below' ? 'default' : 'outline'}
                    className="flex-1"
                    onClick={() => setAlertType('below')}
                  >
                    <TrendingDown size={16} className="mr-2" />
                    Below
                  </Button>
                </div>
              </div>
              
              <div>
                <label className="block text-white/60 text-sm mb-2">Target Price</label>
                <input
                  type="number"
                  value={alertPrice}
                  onChange={(e) => setAlertPrice(e.target.value)}
                  placeholder="Enter price..."
                  className="w-full px-4 py-3 rounded-2xl glass text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>
            </div>
            
            <div className="flex space-x-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowAlertModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={handleCreateAlert}
                disabled={!alertPrice}
              >
                Create Alert
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
