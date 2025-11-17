import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Krypttrac - Premium Crypto Dashboard',
  description: 'Next-gen crypto dashboard for kings. Real-time prices, glass-morphic UI, watchlists, movers, and alerts.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
