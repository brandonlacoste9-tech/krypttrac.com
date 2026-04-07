export type MarketRow = {
  id: string
  symbol: string
  name: string
  price: number | null
  change24h: number | null
  image: string | null
  sparkline: number[] | null
  marketCap: number | null
  rank: number | null
}

export type CoinGeckoMarket = {
  id: string
  symbol: string
  name: string
  current_price: number | null
  price_change_percentage_24h: number | null
  image: string | null
  market_cap: number | null
  market_cap_rank?: number | null
  sparkline_in_7d?: { price?: number[] }
}

export type GlobalSnapshot = {
  totalMarketCapUsd: number | null
  totalVolumeUsd: number | null
  marketCapChange24hPct: number | null
  btcDominancePct: number | null
  ethDominancePct: number | null
  activeCryptocurrencies: number | null
}

export function mapCoinGeckoMarket(c: CoinGeckoMarket): MarketRow {
  return {
    id: c.id,
    symbol: (c.symbol || '').toUpperCase(),
    name: c.name,
    price: c.current_price ?? null,
    change24h: c.price_change_percentage_24h ?? null,
    image: c.image ?? null,
    sparkline: c.sparkline_in_7d?.price ?? null,
    marketCap: c.market_cap ?? null,
    rank: c.market_cap_rank ?? null,
  }
}
