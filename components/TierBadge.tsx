'use client'

import Image from 'next/image'
import { Crown, Zap, Shield } from 'lucide-react'

export type Tier = 'citizen' | 'noble' | 'royal'

interface TierBadgeProps {
  tier: Tier
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

export function TierBadge({ tier, size = 'md', showLabel = true }: TierBadgeProps) {
  const sizes = {
    sm: { icon: 'w-4 h-4', badge: 'text-[10px] px-2 py-0.5', image: 16 },
    md: { icon: 'w-5 h-5', badge: 'text-xs px-2.5 py-1', image: 20 },
    lg: { icon: 'w-6 h-6', badge: 'text-sm px-3 py-1.5', image: 24 }
  }

  const config = {
    citizen: {
      icon: <Shield className={sizes[size].icon} />,
      logo: false,
      label: 'CITIZEN',
      gradient: 'from-gray-600 to-gray-500',
      textColor: 'text-gray-100',
      glow: false,
      show: true
    },
    noble: {
      icon: <Zap className={sizes[size].icon} />,
      logo: false,
      label: 'NOBLE',
      gradient: 'from-yellow-600 via-yellow-500 to-yellow-600',
      textColor: 'text-white',
      glow: false,
      show: true
    },
    royal: {
      icon: <Crown className={sizes[size].icon} />,
      logo: false,
      label: 'ROYAL',
      gradient: 'from-purple-600 via-pink-600 to-purple-600',
      textColor: 'text-white',
      glow: true,
      show: true
    }
  }

  const badge = config[tier]

  if (!badge?.show) return null

  return (
    <div className={`inline-flex items-center gap-1.5 bg-gradient-to-r ${badge.gradient} rounded-full ${sizes[size].badge} font-bold ${badge.textColor} shadow-lg ${badge.glow ? 'shadow-purple-500/50' : ''}`}>
      {badge.icon}
      {showLabel && <span>{badge.label}</span>}
    </div>
  )
}
