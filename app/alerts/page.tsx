'use client';

import { useEffect, useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import { useAlertsStore } from '@/store/alerts';
import { formatCurrency } from '@/lib/utils';
import { CoinListItem } from '@/lib/coingecko';
import { Plus, Trash2, Bell, TrendingUp, TrendingDown, CheckCircle } from 'lucide-react';

export default function AlertsPage() {
  const { alerts, addAlert, deleteAlert } = useAlertsStore();
  const [coins, setCoins] = useState<CoinListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCoin, setSelectedCoin] = useState<CoinListItem | null>(null);
  const [alertType, setAlertType] = useState<'above' | 'below'>('above');
  const [targetPrice, setTargetPrice] = useState('');

  useEffect(() => {
    async function fetchCoins() {
      try {
        const res = await fetch('/api/coins/list?per_page=100');
        const data = await res.json();
        setCoins(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching coins:', error);
        setLoading(false);
      }
    }

    fetchCoins();
  }, []);

  const handleCreateAlert = () => {
    if (selectedCoin && targetPrice) {
      addAlert({
        coinId: selectedCoin.id,
        coinName: selectedCoin.name,
        coinSymbol: selectedCoin.symbol,
        type: alertType,
        targetPrice: parseFloat(targetPrice),
      });
      setShowModal(false);
      setSelectedCoin(null);
      setTargetPrice('');
      setSearchQuery('');
    }
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeAlerts = alerts.filter((alert) => !alert.triggered);
  const triggeredAlerts = alerts.filter((alert) => alert.triggered);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LoadingSkeleton className="h-32 mb-8" />
        <LoadingSkeleton className="h-96" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <Card variant="glass-heavy" className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Price Alerts
        </h1>
        <p className="text-white/60 mt-2">
          Get notified when your favorite coins reach your target price
        </p>
      </Card>

      {/* Create Alert Button */}
      <div className="mb-6">
        <Button onClick={() => setShowModal(true)}>
          <Plus size={20} className="mr-2" />
          Create Alert
        </Button>
      </div>

      {/* Active Alerts */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Bell className="mr-2 text-cyan-400" />
          Active Alerts
        </h2>
        
        {activeAlerts.length === 0 ? (
          <Card className="text-center py-12">
            <Bell size={48} className="mx-auto mb-4 text-white/40" />
            <p className="text-white/60 mb-4">No active alerts</p>
            <Button onClick={() => setShowModal(true)}>
              <Plus size={20} className="mr-2" />
              Create Your First Alert
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeAlerts.map((alert) => {
              const coin = coins.find((c) => c.id === alert.coinId);
              const currentPrice = coin?.current_price || 0;
              const percentDiff = currentPrice > 0
                ? ((alert.targetPrice - currentPrice) / currentPrice) * 100
                : 0;

              return (
                <Card key={alert.id} className="hover-glow-cyan">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {coin && (
                        <img
                          src={coin.image}
                          alt={alert.coinName}
                          className="w-10 h-10 rounded-full"
                        />
                      )}
                      <div>
                        <h3 className="font-bold">{alert.coinName}</h3>
                        <p className="text-white/60 text-sm uppercase">
                          {alert.coinSymbol}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteAlert(alert.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">Alert Type</span>
                      <span className="flex items-center font-semibold">
                        {alert.type === 'above' ? (
                          <>
                            <TrendingUp size={16} className="mr-1 text-green-400" />
                            Above
                          </>
                        ) : (
                          <>
                            <TrendingDown size={16} className="mr-1 text-red-400" />
                            Below
                          </>
                        )}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">Target Price</span>
                      <span className="font-bold">
                        {formatCurrency(alert.targetPrice)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">Current Price</span>
                      <span className="font-bold">
                        {formatCurrency(currentPrice)}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-white/10">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/60">Distance</span>
                        <span className={`font-bold ${percentDiff >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {percentDiff >= 0 ? '+' : ''}
                          {percentDiff.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Triggered Alerts */}
      {triggeredAlerts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <CheckCircle className="mr-2 text-green-400" />
            Triggered Alerts
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {triggeredAlerts.map((alert) => {
              const coin = coins.find((c) => c.id === alert.coinId);

              return (
                <Card key={alert.id} className="opacity-60">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {coin && (
                        <img
                          src={coin.image}
                          alt={alert.coinName}
                          className="w-10 h-10 rounded-full"
                        />
                      )}
                      <div>
                        <h3 className="font-bold">{alert.coinName}</h3>
                        <p className="text-white/60 text-sm uppercase">
                          {alert.coinSymbol}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteAlert(alert.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>

                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle size={16} className="text-green-400" />
                    <span className="text-green-400 text-sm font-semibold">
                      Alert Triggered!
                    </span>
                  </div>

                  <div className="text-sm text-white/60">
                    Target: {formatCurrency(alert.targetPrice)}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Create Alert Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <Card variant="glass-heavy" className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-6">Create Alert</h3>

            {!selectedCoin ? (
              <>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search coin..."
                  className="w-full px-4 py-3 rounded-2xl glass text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 mb-4"
                />

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredCoins.slice(0, 20).map((coin) => (
                    <div
                      key={coin.id}
                      onClick={() => setSelectedCoin(coin)}
                      className="flex items-center space-x-3 p-3 rounded-2xl hover:bg-white/5 cursor-pointer transition-all"
                    >
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{coin.name}</p>
                        <p className="text-white/60 text-sm uppercase">{coin.symbol}</p>
                      </div>
                      <p className="font-bold">{formatCurrency(coin.current_price)}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-3 mb-6 p-4 rounded-2xl glass">
                  <img
                    src={selectedCoin.image}
                    alt={selectedCoin.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <p className="text-xl font-bold">{selectedCoin.name}</p>
                    <p className="text-white/60 uppercase">{selectedCoin.symbol}</p>
                    <p className="text-sm text-white/60">
                      Current: {formatCurrency(selectedCoin.current_price)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedCoin(null)}
                  >
                    Change
                  </Button>
                </div>

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
                      value={targetPrice}
                      onChange={(e) => setTargetPrice(e.target.value)}
                      placeholder="Enter target price..."
                      className="w-full px-4 py-3 rounded-2xl glass text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setShowModal(false);
                      setSelectedCoin(null);
                      setTargetPrice('');
                      setSearchQuery('');
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={handleCreateAlert}
                    disabled={!targetPrice}
                  >
                    Create Alert
                  </Button>
                </div>
              </>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
