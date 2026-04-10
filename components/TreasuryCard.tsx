'use client'

import { Wallet, TrendingUp, TrendingDown } from 'lucide-react'

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
  headline = 'Global Market Cap',
  primaryValue,
  changeLabel,
  changePercent,
  isPositive,
  footnote,
}: TreasuryCardProps) {
  if (loading) {
    return (
      <div className="mx-auto max-w-4xl p-1 rounded-[2.5rem] bg-white/5 animate-pulse">
        <div className="h-48 rounded-[2.4rem] bg-[#0C0C0E]/50" />
      </div>
    )
  }

  const positive = isPositive === true
  const negative = isPositive === false

  return (
    <div className="relative mx-auto max-w-4xl p-1 rounded-[3rem] bg-gradient-to-br from-white/10 to-transparent shadow-2xl overflow-hidden group">
      {/* Internal Glass Slab */}
      <div className="relative rounded-[2.9rem] bg-[#0C0C0E]/80 backdrop-blur-2xl p-12 overflow-hidden">
        
        {/* Detail Lines */}
        <div className="absolute top-0 right-0 p-8 opacity-10">
           <Wallet className="w-16 h-16 text-amber-500" />
        </div>

        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-2">
            <span className="text-[10px] font-black tracking-[0.4em] text-gray-400 uppercase">
              {headline}
            </span>
          </div>

          <h2 className="text-6xl sm:text-7xl font-light tracking-tighter text-white font-serif mb-4">
            {primaryValue}
          </h2>

          <div className="flex flex-col items-center gap-4">
            <div className={`px-6 py-2 rounded-full flex items-center gap-3 transition-all duration-500 ${
              positive ? 'bg-cyan-400/10 border border-cyan-400/20' : 'bg-red-400/10 border border-red-400/20'
            }`}>
              <div className={positive ? 'text-cyan-400' : 'text-red-400'}>
                {positive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              </div>
              <span className={`text-sm font-black tracking-[0.2em] uppercase ${positive ? 'text-cyan-400' : 'text-red-400'}`}>
                {changeLabel} {changePercent}
              </span>
            </div>

            {footnote && (
              <p className="text-[10px] font-medium tracking-[0.1em] text-gray-500 uppercase max-w-xs">
                {footnote}
              </p>
            )}
          </div>
        </div>

        {/* Decorative corner accent */}
        <div className="absolute bottom-0 left-0 w-24 h-[1px] bg-gradient-to-r from-amber-500/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-[1px] h-24 bg-gradient-to-t from-amber-500/40 to-transparent" />
      </div>

      <style jsx global>{`
        @font-face {
          font-family: 'LuxurySerif';
          src: local('Times New Roman');
        }
        .font-serif {
          font-family: 'LuxurySerif', serif;
        }
      `}</style>
    </div>
  )
}
