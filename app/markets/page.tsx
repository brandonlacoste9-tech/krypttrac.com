import type { Metadata } from 'next'
import { MarketsView } from '@/components/MarketsView'

export const metadata: Metadata = {
  title: 'Markets | Krypto Kings',
  description: 'Live cryptocurrency prices and market cap rankings.',
}

export default function MarketsPage() {
  return <MarketsView />
}
