// CoinGecko API Integration for Krypto Kings
// Free API - No key required

const BASE_URL = 'https://api.coingecko.com/api/v3';
const CACHE_KEY = 'kk-crypto-cache';
const CACHE_DURATION = 30000; // 30 seconds

// Major coins whitelist - NO shitcoins allowed
const MAJOR_COINS = [
  'bitcoin', 'ethereum', 'binancecoin', 'solana', 'ripple',
  'cardano', 'avalanche-2', 'polkadot', 'polygon', 'chainlink',
  'toncoin', 'tron', 'shiba-inu', 'litecoin', 'bitcoin-cash',
  'uniswap', 'stellar', 'cosmos', 'near', 'aptos',
  'internet-computer', 'hedera', 'filecoin', 'arbitrum', 'optimism',
  'vechain', 'the-graph', 'algorand', 'fantom', 'injective-protocol'
];

// Exclude meme/shitcoins
const BLACKLIST = [
  'dogecoin', 'pepe', 'floki', 'bonk', 'dogwifcoin', 'safemoon',
  'baby-doge-coin', 'shiba-inu', 'memecoin', 'wojak'
];

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency?: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  sparkline_in_7d?: { price: number[] };
  high_24h: number;
  low_24h: number;
  ath: number;
  ath_change_percentage: number;
}

export interface CoinDetail extends Coin {
  description: string;
  homepage: string;
  market_data: {
    current_price: { usd: number };
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_30d: number;
    market_cap: { usd: number };
    total_volume: { usd: number };
    circulating_supply: number;
    total_supply: number;
  };
}

interface CacheData {
  coins: Coin[];
  timestamp: number;
}

// Get cached data
function getCache(): CacheData | null {
  if (typeof window === 'undefined') return null;

  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (e) {
    console.warn('Failed to read cache:', e);
  }
  return null;
}

// Set cache
function setCache(coins: Coin[]): void {
  if (typeof window === 'undefined') return;

  try {
    const data: CacheData = {
      coins,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Failed to write cache:', e);
  }
}

// Check if cache is still valid
function isCacheValid(): boolean {
  const cache = getCache();
  if (!cache) return false;
  return Date.now() - cache.timestamp < CACHE_DURATION;
}

// Filter to major coins only
function filterMajorCoins(coins: Coin[]): Coin[] {
  return coins.filter(coin => {
    // Exclude blacklisted coins
    if (BLACKLIST.includes(coin.id)) return false;

    // Include if in major coins list or top 20 by market cap
    return MAJOR_COINS.includes(coin.id) || coin.market_cap_rank <= 20;
  });
}

// Format price with proper decimals
export function formatPrice(price: number): string {
  if (price >= 1000) {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  } else if (price >= 1) {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    });
  } else {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 4,
      maximumFractionDigits: 8,
    });
  }
}

// Format market cap
export function formatMarketCap(marketCap: number): string {
  if (marketCap >= 1e12) {
    return `$${(marketCap / 1e12).toFixed(2)}T`;
  } else if (marketCap >= 1e9) {
    return `$${(marketCap / 1e9).toFixed(2)}B`;
  } else if (marketCap >= 1e6) {
    return `$${(marketCap / 1e6).toFixed(2)}M`;
  }
  return `$${marketCap.toLocaleString()}`;
}

// Format percentage change
export function formatPercentChange(percent: number): string {
  const sign = percent >= 0 ? '+' : '';
  return `${sign}${percent.toFixed(2)}%`;
}

// Fetch top coins from CoinGecko
export async function fetchTopCoins(limit: number = 50): Promise<Coin[]> {
  // Check cache first
  if (isCacheValid()) {
    const cache = getCache();
    if (cache) {
      console.log('Using cached crypto data');
      return cache.coins.slice(0, limit);
    }
  }

  try {
    const response = await fetch(
      `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true&price_change_percentage=7d`,
      {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 30 }, // Next.js cache
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: Coin[] = await response.json();

    // Filter to major coins only
    const filtered = filterMajorCoins(data);

    // Cache the results
    setCache(filtered);

    console.log(`Fetched ${filtered.length} major coins from CoinGecko`);
    return filtered;
  } catch (error) {
    console.error('Failed to fetch coins:', error);

    // Try to use stale cache as fallback
    const cache = getCache();
    if (cache) {
      console.log('Using stale cache as fallback');
      return cache.coins.slice(0, limit);
    }

    throw error;
  }
}

// Fetch detailed coin info
export async function fetchCoinDetails(coinId: string): Promise<CoinDetail | null> {
  try {
    const response = await fetch(
      `${BASE_URL}/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch details for ${coinId}:`, error);
    return null;
  }
}

// Get top gainers
export function getTopGainers(coins: Coin[], limit: number = 5): Coin[] {
  return [...coins]
    .filter(c => c.price_change_percentage_24h != null)
    .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
    .slice(0, limit);
}

// Get top losers
export function getTopLosers(coins: Coin[], limit: number = 5): Coin[] {
  return [...coins]
    .filter(c => c.price_change_percentage_24h != null)
    .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
    .slice(0, limit);
}

// Calculate portfolio value
export function calculatePortfolioValue(
  holdings: { coinId: string; amount: number }[],
  coins: Coin[]
): number {
  return holdings.reduce((total, holding) => {
    const coin = coins.find(c => c.id === holding.coinId);
    if (coin) {
      return total + coin.current_price * holding.amount;
    }
    return total;
  }, 0);
}

// Subscribe to price updates with improved visibility handling
let updateInterval: NodeJS.Timeout | null = null;
let subscribers: ((coins: Coin[]) => void)[] = [];
let lastFetchTime = 0;
let visibilityCleanup: (() => void) | null = null;

export function subscribeToPriceUpdates(callback: (coins: Coin[]) => void): () => void {
  subscribers.push(callback);

  const fetchAndNotify = async () => {
    const now = Date.now();
    // Prevent multiple fetches within cache duration
    if (now - lastFetchTime < CACHE_DURATION) {
      return;
    }

    try {
      lastFetchTime = now;
      const coins = await fetchTopCoins();
      subscribers.forEach(cb => cb(coins));
    } catch (error) {
      console.error('Price update failed:', error);
    }
  };

  // Start polling if not already running
  if (!updateInterval) {
    updateInterval = setInterval(() => {
      // Only fetch if tab is active
      if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
        fetchAndNotify();
      }
    }, CACHE_DURATION);

    // Listen for visibility changes to fetch immediately when tab becomes visible
    if (typeof document !== 'undefined') {
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible' && subscribers.length > 0) {
          fetchAndNotify();
        }
      };
      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      // Store cleanup function in separate variable for type safety
      visibilityCleanup = () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }
  }

  // Return unsubscribe function
  return () => {
    subscribers = subscribers.filter(cb => cb !== callback);
    if (subscribers.length === 0 && updateInterval) {
      clearInterval(updateInterval);
      // Clean up visibility listener
      if (visibilityCleanup) {
        visibilityCleanup();
        visibilityCleanup = null;
      }
      updateInterval = null;
      lastFetchTime = 0;
    }
  };
}

// Hook for React components
export function useCryptoData() {
  // This will be used by components
  // Returns { coins, loading, error, refetch }
}
