'use client'

import { useState } from 'react'
import { Check, Crown, Shield, Zap, Star } from 'lucide-react'
import Header from '@/components/Header'

const tiers = [
  {
    id: 'citizen',
    name: 'Citizen',
    price: '$0',
    description: 'Establish your presence in the realm.',
    features: [
      'Basic Portfolio Tracking',
      '3 Wallet Connections',
      'Daily Market Summaries',
      'Standard Support',
    ],
    buttonText: 'Current Status',
    highlight: false,
    color: 'gray',
    icon: <Shield className="w-8 h-8 text-gray-400" />,
  },
  {
    id: 'noble',
    name: 'Noble',
    price: '$29',
    description: 'For those who seek the path of wealth.',
    features: [
      'Unlimited Wallet Connections',
      'Real-time Alpha Alerts',
      'Advanced AI Market Insights',
      'Priority Support',
      'Yield Pool Early Access',
    ],
    buttonText: 'Claim Gold Title',
    highlight: true,
    color: 'gold',
    icon: <Star className="w-8 h-8 text-yellow-500" />,
  },
  {
    id: 'royal',
    name: 'Royal',
    price: '$99',
    description: 'True dominion over the on-chain realm.',
    features: [
      'Whale Tracking Intelligence',
      'The Queen\'s Guard (Auto-Rebalance)',
      'Direct Alpha Agent Research',
      'Exclusive Yield-Hacking Tools',
      'Direct Line to High-Lords',
    ],
    buttonText: 'Ascend to Throne',
    highlight: false,
    color: 'purple',
    icon: <Crown className="w-8 h-8 text-purple-500" />,
  },
]

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null)

  const handleSubscription = async (tier: string) => {
    if (tier === 'citizen') return

    setLoading(tier)
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tier }),
      })

      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Kingdom upgrade failed:', error)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-[#0F051D] text-white">
      <Header />
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-yellow-600/5 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 gold-text uppercase">
            kryptotrac.com
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">
            Master the data. Trace the wealth. 
            Choose the precision tier that fits your institutional ambition.
          </p>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-[2.5rem] p-8 transition-all duration-500 group hover:scale-[1.02] flex flex-col ${
                tier.highlight 
                ? 'bg-gradient-to-b from-white/10 to-transparent border-2 border-yellow-500/50 shadow-[0_30px_60px_-15px_rgba(244,196,48,0.2)]'
                : 'bg-white/5 border border-white/10 hover:border-white/20'
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-yellow-500 text-[#0F051D] text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2 rounded-full shadow-lg">
                  Most Coveted
                </div>
              )}

              <div className="mb-8">
                <div className="mb-4 inline-block p-4 rounded-2xl bg-white/5 group-hover:bg-white/10 transition-colors">
                  {tier.icon}
                </div>
                <h3 className={`text-2xl font-black uppercase tracking-widest ${
                  tier.color === 'gold' ? 'text-yellow-500' : tier.color === 'purple' ? 'text-purple-500' : 'text-gray-400'
                }`}>
                  {tier.name}
                </h3>
                <div className="flex items-baseline gap-1 mt-4">
                  <span className="text-5xl font-black tracking-tight">{tier.price}</span>
                  <span className="text-gray-500 font-bold uppercase text-xs tracking-widest">/ Month</span>
                </div>
                <p className="mt-4 text-gray-400 font-medium text-sm leading-relaxed">
                  {tier.description}
                </p>
              </div>

              <div className="space-y-4 mb-10 flex-grow">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className={`mt-1 rounded-full p-1 ${
                      tier.color === 'gold' ? 'bg-yellow-500/10' : tier.color === 'purple' ? 'bg-purple-500/10' : 'bg-white/10'
                    }`}>
                      <Check className={`w-3 h-3 ${
                        tier.color === 'gold' ? 'text-yellow-500' : tier.color === 'purple' ? 'text-purple-500' : 'text-white'
                      }`} />
                    </div>
                    <span className="text-sm font-semibold text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleSubscription(tier.id)}
                disabled={loading !== null}
                className={`block w-full text-center py-4 rounded-2xl font-black uppercase tracking-widest transition-all ${
                  tier.highlight
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-[0_10px_20px_rgba(234,179,8,0.3)] hover:shadow-[0_15px_30px_rgba(234,179,8,0.5)] active:scale-[0.98]'
                  : 'bg-white/10 hover:bg-white/20 text-white active:scale-[0.98]'
                } disabled:opacity-50`}
              >
                {loading === tier.id ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Summoning...
                  </div>
                ) : tier.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Comparison Trust Section */}
        <div className="mt-24 text-center">
          <p className="text-gray-500 flex items-center justify-center gap-2 font-bold uppercase text-[10px] tracking-[0.3em] mb-4">
            <Zap className="w-3 h-3 text-yellow-500 fill-yellow-500" /> Powered by Ethereum Mainnet Security
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
            <span className="text-xl font-black tracking-tighter">METAMASK</span>
            <span className="text-xl font-black tracking-tighter">STRIPE</span>
            <span className="text-xl font-black tracking-tighter">ALCHEMY</span>
            <span className="text-xl font-black tracking-tighter">UNISWAP</span>
          </div>
        </div>
      </div>
    </div>
  )
}
