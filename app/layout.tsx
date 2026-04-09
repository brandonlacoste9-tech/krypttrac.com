import './globals.css'
import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/ThemeProvider'

/** Avoid static prerender without Clerk keys (CI / fresh clones). */
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Krypto Kings - Rule Your Portfolio',
  description: 'Command your crypto empire with royal precision.',
  icons: {
    icon: '/kk-logo.png',
    apple: '/kk-logo.png',
  },
  openGraph: {
    title: 'Krypto Kings - Rule Your Portfolio',
    description: 'Digital sovereignty meets luxury',
    url: 'https://kryptokings.app',
    siteName: 'Krypto Kings',
    type: 'website',
  },
}

import { WalletProvider } from '@/components/WalletProvider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <WalletProvider>
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </WalletProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
