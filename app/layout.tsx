import './globals.css'
import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { AppProviders } from '@/components/AppProviders'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Krypto Kings - Rule Your Portfolio',
  description: 'Command your crypto empire with royal precision.',
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
        <ClerkProvider>
          <AppProviders>
            {children}
          </AppProviders>
        </ClerkProvider>
      </body>
    </html>
  )
}
