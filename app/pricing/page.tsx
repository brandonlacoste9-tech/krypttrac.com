'use client'

import { Check, Star, Zap, Crown, Shield } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

const TIERS = [
  {
    name: 'Citizen',
    id: 'free',
    price: '$0',
    description: 'Foundation for every wealth builder.',
    features: [
      'Basic Market Intelligence',
      'Real-time Asset Tracking',
      'Public Access Terminal',
      'Community Insights'
    ],
    icon: <Shield className="w-6 h-6 text-gray-400" />,
    buttonText: 'Current Plan',
    buttonHref: '/dashboard',
    highlight: false,
    gradient: 'from-gray-900 to-[#050507]'
  },
  {
    name: 'Noble',
    id: 'noble',
    price: '$29',
    description: 'Elevated precision for active tracers.',
    features: [
      'Advanced AI Intelligence',
      'Whale Movement Alerts',
      'Priority Signal Stream',
      'Custom Watchlist Limits',
      'Noble Badge Status'
    ],
    icon: <Zap className="w-6 h-6 text-amber-500" />,
    buttonText: 'Upgrade to Noble',
    buttonHref: '/api/stripe/checkout?priceId=noble',
    highlight: true,
    gradient: 'from-amber-900/20 to-[#050507]'
  },
  {
    name: 'Royal',
    id: 'royal',
    price: '$99',
    description: 'The pinnacle of market sovereignty.',
    features: [
      'Institutional Data Flow',
      'Exclusive Royal Insider Chat',
      'Direct Alpha Reports',
      'Private Portfolio Audit',
      'Royal Elite Badge',
      'Concierge AI Support'
    ],
    icon: <Crown className="w-6 h-6 text-purple-500" />,
    buttonText: 'Claim Your Throne',
    buttonHref: '/api/stripe/checkout?priceId=royal',
    highlight: false,
    gradient: 'from-purple-900/20 to-[#050507]'
  }
]

export default function PricingPage() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-[#050507] py-24 px-4 relative overflow-hidden">
      {/* Signature Monogram Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 10 L45 25 L60 25 L48 35 L52 50 L40 40 L28 50 L32 35 L20 25 L35 25 Z' fill='%23FFD76C'/%3E%3C/svg%3E")`,
            backgroundSize: '120px 120px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-24">
          <div className="inline-block px-4 py-1 border border-amber-500/30 rounded-full mb-6">
            <span className="text-[10px] font-bold tracking-[0.4em] text-amber-500 uppercase">
              Subscription Tiers
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-light tracking-[0.2em] mb-6 text-white uppercase font-serif luxury-text">
            kryptotrac
          </h1>
          <p className="text-sm md:text-base font-light tracking-[0.5em] text-gray-400 uppercase max-w-2xl mx-auto">
            Select your rank in the global network.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`relative group p-1 rounded-[2.5rem] transition-all duration-700 hover:scale-[1.02] ${
                tier.highlight ? 'bg-gradient-to-b from-amber-500/50 via-amber-900/10 to-transparent shadow-[0_30px_100px_rgba(251,191,36,0.1)]' : 'bg-white/5'
              }`}
            >
              <div className={`h-full rounded-[2.4rem] p-10 bg-gradient-to-b ${tier.gradient} backdrop-blur-xl flex flex-col`}>
                <div className="flex items-center justify-between mb-8">
                  <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
                    {tier.icon}
                  </div>
                  {tier.highlight && (
                    <span className="text-[10px] font-black tracking-widest text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full uppercase">
                      Most Precise
                    </span>
                  )}
                </div>

                <h3 className="text-3xl font-serif tracking-widest text-white uppercase mb-2">
                  {tier.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-5xl font-light text-white tracking-tighter">{tier.price}</span>
                  <span className="text-gray-500 text-sm tracking-widest uppercase">/mo</span>
                </div>

                <p className="text-gray-400 text-sm font-medium mb-10 tracking-wide">
                  {tier.description}
                </p>

                <div className="space-y-5 mb-12 flex-grow">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-4 group/item">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover/item:border-amber-500/30 transition-colors">
                        <Check className="w-3 h-3 text-amber-500" />
                      </div>
                      <span className="text-sm text-gray-300 font-light tracking-wide">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link 
                  href={tier.buttonHref}
                  className="w-full"
                >
                  <button className={`w-full py-5 rounded-2xl text-[11px] font-black tracking-[0.3em] uppercase transition-all duration-500 ${
                    tier.highlight 
                      ? 'bg-amber-500 text-black hover:bg-white' 
                      : 'bg-white/5 text-white border border-white/10 hover:bg-white hover:text-black'
                  }`}>
                    {tier.buttonText}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Guarantee */}
        <div className="mt-24 text-center">
            <p className="text-[9px] tracking-[0.8em] text-white/20 uppercase font-bold">
              Institutional Grade Security — SSL ENCRYPTED
            </p>
        </div>
      </div>

      <style jsx global>{`
        .luxury-text {
          font-family: 'Times New Roman', serif;
          background: linear-gradient(180deg, #FFFFFF 30%, #FFD76C 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  )
}
