'use client'

interface MiniChartProps {
  data: number[]
  isPositive: boolean
}

export function MiniChart({ data, isPositive }: MiniChartProps) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const normalize = (val: number) => ((val - min) / (max - min)) * 100

  const points = data.map((val, idx) => ({
    x: (idx / (data.length - 1)) * 100,
    y: 100 - normalize(val)
  }))

  const pathD = points.reduce((acc, point, idx) => {
    if (idx === 0) return `M ${point.x} ${point.y}`
    return `${acc} L ${point.x} ${point.y}`
  }, '')

  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`

  return (
    <svg width="80" height="40" viewBox="0 0 100 100" preserveAspectRatio="none">
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
