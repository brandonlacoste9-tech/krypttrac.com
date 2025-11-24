import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserTier = 'free' | 'silver' | 'gold' | 'platinum'

export interface Theme {
  name: string
  primary: string
  accent: string
  glow: string
  bgStart: string
  bgEnd: string
  tierRequired?: UserTier // undefined means free/available to all
  isExclusive?: boolean
  description?: string
}

export const themes: Record<string, Theme> = {
  royalPurple: {
    name: 'Royal Purple',
    primary: '#8B5CF6',
    accent: '#FFD700',
    glow: 'rgba(139, 92, 246, 0.6)',
    bgStart: '#0f0a1a',
    bgEnd: '#1a0a2e',
  },
  diamond: {
    name: 'Diamond',
    primary: '#67E8F9',
    accent: '#E5E4E2',
    glow: 'rgba(103, 232, 249, 0.6)',
    bgStart: '#0a1a1f',
    bgEnd: '#0f2833',
  },
  goldRush: {
    name: 'Gold Rush',
    primary: '#F59E0B',
    accent: '#FCD34D',
    glow: 'rgba(245, 158, 11, 0.6)',
    bgStart: '#1a1400',
    bgEnd: '#2d2200',
  },
  emerald: {
    name: 'Emerald',
    primary: '#10B981',
    accent: '#FFD700',
    glow: 'rgba(16, 185, 129, 0.6)',
    bgStart: '#0a1a14',
    bgEnd: '#0f2e1f',
  },
  ruby: {
    name: 'Ruby',
    primary: '#EF4444',
    accent: '#FFD700',
    glow: 'rgba(239, 68, 68, 0.6)',
    bgStart: '#1a0a0a',
    bgEnd: '#2e0f0f',
  },
  sapphire: {
    name: 'Sapphire',
    primary: '#3B82F6',
    accent: '#C0C0C0',
    glow: 'rgba(59, 130, 246, 0.6)',
    bgStart: '#0a0f1a',
    bgEnd: '#0f1a2e',
  },
  // === EXCLUSIVE TIER-LOCKED THEMES ===
  goldenChild: {
    name: 'Golden Child',
    primary: '#FFD700',
    accent: '#FFA500',
    glow: 'rgba(255, 215, 0, 0.7)',
    bgStart: '#1a1500',
    bgEnd: '#2d2400',
    tierRequired: 'gold',
    isExclusive: true,
    description: 'Drip in gold. The ultimate flex for Gold Kings.',
  },
  platinumSuite: {
    name: 'Platinum Suite',
    primary: '#E5E4E2',
    accent: '#B4C4D4',
    glow: 'rgba(229, 228, 226, 0.7)',
    bgStart: '#0f1318',
    bgEnd: '#1a2028',
    tierRequired: 'platinum',
    isExclusive: true,
    description: 'Chrome everything. Platinum status only.',
  },
}

// Helper to check if user can access a theme
export function canAccessTheme(theme: Theme, userTier: UserTier): boolean {
  if (!theme.tierRequired) return true

  const tierOrder: UserTier[] = ['free', 'silver', 'gold', 'platinum']
  const userTierIndex = tierOrder.indexOf(userTier)
  const requiredTierIndex = tierOrder.indexOf(theme.tierRequired)

  return userTierIndex >= requiredTierIndex
}

// Get tier display name
export function getTierDisplayName(tier: UserTier): string {
  const names: Record<UserTier, string> = {
    free: 'Free',
    silver: 'Silver King',
    gold: 'Gold King',
    platinum: 'Platinum King',
  }
  return names[tier]
}

interface ThemeState {
  currentTheme: string
  theme: Theme
  setTheme: (themeName: string) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      currentTheme: 'royalPurple',
      theme: themes.royalPurple,
      setTheme: (themeName: string) => {
        const newTheme = themes[themeName] || themes.royalPurple
        set({ currentTheme: themeName, theme: newTheme })
        
        // Update CSS variables
        if (typeof document !== 'undefined') {
          const root = document.documentElement
          root.style.setProperty('--theme-primary', newTheme.primary)
          root.style.setProperty('--theme-accent', newTheme.accent)
          root.style.setProperty('--theme-glow', newTheme.glow)
          root.style.setProperty('--theme-bg-start', newTheme.bgStart)
          root.style.setProperty('--theme-bg-end', newTheme.bgEnd)
        }
      },
    }),
    {
      name: 'krypto-kings-theme',
    }
  )
)
