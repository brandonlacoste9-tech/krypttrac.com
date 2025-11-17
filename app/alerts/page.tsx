'use client';

import { useEffect, useState } from 'react';
import { PriceAlert } from '@/types/crypto';
import Header from '@/components/Header';
import GlassCard from '@/components/GlassCard';
import { Bell, Plus, Trash2, TrendingUp, TrendingDown } from 'lucide-react';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    coinName: '',
    targetPrice: '',
    condition: 'above' as 'above' | 'below',
  });

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = () => {
    const saved = localStorage.getItem('priceAlerts');
    if (saved) {
      setAlerts(JSON.parse(saved));
    }
  };

  const addAlert = () => {
    if (!formData.coinName || !formData.targetPrice) return;

    const newAlert: PriceAlert = {
      id: Date.now().toString(),
      coinId: formData.coinName.toLowerCase().replace(/\s+/g, '-'),
      coinName: formData.coinName,
      targetPrice: parseFloat(formData.targetPrice),
      condition: formData.condition,
      createdAt: Date.now(),
    };

    const updatedAlerts = [...alerts, newAlert];
    setAlerts(updatedAlerts);
    localStorage.setItem('priceAlerts', JSON.stringify(updatedAlerts));
    
    setFormData({ coinName: '', targetPrice: '', condition: 'above' });
    setShowAddForm(false);
  };

  const deleteAlert = (id: string) => {
    const updatedAlerts = alerts.filter(alert => alert.id !== id);
    setAlerts(updatedAlerts);
    localStorage.setItem('priceAlerts', JSON.stringify(updatedAlerts));
  };

  return (
    <div className="min-h-screen bg-deep-space">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 page-transition">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Bell className="text-purple-400" size={32} />
              <h1 className="text-4xl font-bold text-white">Price Alerts</h1>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:glass-strong hover:neon-glow transition-all duration-300 text-white font-semibold hover:scale-105"
            >
              <Plus size={20} />
              Add Alert
            </button>
          </div>
          <p className="text-gray-300 text-lg">
            Get notified when cryptocurrencies reach your target prices
          </p>
        </div>

        {showAddForm && (
          <GlassCard className="mb-6">
            <h3 className="text-xl font-bold text-white mb-4">Create New Alert</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Cryptocurrency Name
                </label>
                <input
                  type="text"
                  value={formData.coinName}
                  onChange={(e) => setFormData({ ...formData, coinName: e.target.value })}
                  placeholder="e.g., Bitcoin, Ethereum"
                  className="w-full px-4 py-2 glass rounded-lg text-white placeholder-gray-400 focus:glass-strong focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Target Price (USD)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.targetPrice}
                  onChange={(e) => setFormData({ ...formData, targetPrice: e.target.value })}
                  placeholder="0.00"
                  className="w-full px-4 py-2 glass rounded-lg text-white placeholder-gray-400 focus:glass-strong focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Alert When Price Goes
                </label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setFormData({ ...formData, condition: 'above' })}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      formData.condition === 'above'
                        ? 'glass-strong ring-2 ring-green-500/50'
                        : 'glass hover:glass-strong'
                    }`}
                  >
                    <TrendingUp className="text-green-400" size={20} />
                    <span className="text-white font-medium">Above</span>
                  </button>
                  <button
                    onClick={() => setFormData({ ...formData, condition: 'below' })}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      formData.condition === 'below'
                        ? 'glass-strong ring-2 ring-red-500/50'
                        : 'glass hover:glass-strong'
                    }`}
                  >
                    <TrendingDown className="text-red-400" size={20} />
                    <span className="text-white font-medium">Below</span>
                  </button>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={addAlert}
                  className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:scale-105"
                >
                  Create Alert
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 glass hover:glass-strong rounded-lg text-white font-semibold transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </GlassCard>
        )}

        {alerts.length === 0 ? (
          <GlassCard>
            <div className="text-center py-12">
              <Bell className="mx-auto mb-4 text-gray-500" size={48} />
              <h2 className="text-2xl font-bold text-white mb-2">No alerts set</h2>
              <p className="text-gray-400 mb-6">
                Create your first price alert to get notified
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center gap-2 px-6 py-3 glass rounded-lg hover:glass-strong hover:neon-glow transition-all duration-300 text-white font-semibold hover:scale-105"
              >
                <Plus size={20} />
                Add Your First Alert
              </button>
            </div>
          </GlassCard>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert) => (
              <GlassCard key={alert.id} hover>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {alert.condition === 'above' ? (
                      <TrendingUp className="text-green-400" size={24} />
                    ) : (
                      <TrendingDown className="text-red-400" size={24} />
                    )}
                    <div>
                      <h3 className="text-lg font-bold text-white">{alert.coinName}</h3>
                      <p className="text-sm text-gray-400">
                        Alert when price goes{' '}
                        <span className={alert.condition === 'above' ? 'text-green-400' : 'text-red-400'}>
                          {alert.condition}
                        </span>{' '}
                        ${alert.targetPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteAlert(alert.id)}
                    className="p-2 glass rounded-lg hover:glass-strong hover:text-red-400 transition-all duration-200 text-gray-400"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
