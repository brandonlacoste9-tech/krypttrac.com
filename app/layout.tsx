import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import ClientProviders from '@/components/ClientProviders'
import SplashScreen from '@/components/SplashScreen'
import OpusMagnumBadge from '@/components/OpusMagnumBadge'
import './globals.css'

export const metadata: Metadata = {
  title: 'ꓘrypto Kings - Luxury Crypto Dashboard',
  description: 'Premium crypto tracking for kings. Real-time prices, luxury UI, and royal themes.',
  generator: 'ꓘrypto Kings',
  icons: {
    icon: '/favicon.ico',
    apple: '/logo-192.png',
  },
  manifest: '/manifest.json',
  themeColor: '#8B5CF6',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'ꓘrypto Kings',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#8B5CF6',
          colorBackground: '#0f0a1a',
          colorInputBackground: '#1a1a2e',
          colorInputText: '#ffffff',
        },
      }}
    >
      <html lang="en">
        <body className="theme-transition">
          <SplashScreen />
          <ClientProviders />
          <div className="relative z-10">
            {children}
          </div>
          <OpusMagnumBadge />
        </body>
      </html>
    </ClerkProvider>
  )
}
