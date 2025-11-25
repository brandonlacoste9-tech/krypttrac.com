'use client'

import { ArrowUp, ArrowDown, Plus, RefreshCw } from 'lucide-react'

export function QuickActions() {
  const actions = [
    { icon: ArrowUp, label: 'Send', color: '#FFD76C' },
    { icon: ArrowDown, label: 'Receive', color: '#FFD76C' },
    { icon: Plus, label: 'Buy', color: '#FFD76C' },
    { icon: RefreshCw, label: 'Swap', color: '#FFD76C' },
  ]

  return (
    <div className="px-6 my-6">
      <div className="flex items-center justify-around gap-4">
        {actions.map((action, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2">
            {/* Gold Coin Button */}
            <button className="gold-coin">
              <action.icon 
                className="w-6 h-6"
                style={{ color: '#1A0B2E' }}
                strokeWidth={3}
              />
            </button>
            {/* Label */}
            <span className="text-xs text-gray-300 font-medium">{action.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
