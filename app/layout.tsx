import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/ThemeProvider'

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
