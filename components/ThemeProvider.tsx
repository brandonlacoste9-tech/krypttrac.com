'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'royal' | 'platinum'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  canUsePlatinum: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('royal')
  const [canUsePlatinum, setCanUsePlatinum] = useState(false)

  // Try to get user from Clerk if available
  let user: Record<string, unknown> | null | undefined = null
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const clerk = require('@clerk/nextjs')
    const result = clerk.useUser()
    user = result?.user
  } catch {
    // Clerk not available — proceed without user
  }

  useEffect(() => {
    const userTier = (user as Record<string, unknown>)?.publicMetadata
      ? ((user as Record<string, unknown>).publicMetadata as Record<string, string>)?.tier || 'free'
      : 'free'
    setCanUsePlatinum(userTier === 'platinum')

    const saved = localStorage.getItem('kk-theme') as Theme
    if (saved && (saved === 'royal' || (saved === 'platinum' && userTier === 'platinum'))) {
      setThemeState(saved)
    }
  }, [user])

  useEffect(() => {
    document.body.className = `theme-${theme}`
    localStorage.setItem('kk-theme', theme)
  }, [theme])

  const setTheme = (newTheme: Theme) => {
    if (newTheme === 'platinum' && !canUsePlatinum) {
      alert('🔒 Platinum Suite is exclusive to Platinum Kings! Upgrade your tier to unlock this premium theme.')
      return
    }
    setThemeState(newTheme)
    if (newTheme === 'platinum' && canUsePlatinum) {
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
