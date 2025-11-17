import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export interface CoinListItem {
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
  roi: null | { times: number; currency: string; percentage: number };
  last_updated: string;
  sparkline_in_7d?: {
    price: number[];
  };
}

export interface CoinDetail {
  id: string;
  symbol: string;
  name: string;
  description: {
    en: string;
  };
  links: {
    homepage: string[];
    blockchain_site: string[];
  };
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  market_data: {
    current_price: { usd: number };
    market_cap: { usd: number };
    market_cap_rank: number;
    total_volume: { usd: number };
    high_24h: { usd: number };
    low_24h: { usd: number };
    price_change_24h: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_30d: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    circulating_supply: number;
    total_supply: number | null;
    max_supply: number | null;
    ath: { usd: number };
    atl: { usd: number };
    sparkline_7d: {
      price: number[];
    };
  };
}

export interface MarketChartData {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export class CoinGeckoAPI {
  private static instance: CoinGeckoAPI;
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 60000; // 1 minute

  private constructor() {}

  static getInstance(): CoinGeckoAPI {
    if (!CoinGeckoAPI.instance) {
      CoinGeckoAPI.instance = new CoinGeckoAPI();
    }
    return CoinGeckoAPI.instance;
  }

  private getCached(key: string): any | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }
    return null;
  }

  private setCache(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  async getMarketsList(
    vs_currency = 'usd',
    order = 'market_cap_desc',
    per_page = 100,
    page = 1,
    sparkline = true
  ): Promise<CoinListItem[]> {
    const cacheKey = `markets-${vs_currency}-${order}-${per_page}-${page}`;
    const cached = this.getCached(cacheKey);
    if (cached) return cached;

    try {
      const response = await axios.get(`${BASE_URL}/coins/markets`, {
        params: {
          vs_currency,
          order,
          per_page,
          page,
          sparkline,
        },
      });
      this.setCache(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching markets list:', error);
      throw error;
    }
  }

  async getCoinDetail(id: string): Promise<CoinDetail> {
    const cacheKey = `coin-${id}`;
    const cached = this.getCached(cacheKey);
    if (cached) return cached;

    try {
      const response = await axios.get(`${BASE_URL}/coins/${id}`, {
        params: {
          localization: false,
          tickers: false,
          market_data: true,
          community_data: false,
          developer_data: false,
          sparkline: true,
        },
      });
      this.setCache(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching coin detail:', error);
      throw error;
    }
  }

  async getMarketChart(
    id: string,
    vs_currency = 'usd',
    days: string | number = 7
  ): Promise<MarketChartData> {
    const cacheKey = `chart-${id}-${vs_currency}-${days}`;
    const cached = this.getCached(cacheKey);
    if (cached) return cached;

    try {
      const response = await axios.get(`${BASE_URL}/coins/${id}/market_chart`, {
        params: {
          vs_currency,
          days,
        },
      });
      this.setCache(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching market chart:', error);
      throw error;
    }
  }

  async getTopMovers(): Promise<{
    gainers: CoinListItem[];
    losers: CoinListItem[];
  }> {
    const cacheKey = 'top-movers';
    const cached = this.getCached(cacheKey);
    if (cached) return cached;

    try {
      const markets = await this.getMarketsList('usd', 'market_cap_desc', 100, 1, false);
      
      const sorted = [...markets].sort(
        (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
      );
      
      const gainers = sorted.slice(0, 5);
      const losers = sorted.slice(-5).reverse();
      
      const result = { gainers, losers };
      this.setCache(cacheKey, result);
      return result;
    } catch (error) {
      console.error('Error fetching top movers:', error);
      throw error;
    }
  }
}

export const coinGeckoAPI = CoinGeckoAPI.getInstance();
