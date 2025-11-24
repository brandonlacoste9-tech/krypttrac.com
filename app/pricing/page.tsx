'use client';

import { Crown, Check, Sparkles, Zap, Shield, Gem } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import { useThemeStore } from '@/lib/themeStore';

const STRIPE_PAYMENT_LINKS = {
  silver: 'https://buy.stripe.com/aFaaEW8pv6y1aWa95v',
  gold: 'https://buy.stripe.com/28E7sK49fbSl3tI1D3',
  platinum: 'https://buy.stripe.com/eVq7sK5djcWpggu2H7',
};

const tiers = [
  {
    name: 'Silver King',
    badge: '🥈',
    price: 9.99,
    color: '#C0C0C0',
    popular: false,
    elite: false,
    buttonText: 'Get Started',
    tier: 'silver' as const,
    paymentLink: STRIPE_PAYMENT_LINKS.silver,
    features: [
      'Track up to 10 coins',
      'Basic portfolio tracking',
      'Price alerts',
      'Standard support',
    ],
  },
  {
    name: 'Gold King',
    badge: '🥇',
    price: 24.99,
    color: '#FFD700',
    popular: true,
    elite: false,
    buttonText: 'Upgrade Now',
    tier: 'gold' as const,
    paymentLink: STRIPE_PAYMENT_LINKS.gold,
    features: [
      'Unlimited coins',
      'Real-time alerts',
      'Advanced analytics',
      'Priority support',
      'Custom watchlists',
      'Theme customization',
      'Golden Child theme',
    ],
  },
  {
    name: 'Platinum King',
    badge: '💎',
    price: 49.99,
    color: '#8B5CF6',
    popular: false,
    elite: true,
    buttonText: 'Go Platinum',
    tier: 'platinum' as const,
    paymentLink: STRIPE_PAYMENT_LINKS.platinum,
    features: [
      'Everything in Gold',
      'AI-powered insights (Opus Magnum)',
      'Voice announcements',
      'Haptic feedback',
      'Tax reporting',
      'API access',
      'White-glove support',
      'Early access to features',
      'Platinum Suite theme',
    ],
  },
];

const comparisonFeatures = [
  { name: 'Coins Tracked', silver: '10', gold: 'Unlimited', platinum: 'Unlimited' },
  { name: 'Portfolio Tracking', silver: 'Basic', gold: 'Advanced', platinum: 'Advanced' },
  { name: 'Price Alerts', silver: true, gold: true, platinum: true },
  { name: 'Real-time Alerts', silver: false, gold: true, platinum: true },
  { name: 'Advanced Analytics', silver: false, gold: true, platinum: true },
  { name: 'Custom Watchlists', silver: false, gold: true, platinum: true },
  { name: 'Theme Customization', silver: false, gold: true, platinum: true },
  { name: 'AI Insights (Opus Magnum)', silver: false, gold: false, platinum: true },
  { name: 'Voice Announcements', silver: false, gold: false, platinum: true },
  { name: 'Haptic Feedback', silver: false, gold: false, platinum: true },
  { name: 'Tax Reporting', silver: false, gold: false, platinum: true },
  { name: 'API Access', silver: false, gold: false, platinum: true },
  { name: 'Support Level', silver: 'Standard', gold: 'Priority', platinum: 'White-glove' },
  { name: 'Early Access', silver: false, gold: false, platinum: true },
];

