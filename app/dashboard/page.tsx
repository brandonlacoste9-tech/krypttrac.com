import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { DashboardClient } from './DashboardClient'

// Server Component - Static data fetching
export default async function Dashboard() {
  // In production, fetch from CoinGecko or your API here
  // Using Next.js 15 fetch with revalidation
  const cryptoData = await getCryptoData()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      <DashboardClient initialData={cryptoData} />
      <Footer />
    </div>
  )
}

// Mock data fetcher - replace with real API
async function getCryptoData() {
  // In production: const res = await fetch('https://api.coingecko.com/api/v3/...', { next: { revalidate: 30 } })
  return {
    portfolio: {
      value: '$127,543.89',
      change: '+$12,456.78',
      changePercent: '+10.82%'
    },
    cryptos: [
      {
        id: 'bitcoin',
        name: 'Bitcoin',
        symbol: 'BTC',
        price: '$43,567.89',
        change24h: '+5.23%',
        volume: '$28.5B',
        marketCap: '$850B',
        isPositive: true
      },
      {
        id: 'ethereum',
        name: 'Ethereum',
        symbol: 'ETH',
        price: '$2,845.32',
        change24h: '+3.45%',
        volume: '$15.2B',
        marketCap: '$342B',
        isPositive: true
      },
      {
        id: 'solana',
        name: 'Solana',
        symbol: 'SOL',
        price: '$98.75',
        change24h: '-2.15%',
        volume: '$2.8B',
        marketCap: '$42B',
        isPositive: false
      },
      {
        id: 'cardano',
        name: 'Cardano',
        symbol: 'ADA',
        price: '$0.48',
        change24h: '+1.87%',
        volume: '$456M',
        marketCap: '$17B',
        isPositive: true
      }
    ]
  }
}
