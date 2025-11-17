'use client';

import { useEffect, useState } from 'react';
import { CryptoData } from '@/types/crypto';
import { fetchTopCryptos } from '@/lib/api';
import { formatPrice, formatMarketCap } from '@/lib/utils';
import Header from '@/components/Header';
import GlassCard from '@/components/GlassCard';
import { TrendingUp, Wallet, Plus, Trash2, PieChart } from 'lucide-react';

interface PortfolioItem {
  id: string;
  coinId: string;
  coinName: string;
  symbol: string;
  amount: number;
  buyPrice: number;
  addedAt: number;
}

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    coinName: '',
    symbol: '',
    amount: '',
    buyPrice: '',
  });

  useEffect(() => {
    loadData();
    const interval = setInterval(() => fetchTopCryptos(100).then(setCryptos), 60000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    const saved = localStorage.getItem('portfolio');
    if (saved) {
      setPortfolio(JSON.parse(saved));
    }
    const data = await fetchTopCryptos(100);
    setCryptos(data);
  };

  const addToPortfolio = () => {
    if (!formData.coinName || !formData.amount || !formData.buyPrice) return;

    const newItem: PortfolioItem = {
      id: Date.now().toString(),
      coinId: formData.coinName.toLowerCase().replace(/\s+/g, '-'),
      coinName: formData.coinName,
      symbol: formData.symbol.toUpperCase(),
      amount: parseFloat(formData.amount),
      buyPrice: parseFloat(formData.buyPrice),
      addedAt: Date.now(),
    };

    const updatedPortfolio = [...portfolio, newItem];
    setPortfolio(updatedPortfolio);
    localStorage.setItem('portfolio', JSON.stringify(updatedPortfolio));
    
    setFormData({ coinName: '', symbol: '', amount: '', buyPrice: '' });
    setShowAddForm(false);
  };

  const removeFromPortfolio = (id: string) => {
    const updatedPortfolio = portfolio.filter(item => item.id !== id);
    setPortfolio(updatedPortfolio);
    localStorage.setItem('portfolio', JSON.stringify(updatedPortfolio));
  };

  const calculatePortfolioValue = () => {
    let totalValue = 0;
    let totalCost = 0;

    portfolio.forEach(item => {
      const crypto = cryptos.find(c => c.id === item.coinId || c.symbol.toLowerCase() === item.symbol.toLowerCase());
      const currentPrice = crypto?.current_price || item.buyPrice;
      totalValue += item.amount * currentPrice;
      totalCost += item.amount * item.buyPrice;
    });

    return { totalValue, totalCost, profit: totalValue - totalCost };
  };

  const stats = calculatePortfolioValue();
  const profitPercentage = stats.totalCost > 0 ? ((stats.profit / stats.totalCost) * 100) : 0;

  return (
    <div className="min-h-screen bg-deep-space">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 page-transition">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Wallet className="text-green-400" size={32} />
              <h1 className="text-4xl font-bold text-white">Portfolio</h1>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:glass-strong hover:neon-glow transition-all duration-300 text-white font-semibold hover:scale-105"
            >
              <Plus size={20} />
              Add Position
            </button>
          </div>
          <p className="text-gray-300 text-lg">
            Track your crypto investments and monitor performance
          </p>
        </div>

        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <GlassCard>
            <div className="flex items-center gap-3 mb-2">
              <PieChart className="text-blue-400" size={24} />
              <h3 className="text-sm font-medium text-gray-400">Total Value</h3>
            </div>
            <p className="text-3xl font-bold text-white">{formatPrice(stats.totalValue)}</p>
          </GlassCard>
          <GlassCard>
            <div className="flex items-center gap-3 mb-2">
              <Wallet className="text-purple-400" size={24} />
              <h3 className="text-sm font-medium text-gray-400">Total Cost</h3>
            </div>
            <p className="text-3xl font-bold text-white">{formatPrice(stats.totalCost)}</p>
          </GlassCard>
          <GlassCard>
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className={stats.profit >= 0 ? 'text-green-400' : 'text-red-400'} size={24} />
              <h3 className="text-sm font-medium text-gray-400">Profit/Loss</h3>
            </div>
            <p className={`text-3xl font-bold ${stats.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {formatPrice(Math.abs(stats.profit))}
            </p>
            <p className={`text-sm font-semibold ${stats.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {stats.profit >= 0 ? '+' : '-'}{Math.abs(profitPercentage).toFixed(2)}%
            </p>
          </GlassCard>
        </div>

        {showAddForm && (
          <GlassCard className="mb-6">
            <h3 className="text-xl font-bold text-white mb-4">Add New Position</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Cryptocurrency Name
                </label>
                <input
                  type="text"
                  value={formData.coinName}
                  onChange={(e) => setFormData({ ...formData, coinName: e.target.value })}
                  placeholder="e.g., Bitcoin"
                  className="w-full px-4 py-2 glass rounded-lg text-white placeholder-gray-400 focus:glass-strong focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Symbol
                </label>
                <input
                  type="text"
                  value={formData.symbol}
                  onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
                  placeholder="e.g., BTC"
                  className="w-full px-4 py-2 glass rounded-lg text-white placeholder-gray-400 focus:glass-strong focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  step="0.00000001"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="0.00"
                  className="w-full px-4 py-2 glass rounded-lg text-white placeholder-gray-400 focus:glass-strong focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Buy Price (USD)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.buyPrice}
                  onChange={(e) => setFormData({ ...formData, buyPrice: e.target.value })}
                  placeholder="0.00"
                  className="w-full px-4 py-2 glass rounded-lg text-white placeholder-gray-400 focus:glass-strong focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={addToPortfolio}
                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] hover:scale-105"
              >
                Add Position
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 glass hover:glass-strong rounded-lg text-white font-semibold transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </GlassCard>
        )}

        {portfolio.length === 0 ? (
          <GlassCard>
            <div className="text-center py-12">
              <Wallet className="mx-auto mb-4 text-gray-500" size={48} />
              <h2 className="text-2xl font-bold text-white mb-2">Your portfolio is empty</h2>
              <p className="text-gray-400 mb-6">
                Start tracking your crypto investments
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center gap-2 px-6 py-3 glass rounded-lg hover:glass-strong hover:neon-glow transition-all duration-300 text-white font-semibold hover:scale-105"
              >
                <Plus size={20} />
                Add Your First Position
              </button>
            </div>
          </GlassCard>
        ) : (
          <div className="space-y-4">
            {portfolio.map((item) => {
              const crypto = cryptos.find(c => c.id === item.coinId || c.symbol.toLowerCase() === item.symbol.toLowerCase());
              const currentPrice = crypto?.current_price || item.buyPrice;
              const value = item.amount * currentPrice;
              const cost = item.amount * item.buyPrice;
              const profit = value - cost;
              const profitPercent = (profit / cost) * 100;

              return (
                <GlassCard key={item.id} hover>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-white">{item.coinName}</h3>
                        <span className="px-2 py-1 glass rounded text-sm font-medium text-gray-300">
                          {item.symbol}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400 mb-1">Amount</p>
                          <p className="text-white font-semibold">{item.amount.toFixed(8)}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 mb-1">Buy Price</p>
                          <p className="text-white font-semibold">{formatPrice(item.buyPrice)}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 mb-1">Current Price</p>
                          <p className="text-white font-semibold">{formatPrice(currentPrice)}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 mb-1">Value</p>
                          <p className="text-white font-semibold">{formatPrice(value)}</p>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 text-sm">P/L:</span>
                          <span className={`font-bold ${profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {formatPrice(Math.abs(profit))} ({profit >= 0 ? '+' : '-'}{Math.abs(profitPercent).toFixed(2)}%)
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromPortfolio(item.id)}
                      className="ml-4 p-2 glass rounded-lg hover:glass-strong hover:text-red-400 transition-all duration-200 text-gray-400"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
