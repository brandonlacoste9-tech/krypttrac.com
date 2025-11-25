'use client'

export function TreasuryCard() {
  const balance = "$124,500.25"
  const change24h = "+$1,200"
  const changePercent = "+2.4%"

  return (
    <div className="treasury-card mx-6 my-6">
      {/* Total Treasury Label */}
      <div className="text-center mb-3">
        <p className="text-sm text-gray-300 uppercase tracking-wider">Total Treasury</p>
      </div>

      {/* Balance - Huge Gold Gradient Text */}
      <div className="text-center mb-4">
        <h2 
          className="text-6xl font-black gold-text"
          style={{
            textShadow: '0 0 30px rgba(255, 215, 108, 0.5), 0 4px 8px rgba(0, 0, 0, 0.8)',
          }}
        >
          {balance}
        </h2>
      </div>

      {/* 24h Change - Green with Gold Glow */}
      <div 
        className="text-center py-2 px-4 rounded-xl inline-block mx-auto"
        style={{
          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(22, 163, 74, 0.3))',
          border: '2px solid rgba(34, 197, 94, 0.4)',
          boxShadow: '0 0 20px rgba(255, 215, 108, 0.2)',
        }}
      >
        <p className="text-green-400 font-bold text-lg">
          {change24h} <span className="text-sm">({changePercent})</span>
        </p>
      </div>
    </div>
  )
}
