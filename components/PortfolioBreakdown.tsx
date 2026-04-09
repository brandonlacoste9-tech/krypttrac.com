'use client'

import { useEffect, useState } from 'react'
import { Wallet, Building2, ChevronRight, Activity } from 'lucide-react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { linkWalletConnection } from '@/app/actions/portfolio'

type Connection = {
  id: string
  name: string
  type: 'wallet' | 'exchange'
  addressOrAccount: string
  value: string
  pnl: string
  isPositive: boolean
}

export const MOCK_CONNECTIONS: Connection[] = [
  {
    id: '1',
    name: 'Hardware Vault (Trezor)',
    type: 'wallet',
    addressOrAccount: '0x...8f9a',
    value: '$84,209.50',
    pnl: '+2.4%',
    isPositive: true,
  },
  {
    id: '2',
    name: 'Main Trading (Binance)',
    type: 'exchange',
    addressOrAccount: 'VIP Level 2',
    value: '$31,450.00',
    pnl: '-0.8%',
    isPositive: false,
  },
  {
    id: '3',
    name: 'DeFi Yield (Solana)',
    type: 'wallet',
    addressOrAccount: 'DP3...vQa',
    value: '$8,933.00',
    pnl: '+14.2%',
    isPositive: true,
  }
]

export function PortfolioBreakdown() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()
  const [syncedAddress, setSyncedAddress] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && isConnected && address && address !== syncedAddress) {
      linkWalletConnection(address)
        .then((res) => {
          if (res.success) {
            setSyncedAddress(address)
            console.log(res.message)
          } else {
            console.error(res.error)
          }
        })
        .catch(console.error)
    }
  }, [isConnected, address, syncedAddress, mounted])

  // To prevent hydration mismatch, only show real connections after mount
  const realConnections: Connection[] = (mounted && isConnected) ? [{
    id: 'web3-injected',
    name: 'Web3 Wallet',
    type: 'wallet',
    addressOrAccount: address ? `${address.slice(0,6)}...${address.slice(-4)}` : '',
    value: 'Evaluating...',
    pnl: 'Live',
    isPositive: true,
  }] : []

  const displayConnections = [...realConnections, ...MOCK_CONNECTIONS]

  return (
    <div className="px-6 my-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white tracking-wide">
          <span className="gold-text">Connected</span> Realms
        </h3>
        <button className="text-sm text-yellow-500 font-medium hover:text-yellow-400 transition-colors flex items-center">
          Manage <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      <div className="space-y-4">
        {displayConnections.map((conn) => (
          <div 
            key={conn.id}
            className="p-4 rounded-2xl flex items-center justify-between group cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, rgba(74, 21, 128, 0.25), rgba(26, 11, 46, 0.4))',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 215, 108, 0.1)',
              transition: 'all 0.3s ease'
            }}
          >
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 215, 108, 0.1), transparent)',
                  border: '1px solid rgba(255, 215, 108, 0.2)'
                }}
              >
                {conn.type === 'wallet' ? (
                  <Wallet className="w-5 h-5 text-yellow-500 relative z-10" />
                ) : (
                  <Building2 className="w-5 h-5 text-yellow-500 relative z-10" />
                )}
                <div className="absolute inset-0 metallic-shine opacity-10" style={{ background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)' }} />
              </div>

              <div>
                <h4 className="font-semibold text-gray-100">{conn.name}</h4>
                <p className="text-xs text-gray-400 font-mono mt-0.5">{conn.addressOrAccount}</p>
              </div>
            </div>

            <div className="text-right">
              <p className="font-bold text-white mb-0.5">{conn.value}</p>
              <div className="flex items-center justify-end gap-1">
                <Activity className={`w-3 h-3 ${conn.isPositive ? 'text-green-400' : 'text-red-400'}`} />
                <p className={`text-xs font-semibold ${conn.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  {conn.pnl}
                </p>
              </div>
            </div>
          </div>
        ))}

        <button 
          onClick={() => isConnected ? disconnect() : connect({ connector: injected() })}
          className="w-full mt-2 py-4 rounded-xl border border-dashed text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
          style={{
            borderColor: 'rgba(255, 215, 108, 0.3)',
            color: '#F4C430'
          }}
        >
          <Wallet className="w-4 h-4" /> {mounted && isConnected ? 'Disconnect Wallet' : 'Connect Web3 Wallet'}
        </button>
      </div>
    </div>
  )
}
