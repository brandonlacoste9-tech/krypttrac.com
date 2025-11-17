import { CryptoData } from '@/types/crypto';
import { mockCryptoData } from './mockMarkets';

/**
 * CoinGecko API client for fetching real-time crypto market data
 * Falls back to mock data if API fails
 */

// Use env var or default to CoinGecko API
const MARKET_API_BASE = process.env.NEXT_PUBLIC_MARKET_API_BASE || 'https://api.coingecko.com/api/v3';

export interface MarketDataResponse {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  last_updated: string;
  sparkline_in_7d?: {
    price: number[];
  };
}

/**
 * Fetch top cryptocurrencies by market cap
 * @param limit Number of coins to fetch (default: 25)
 * @returns Array of CryptoData or falls back to mock data
 */
export async function fetchTopCoins(limit: number = 25): Promise<CryptoData[]> {
  try {
    const response = await fetch(
      `${MARKET_API_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true&price_change_percentage=24h`,
      {
        headers: {
          'Accept': 'application/json',
        },
        // Don't cache on the client side, let the API route handle caching
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data: MarketDataResponse[] = await response.json();
    
    // Normalize the response to match CryptoData type
    return data.map(coin => ({
      id: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      image: coin.image,
      current_price: coin.current_price,
      market_cap: coin.market_cap,
      market_cap_rank: coin.market_cap_rank,
      fully_diluted_valuation: coin.fully_diluted_valuation,
      total_volume: coin.total_volume,
      high_24h: coin.high_24h,
      low_24h: coin.low_24h,
      price_change_24h: coin.price_change_24h,
      price_change_percentage_24h: coin.price_change_percentage_24h,
      market_cap_change_24h: coin.market_cap_change_24h,
      market_cap_change_percentage_24h: coin.market_cap_change_percentage_24h,
      circulating_supply: coin.circulating_supply,
      total_supply: coin.total_supply,
      max_supply: coin.max_supply,
      ath: coin.ath,
      ath_change_percentage: coin.ath_change_percentage,
      ath_date: coin.ath_date,
      atl: coin.atl,
      atl_change_percentage: coin.atl_change_percentage,
      atl_date: coin.atl_date,
      last_updated: coin.last_updated,
      sparkline_in_7d: coin.sparkline_in_7d,
    }));
  } catch (error) {
    console.error('Error fetching market data, falling back to mock data:', error);
    // Gracefully fall back to mock data
    return mockCryptoData.slice(0, limit);
  }
}

/**
 * Get top gainers from market data
 * @param coins Array of crypto data
 * @param count Number of top gainers to return (default: 5)
 * @returns Array of top gainers
 */
export function getTopGainersFromData(coins: CryptoData[], count: number = 5): CryptoData[] {
  return [...coins]
    .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
    .slice(0, count);
}

/**
 * Get top losers from market data
 * @param coins Array of crypto data
 * @param count Number of top losers to return (default: 5)
 * @returns Array of top losers
 */
export function getTopLosersFromData(coins: CryptoData[], count: number = 5): CryptoData[] {
  return [...coins]
    .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
    .slice(0, count);
}
