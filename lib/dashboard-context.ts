import type { MarketRow } from '@/lib/market-types'

/** Shapes expected by `AIAgent` + `/api/agent` prompts */
export type AiCoinLine = { name: string; price: string; change: string }
export type AiStableLine = { symbol: string; price: string; change: string }

export function formatUsd(n: number | null, compact = false): string {
  if (n == null || Number.isNaN(n)) return '—'
  if (compact && n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`
  if (compact && n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`
  if (compact && n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`
  if (n < 1 && n > 0) return `$${n.toLocaleString('en-US', { maximumFractionDigits: 6 })}`
  return `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function formatPct(n: number | null): string {
  if (n == null || Number.isNaN(n)) return '—'
  const sign = n > 0 ? '+' : ''
  return `${sign}${n.toFixed(2)}%`
}

const STABLE_SYMBOLS = new Set([
  'USDT',
  'USDC',
  'DAI',
  'BUSD',
  'TUSD',
  'USDD',
  'FRAX',
  'USDE',
  'PYUSD',
  'FDUSD',
])

export function buildAiDashboardData(markets: MarketRow[]) {
  const withChange = markets.filter((m) => m.change24h != null && m.price != null)

  const gainers = [...withChange]
    .sort((a, b) => (b.change24h ?? 0) - (a.change24h ?? 0))
    .slice(0, 5)
    .map(
      (m): AiCoinLine => ({
        name: m.name,
        price: formatUsd(m.price),
        change: formatPct(m.change24h),
      })
    )

  const losers = [...withChange]
    .sort((a, b) => (a.change24h ?? 0) - (b.change24h ?? 0))
    .slice(0, 5)
    .map(
      (m): AiCoinLine => ({
        name: m.name,
        price: formatUsd(m.price),
        change: formatPct(m.change24h),
      })
    )

  const stablecoins = markets
    .filter((m) => STABLE_SYMBOLS.has(m.symbol) && m.price != null)
    .slice(0, 8)
    .map(
      (m): AiStableLine => ({
        symbol: m.symbol,
        price: formatUsd(m.price),
        change: formatPct(m.change24h),
      })
    )

  return { gainers, losers, stablecoins }
}

export function parseUsdString(s: string): number {
  const n = parseFloat(String(s).replace(/[$,]/g, ''))
  return Number.isFinite(n) ? n : NaN
}