export default function PricingPage() {
  const { theme } = useThemeStore();

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Crown
              size={48}
              style={{
                color: theme.accent,
                filter: `drop-shadow(0 0 20px ${theme.accent})`,
              }}
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-gradient bg-animate">Choose Your Crown</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Premium crypto tracking for every king. Pick your tier and rule your portfolio.
          </p>
        </div>

        {/* Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 ${
                tier.popular ? 'md:-mt-4 md:mb-4' : ''
              }`}
              style={{
                background: 'rgba(15, 23, 42, 0.8)',
                backdropFilter: 'blur(20px)',
                border: `2px solid ${tier.color}40`,
                boxShadow: tier.popular
                  ? `0 0 40px ${tier.color}40, 0 20px 60px rgba(0,0,0,0.5)`
                  : `0 0 20px ${tier.color}20, 0 10px 40px rgba(0,0,0,0.3)`,
              }}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div
                  className="absolute top-0 left-0 right-0 py-2 text-center text-sm font-bold tracking-wider"
                  style={{ background: tier.color, color: '#000' }}
                >
                  MOST POPULAR
                </div>
              )}

              {/* Elite Badge */}
              {tier.elite && (
                <div
                  className="absolute top-0 left-0 right-0 py-2 text-center text-sm font-bold tracking-wider text-white"
                  style={{ background: `linear-gradient(90deg, ${tier.color}, #A78BFA)` }}
                >
                  ELITE
                </div>
              )}

              <div className={`p-8 ${tier.popular || tier.elite ? 'pt-14' : ''}`}>
                {/* Crown Icon */}
                <div className="flex justify-center mb-6">
                  <div
                    className="p-4 rounded-full"
                    style={{
                      background: `${tier.color}15`,
                      boxShadow: `0 0 30px ${tier.color}30`,
                    }}
                  >
                    {tier.elite ? (
                      <Gem
                        size={48}
                        style={{
                          color: tier.color,
                          filter: `drop-shadow(0 0 15px ${tier.color})`,
                        }}
                      />
                    ) : (
                      <Crown
                        size={48}
                        style={{
                          color: tier.color,
                          filter: `drop-shadow(0 0 15px ${tier.color})`,
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* Tier Name */}
                <h3 className="text-2xl font-bold text-center mb-2 flex items-center justify-center gap-2">
                  <span style={{ color: tier.color }}>{tier.name}</span>
                  <span>{tier.badge}</span>
                </h3>

                {/* Price */}
                <div className="text-center mb-8">
                  <span
                    className="text-5xl font-bold"
                    style={{ color: tier.color }}
                  >
                    ${tier.price}
                  </span>
                  <span className="text-gray-400 text-lg">/month</span>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div
                        className="mt-0.5 p-1 rounded-full"
                        style={{ background: `${tier.color}20` }}
                      >
                        <Check size={14} style={{ color: tier.color }} />
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <a
                  href={tier.paymentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 rounded-xl font-bold text-lg text-center transition-all duration-300 hover:scale-105"
                  style={{
                    background: tier.popular
                      ? tier.color
                      : `${tier.color}20`,
                    color: tier.popular ? '#000' : tier.color,
                    border: `2px solid ${tier.color}`,
                    boxShadow: `0 0 20px ${tier.color}30`,
                  }}
                >
                  {tier.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="text-gradient">Compare All Features</span>
          </h2>

          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(15, 23, 42, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {/* Table Header */}
            <div className="grid grid-cols-4 gap-4 p-4 border-b border-white/10">
              <div className="font-semibold text-gray-400">Feature</div>
              <div className="text-center font-bold" style={{ color: '#C0C0C0' }}>
                🥈 Silver
              </div>
              <div className="text-center font-bold" style={{ color: '#FFD700' }}>
                🥇 Gold
              </div>
              <div className="text-center font-bold" style={{ color: '#8B5CF6' }}>
                💎 Platinum
              </div>
            </div>

            {/* Table Rows */}
            {comparisonFeatures.map((feature, index) => (
              <div
                key={feature.name}
                className={`grid grid-cols-4 gap-4 p-4 ${
                  index % 2 === 0 ? 'bg-white/5' : ''
                } ${index !== comparisonFeatures.length - 1 ? 'border-b border-white/5' : ''}`}
              >
                <div className="text-gray-300 text-sm md:text-base">{feature.name}</div>
                <div className="text-center">
                  {typeof feature.silver === 'boolean' ? (
                    feature.silver ? (
                      <Check size={20} className="inline-block text-green-400" />
                    ) : (
                      <span className="text-gray-600">—</span>
                    )
                  ) : (
                    <span className="text-gray-300 text-sm">{feature.silver}</span>
                  )}
                </div>
                <div className="text-center">
                  {typeof feature.gold === 'boolean' ? (
                    feature.gold ? (
                      <Check size={20} className="inline-block text-green-400" />
                    ) : (
                      <span className="text-gray-600">—</span>
                    )
                  ) : (
                    <span className="text-gray-300 text-sm">{feature.gold}</span>
                  )}
                </div>
                <div className="text-center">
                  {typeof feature.platinum === 'boolean' ? (
                    feature.platinum ? (
                      <Check size={20} className="inline-block text-green-400" />
                    ) : (
                      <span className="text-gray-600">—</span>
                    )
                  ) : (
                    <span className="text-gray-300 text-sm">{feature.platinum}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Footer */}
        <div className="text-center">
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
            style={{
              background: 'rgba(139, 92, 246, 0.1)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
            }}
          >
            <Shield size={20} style={{ color: theme.accent }} />
            <span className="text-gray-300">
              All plans include end-to-end encryption and premium security 👑
            </span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="glass-strong border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-400 text-sm">
            © 2025 <span style={{ color: theme.accent }}>Krypto Kings</span>. Built for kings. Powered by premium technology. 👑
          </p>
        </div>
      </footer>
    </div>
  );
}
