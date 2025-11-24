'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Coin,
  fetchTopCoins,
  getTopGainers,
  getTopLosers,
  subscribeToPriceUpdates,
} from '@/lib/api/cryptoAPI';

interface UseCryptoDataReturn {
  coins: Coin[];
  gainers: Coin[];
  losers: Coin[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  lastUpdated: Date | null;
}

export function useCryptoData(limit: number = 30): UseCryptoDataReturn {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchTopCoins(limit);
      setCoins(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch crypto data');
      console.error('Crypto fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Subscribe to updates
  useEffect(() => {
    const unsubscribe = subscribeToPriceUpdates((updatedCoins) => {
      setCoins(updatedCoins);
      setLastUpdated(new Date());
    });

    return () => unsubscribe();
  }, []);

  // Derived data
  const gainers = getTopGainers(coins, 5);
  const losers = getTopLosers(coins, 5);

  return {
    coins,
    gainers,
    losers,
    loading,
    error,
    refetch: fetchData,
    lastUpdated,
  };
}
