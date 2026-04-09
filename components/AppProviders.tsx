'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { mainnet, base, arbitrum, optimism } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'
import { useState, type ReactNode } from 'react'
import { ThemeProvider } from './ThemeProvider'

// Create config outside to prevent recreation
const config = createConfig({
  chains: [mainnet, base, arbitrum, optimism],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
  },
  ssr: true,
})

export function AppProviders({ children }: { children: ReactNode }) {
  // Initialize QueryClient once
  const [queryClient] = useState(() => new QueryClient())

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
