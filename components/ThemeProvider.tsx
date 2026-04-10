'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useSession } from 'next-auth/react'

type Theme = 'royal' | 'platinum'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  canUsePlatinum: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession()
  const [theme, setThemeState] = useState<Theme>('royal')
  const [mounted, setMounted] = useState(false)

  const canUsePlatinum = session?.user?.tier === 'royal'

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('kt-theme') as Theme
    if (saved && (saved === 'royal' || saved === 'platinum')) {
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

  // Prevent hydration flicker
  if (!mounted) {
    return <div className="min-h-screen bg-[#050507]">{children}</div>
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
