import { CryptoData } from '@/types/crypto';

const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3';

export async function fetchTopCryptos(limit: number = 50): Promise<CryptoData[]> {
  try {
    const response = await fetch(
      `${COINGECKO_API_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`,
      { next: { revalidate: 60 } } // Cache for 60 seconds
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch crypto data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    return [];
  }
}

export async function searchCryptos(query: string): Promise<CryptoData[]> {
  if (!query || query.length < 2) return [];
  
  try {
    const response = await fetch(
      `${COINGECKO_API_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
      { next: { revalidate: 60 } }
    );
    
    if (!response.ok) {
      throw new Error('Failed to search cryptos');
    }
    
    const data: CryptoData[] = await response.json();
    const lowerQuery = query.toLowerCase();
    
    return data.filter(
      coin =>
        coin.name.toLowerCase().includes(lowerQuery) ||
        coin.symbol.toLowerCase().includes(lowerQuery)
    );
  } catch (error) {
    console.error('Error searching cryptos:', error);
    return [];
  }
}
