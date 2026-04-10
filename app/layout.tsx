import './globals.css'
import type { Metadata } from 'next'
import { AppProviders } from '@/components/AppProviders'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'kryptotrac.com - Rule Your Portfolio',
  description: 'Command your assets with surgical precision.',
  icons: {
    icon: '/kk-logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="theme-royal">
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  )
}
