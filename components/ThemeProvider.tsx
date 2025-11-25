'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useUser } from '@clerk/nextjs'

type Theme = 'royal' | 'platinum'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  canUsePlatinum: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { user } = useUser()
  const [theme, setThemeState] = useState<Theme>('royal')
  const [canUsePlatinum, setCanUsePlatinum] = useState(false)

  useEffect(() => {
    // Check user tier from Clerk metadata
    const userTier = user?.publicMetadata?.tier as string || 'free'
    setCanUsePlatinum(userTier === 'platinum')

    // Load saved theme preference
    const saved = localStorage.getItem('kk-theme') as Theme
    if (saved && (saved === 'royal' || (saved === 'platinum' && userTier === 'platinum'))) {
      setThemeState(saved)
    }
  }, [user])

  useEffect(() => {
    // Apply theme to body
    document.body.className = `theme-${theme}`
    localStorage.setItem('kk-theme', theme)
  }, [theme])

  const setTheme = (newTheme: Theme) => {
    if (newTheme === 'platinum' && !canUsePlatinum) {
      alert('🔒 Platinum Suite is exclusive to Platinum Kings! Upgrade your tier to unlock this premium theme.')
      return
    }
    setThemeState(newTheme)
    
    // Play voice line when platinum activated (optional)
    if (newTheme === 'platinum' && canUsePlatinum) {
      // Add audio playback here if you have a voice line
      console.log('👑 Platinum Suite Activated')
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, canUsePlatinum }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
