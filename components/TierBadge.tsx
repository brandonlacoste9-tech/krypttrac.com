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
    sm: { icon: 'w-4 h-4', badge: 'text-[9px] px-2 py-0.5', image: 16 },
    md: { icon: 'w-5 h-5', badge: 'text-[10px] px-2.5 py-1', image: 20 },
    lg: { icon: 'w-6 h-6', badge: 'text-[11px] px-3 py-1.5', image: 24 }
  }

  const config = {
    citizen: {
      icon: <Shield className={sizes[size].icon} />,
      label: 'CITIZEN',
      gradient: 'from-slate-700 to-slate-800',
      textColor: 'text-slate-300',
      borderColor: 'border-slate-600/30',
      glow: false,
    },
    noble: {
      icon: <Zap className={sizes[size].icon} />,
      label: 'NOBLE',
      gradient: 'from-amber-600 via-amber-500 to-amber-700',
      textColor: 'text-black',
      borderColor: 'border-amber-500/30',
      glow: true,
      glowColor: 'shadow-amber-500/20'
    },
    royal: {
      icon: <Crown className={sizes[size].icon} />,
      label: 'ROYAL',
      gradient: 'from-slate-200 via-white to-slate-400',
      textColor: 'text-black',
      borderColor: 'border-white/30',
      glow: true,
      glowColor: 'shadow-white/20'
    }
  }

  const badge = config[tier]

  return (
    <div className={`inline-flex items-center gap-1.5 bg-gradient-to-r ${badge.gradient} rounded-full ${sizes[size].badge} font-black tracking-[0.2em] ${badge.textColor} border ${badge.borderColor} shadow-lg ${badge.glow ? badge.glowColor : ''} uppercase`}>
      {badge.icon}
      {showLabel && <span>{badge.label}</span>}
    </div>
  )
}
