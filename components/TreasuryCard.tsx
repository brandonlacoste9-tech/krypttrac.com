'use client'

type TreasuryCardProps = {
  loading?: boolean
  headline?: string
  primaryValue: string
  changeLabel: string
  changePercent: string
  isPositive: boolean | null
  footnote?: string
}

export function TreasuryCard({
  loading,
  headline = 'Global market cap',
  primaryValue,
  changeLabel,
  changePercent,
  isPositive,
  footnote,
}: TreasuryCardProps) {
  if (loading) {
    return (
      <div className="treasury-card mx-6 my-6 animate-pulse">
        <div className="h-4 bg-white/10 rounded w-40 mx-auto mb-4" />
        <div className="h-16 bg-white/10 rounded w-3/4 mx-auto mb-4" />
        <div className="h-10 bg-white/10 rounded w-1/2 mx-auto" />
      </div>
    )
  }

  const positive = isPositive === true
  const negative = isPositive === false

  return (
    <div className="treasury-card mx-6 my-6">
      <div className="text-center mb-3">
        <p className="text-sm text-gray-300 uppercase tracking-wider">{headline}</p>
      </div>

      <div className="text-center mb-4">
        <h2
          className="text-5xl sm:text-6xl font-black gold-text leading-tight"
          style={{
            textShadow: '0 0 30px rgba(255, 215, 108, 0.5), 0 4px 8px rgba(0, 0, 0, 0.8)',
          }}
        >
          {primaryValue}
        </h2>
      </div>

      <div className="flex justify-center">
        <div
          className="text-center py-2 px-4 rounded-xl inline-block"
          style={{
            background: positive
              ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(22, 163, 74, 0.3))'
              : negative
                ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(185, 28, 28, 0.25))'
                : 'linear-gradient(135deg, rgba(148, 163, 184, 0.15), rgba(100, 116, 139, 0.2))',
            border: positive
              ? '2px solid rgba(34, 197, 94, 0.4)'
              : negative
                ? '2px solid rgba(239, 68, 68, 0.35)'
                : '2px solid rgba(148, 163, 184, 0.3)',
            boxShadow: '0 0 20px rgba(255, 215, 108, 0.15)',
          }}
        >
          <p
            className={`font-bold text-lg ${
              positive ? 'text-green-400' : negative ? 'text-red-400' : 'text-gray-300'
            }`}
          >
            {changeLabel}{' '}
            <span className="text-sm opacity-90">({changePercent})</span>
          </p>
        </div>
      </div>

      {footnote ? (
        <p className="text-center text-xs text-gray-500 mt-4 leading-relaxed">{footnote}</p>
      ) : null}
    </div>
  )
}
