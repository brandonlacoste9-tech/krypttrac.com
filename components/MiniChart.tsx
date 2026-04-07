'use client'

import { useId, useMemo } from 'react'

interface MiniChartProps {
  data: number[]
  isPositive: boolean
}

export function MiniChart({ data, isPositive }: MiniChartProps) {
  const id = useId().replace(/:/g, '')

  const { pathD, gradientId } = useMemo(() => {
    if (data.length < 2) {
      return { pathD: '', gradientId: `g-${id}` }
    }
    const min = Math.min(...data)
    const max = Math.max(...data)
    const range = max - min || 1
    const normalize = (val: number) => ((val - min) / range) * 100

    const points = data.map((val, idx) => ({
      x: (idx / (data.length - 1)) * 100,
      y: 100 - normalize(val),
    }))

    const pathD = points.reduce((acc, point, idx) => {
      if (idx === 0) return `M ${point.x} ${point.y}`
      return `${acc} L ${point.x} ${point.y}`
    }, '')

    return { pathD, gradientId: `g-${id}` }
  }, [data, id])

  if (!pathD) {
    return <div className="w-20 h-10 rounded bg-white/5" />
  }

  return (
    <svg width="80" height="40" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop
            offset="0%"
            stopColor={isPositive ? "#FFD76C" : "#EF4444"}
            stopOpacity="0.6"
          />
          <stop
            offset="100%"
            stopColor={isPositive ? "#FFD76C" : "#EF4444"}
            stopOpacity="0.1"
          />
        </linearGradient>
      </defs>

      <path
        d={`${pathD} L 100 100 L 0 100 Z`}
        fill={`url(#${gradientId})`}
      />

      <path
        d={pathD}
        fill="none"
        stroke={isPositive ? "#FFD76C" : "#EF4444"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
