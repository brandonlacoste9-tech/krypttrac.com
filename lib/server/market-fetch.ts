import {
  mapCoinGeckoMarket,
  type CoinGeckoMarket,
  type GlobalSnapshot,
  type MarketRow,
} from '@/lib/market-types'
import { buildAiDashboardData } from '@/lib/dashboard-context'

const MARKETS_URL =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=24h'

function mapGlobal(raw: Record<string, unknown>): GlobalSnapshot {
  const data = raw?.data as Record<string, unknown> | undefined
  if (!data) {
    return {
      totalMarketCapUsd: null,
      totalVolumeUsd: null,
      marketCapChange24hPct: null,
      btcDominancePct: null,
      ethDominancePct: null,
      activeCryptocurrencies: null,
    }
  }
  const tmc = data.total_market_cap as Record<string, number> | undefined
  const tv = data.total_volume as Record<string, number> | undefined
  const dom = data.market_cap_percentage as Record<string, number> | undefined
  return {
    totalMarketCapUsd: tmc?.usd ?? null,
    totalVolumeUsd: tv?.usd ?? null,
    marketCapChange24hPct: (data.market_cap_change_percentage_24h_usd as number) ?? null,
    btcDominancePct: dom?.btc ?? null,
    ethDominancePct: dom?.eth ?? null,
    activeCryptocurrencies: (data.active_cryptocurrencies as number) ?? null,
  }
}

export type DashboardSnapshot = {
  markets: MarketRow[]
  global: GlobalSnapshot
  aiContext: ReturnType<typeof buildAiDashboardData>
  updatedAt: string
  error?: string
}

export async function fetchDashboardSnapshot(): Promise<DashboardSnapshot> {
  const updatedAt = new Date().toISOString()
  try {
    const [marketsRes, globalRes] = await Promise.all([
      fetch(MARKETS_URL, {
        headers: { Accept: 'application/json' },
        next: { revalidate: 60 },
      }),
      fetch('https://api.coingecko.com/api/v3/global', {
        headers: { Accept: 'application/json' },
        next: { revalidate: 60 },
      }),
    ])

    let markets: MarketRow[] = []
    if (marketsRes.ok) {
      const raw = (await marketsRes.json()) as CoinGeckoMarket[]
      markets = raw.map(mapCoinGeckoMarket)
    }

    let global: GlobalSnapshot = {
      totalMarketCapUsd: null,
      totalVolumeUsd: null,
      marketCapChange24hPct: null,
      btcDominancePct: null,
      ethDominancePct: null,
      activeCryptocurrencies: null,
    }
    if (globalRes.ok) {
      const g = (await globalRes.json()) as Record<string, unknown>
      global = mapGlobal(g)
    }

    return {
      markets,
      global,
      aiContext: buildAiDashboardData(markets),
      updatedAt,
      error: markets.length === 0 ? 'Market list unavailable' : undefined,
    }
  } catch {
    return {
      markets: [],
      global: {
        totalMarketCapUsd: null,
        totalVolumeUsd: null,
        marketCapChange24hPct: null,
        btcDominancePct: null,
        ethDominancePct: null,
        activeCryptocurrencies: null,
      },
      aiContext: { gainers: [], losers: [], stablecoins: [] },
      updatedAt,
      error: 'Failed to load market data',
    }
  }
}
