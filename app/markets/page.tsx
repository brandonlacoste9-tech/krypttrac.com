import type { Metadata } from 'next'
import { MarketsView } from '@/components/MarketsView'

export const metadata: Metadata = {
  title: 'Global Markets | kryptotrac',
  description: 'Real-time institutional-grade cryptocurrency prices, market capitalizations, and delta tracking.',
}

export default function MarketsPage() {
  return <MarketsView />
}
