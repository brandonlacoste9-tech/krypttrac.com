'use client';

import { useEffect, useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import { usePortfolioStore, Position } from '@/store/portfolio';
import { formatCurrency, formatPercent } from '@/lib/utils';
import { CoinListItem } from '@/lib/coingecko';
import { Plus, Trash2, Edit } from 'lucide-react';

export default function PortfolioPage() {
  const { positions, addPosition, deletePosition, getTotalInvested } = usePortfolioStore();
  const [coins, setCoins] = useState<CoinListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCoin, setSelectedCoin] = useState<CoinListItem | null>(null);
  const [amount, setAmount] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');

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

  const totalInvested = getTotalInvested();
  
  const currentValue = positions.reduce((total, pos) => {
    const coin = coins.find((c) => c.id === pos.coinId);
    return total + (coin ? pos.amount * coin.current_price : 0);
  }, 0);

  const profitLoss = currentValue - totalInvested;
  const profitLossPercent = totalInvested > 0 ? (profitLoss / totalInvested) * 100 : 0;

  const handleAddPosition = () => {
    if (selectedCoin && amount && purchasePrice) {
      addPosition({
        coinId: selectedCoin.id,
        coinName: selectedCoin.name,
        coinSymbol: selectedCoin.symbol,
        amount: parseFloat(amount),
        purchasePrice: parseFloat(purchasePrice),
        purchaseDate: new Date().toISOString(),
      });
      setShowModal(false);
      setSelectedCoin(null);
      setAmount('');
      setPurchasePrice('');
      setSearchQuery('');
    }
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      {/* Portfolio Summary */}
      <Card variant="glass-heavy" className="mb-8">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Portfolio
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-white/60 text-sm mb-1">Total Invested</p>
            <p className="text-3xl font-bold">{formatCurrency(totalInvested)}</p>
          </div>
          <div>
            <p className="text-white/60 text-sm mb-1">Current Value</p>
            <p className="text-3xl font-bold">{formatCurrency(currentValue)}</p>
          </div>
          <div>
            <p className="text-white/60 text-sm mb-1">Profit/Loss</p>
            <div>
              <p className={`text-3xl font-bold ${profitLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {formatCurrency(profitLoss)}
              </p>
              <p className={`text-sm ${profitLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {formatPercent(profitLossPercent)}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Add Position Button */}
      <div className="mb-6">
        <Button onClick={() => setShowModal(true)}>
          <Plus size={20} className="mr-2" />
          Add Position
        </Button>
      </div>

      {/* Positions List */}
      {positions.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-white/60 mb-4">No positions yet</p>
          <Button onClick={() => setShowModal(true)}>
            <Plus size={20} className="mr-2" />
            Add Your First Position
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {positions.map((position) => {
            const coin = coins.find((c) => c.id === position.coinId);
            const currentPrice = coin?.current_price || 0;
            const positionValue = position.amount * currentPrice;
            const positionCost = position.amount * position.purchasePrice;
            const positionPL = positionValue - positionCost;
            const positionPLPercent = positionCost > 0 ? (positionPL / positionCost) * 100 : 0;

            return (
              <Card key={position.id} className="hover-glow-cyan">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {coin && (
                      <img
                        src={coin.image}
                        alt={position.coinName}
                        className="w-12 h-12 rounded-full"
                      />
                    )}
                    <div>
                      <h3 className="text-xl font-bold">{position.coinName}</h3>
                      <p className="text-white/60 uppercase">{position.coinSymbol}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-8">
                    <div>
                      <p className="text-white/60 text-sm">Amount</p>
                      <p className="font-bold">{position.amount}</p>
                    </div>
                    
                    <div>
                      <p className="text-white/60 text-sm">Avg Buy Price</p>
                      <p className="font-bold">{formatCurrency(position.purchasePrice)}</p>
                    </div>
                    
                    <div>
                      <p className="text-white/60 text-sm">Current Price</p>
                      <p className="font-bold">{formatCurrency(currentPrice)}</p>
                    </div>
                    
                    <div>
                      <p className="text-white/60 text-sm">Value</p>
                      <p className="font-bold">{formatCurrency(positionValue)}</p>
                    </div>
                    
                    <div>
                      <p className="text-white/60 text-sm">P/L</p>
                      <p className={`font-bold ${positionPL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {formatCurrency(positionPL)}
                      </p>
                      <p className={`text-sm ${positionPL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {formatPercent(positionPLPercent)}
                      </p>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deletePosition(position.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Add Position Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <Card variant="glass-heavy" className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-6">Add Position</h3>

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
                      onClick={() => {
                        setSelectedCoin(coin);
                        setPurchasePrice(coin.current_price.toString());
                      }}
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
                    <label className="block text-white/60 text-sm mb-2">Amount</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter amount..."
                      className="w-full px-4 py-3 rounded-2xl glass text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-white/60 text-sm mb-2">Purchase Price</label>
                    <input
                      type="number"
                      value={purchasePrice}
                      onChange={(e) => setPurchasePrice(e.target.value)}
                      placeholder="Enter purchase price..."
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
                      setAmount('');
                      setPurchasePrice('');
                      setSearchQuery('');
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={handleAddPosition}
                    disabled={!amount || !purchasePrice}
                  >
                    Add Position
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
