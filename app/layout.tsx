import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/ThemeProvider'
import { WalletProvider } from '@/components/WalletProvider'

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

// Conditionally import ClerkProvider only when keys are available
const hasClerk = !!(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)

let ClerkProviderComponent: React.ComponentType<{ children: React.ReactNode }> | null = null
if (hasClerk) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const clerk = require('@clerk/nextjs')
  ClerkProviderComponent = clerk.ClerkProvider
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const inner = (
    <html lang="en">
      <body>
        <WalletProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </WalletProvider>
      </body>
    </html>
  )

  if (ClerkProviderComponent) {
    return <ClerkProviderComponent>{inner}</ClerkProviderComponent>
  }

  return inner
}
