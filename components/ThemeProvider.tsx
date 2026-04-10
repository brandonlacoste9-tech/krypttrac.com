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
  const [canUsePlatinum] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('kt-theme') as Theme
    if (saved && saved === 'royal') {
      setThemeState(saved)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    document.body.className = `theme-${theme}`
    localStorage.setItem('kt-theme', theme)
  }, [theme, mounted])

  const setTheme = (newTheme: Theme) => {
    if (newTheme === 'platinum' && !canUsePlatinum) {
      alert('🔒 Platinum Suite is exclusive to Royal tier subscribers.')
      return
    }
    setThemeState(newTheme)
  }

  // Prevent hydration mismatch by returning empty div or just children without theme applied until mounted
  return (
    <ThemeContext.Provider value={{ theme, setTheme, canUsePlatinum }}>
      <div style={{ visibility: mounted ? 'visible' : 'hidden' }}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
