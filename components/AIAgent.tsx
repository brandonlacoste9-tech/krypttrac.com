'use client'

import { useState, useRef, useEffect } from 'react'
import { Sparkles, Send, X, TrendingUp } from 'lucide-react'
import { parseUsdString } from '@/lib/dashboard-context'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface AIAgentProps {
  dashboardData?: {
    stablecoins?: Array<{ price: string; [key: string]: unknown }>
    [key: string]: unknown
  }
  portfolioData?: Record<string, unknown>
}

export function AIAgent({ dashboardData, portfolioData }: AIAgentProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const hasDepegs = dashboardData?.stablecoins?.some((coin: { price: string }) => {
    const n = parseUsdString(coin.price)
    return Number.isFinite(n) && n > 0 && n < 0.99
  })

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    const handleOpenAgent = (e: CustomEvent) => {
      setIsOpen(true)
      if (e.detail?.message) {
        setTimeout(() => {
          setInput(e.detail.message)
        }, 100)
      }
    }
    
    window.addEventListener('OPEN_AI_AGENT', handleOpenAgent as EventListener)
    return () => window.removeEventListener('OPEN_AI_AGENT', handleOpenAgent as EventListener)
  }, [])

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          dashboardData,
          portfolioData,
        }),
      })

      const data = await response.json()

      if (data.error) throw new Error(data.error)

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.reply,
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '❌ Error connecting to AI. Check your API key.',
        timestamp: new Date(),
      }])
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 right-6 z-50 ${
          hasDepegs
            ? 'bg-gradient-to-br from-red-600 to-orange-600 animate-pulse'
            : 'bg-gradient-to-br from-amber-500 to-amber-700'
        } text-black rounded-full p-4 shadow-[0_10px_40px_rgba(251,191,36,0.3)] hover:scale-110 hover:shadow-[0_10px_50px_rgba(251,191,36,0.5)] transition-all duration-300`}
        title={hasDepegs ? 'Stablecoin Alert!' : 'Ask kryptotrac AI'}
      >
        {hasDepegs ? <TrendingUp className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
      </button>
    )
  }

  return (
    <div className="fixed bottom-24 right-6 w-[400px] h-[600px] bg-[#0C0C0E]/95 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.5)] flex flex-col z-50 overflow-hidden">
      {/* Header */}
      <div className={`p-6 border-b ${hasDepegs ? 'border-red-500/20 bg-red-500/5' : 'border-white/5'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`${hasDepegs ? 'bg-gradient-to-br from-red-600 to-orange-600' : 'bg-gradient-to-br from-amber-500 to-amber-700'} rounded-2xl p-3`}>
              {hasDepegs ? <TrendingUp className="w-5 h-5 text-black" /> : <Sparkles className="w-5 h-5 text-black" />}
            </div>
            <div>
              <h3 className="font-black text-[11px] tracking-[0.3em] text-white uppercase">kryptotrac AI</h3>
              <p className="text-[9px] tracking-[0.2em] text-gray-600 font-medium uppercase">
                {hasDepegs ? '⚠️ Stablecoin Alert' : 'Precision Intelligence'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-9 h-9 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/20 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.length === 0 && (
          <div className="text-center mt-12 space-y-5">
            {hasDepegs ? (
              <>
                <div className="text-6xl">⚠️</div>
                <p className="text-lg font-serif tracking-widest text-red-400 uppercase">De-Peg Alert</p>
                <p className="text-[10px] tracking-[0.3em] text-gray-500 font-medium uppercase">Stablecoin price deviation detected</p>
                <button
                  onClick={() => setInput('Why are stablecoins off peg?')}
                  className="mt-4 px-6 py-3 bg-red-500/10 border border-red-500/20 rounded-2xl text-[10px] font-black tracking-[0.3em] text-red-400 hover:bg-red-500/20 transition-all uppercase"
                >
                  Analyze Alert
                </button>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto">
                  <Sparkles className="w-7 h-7 text-amber-500" />
                </div>
                <p className="text-lg font-serif tracking-widest text-white uppercase">Intelligence Ready</p>
                <div className="mt-6 text-left bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-3">
                  <p className="text-[9px] font-black tracking-[0.3em] text-amber-500/60 uppercase mb-4">Suggested Queries</p>
                  <p className="text-xs text-gray-400 font-light tracking-wide">&ldquo;Why is Solana pumping?&rdquo;</p>
                  <p className="text-xs text-gray-400 font-light tracking-wide">&ldquo;Should I buy XRP now?&rdquo;</p>
                  <p className="text-xs text-gray-400 font-light tracking-wide">&ldquo;Is my portfolio safe?&rdquo;</p>
                  <p className="text-xs text-gray-400 font-light tracking-wide">&ldquo;Explain this market dump&rdquo;</p>
                </div>
              </>
            )}
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
              msg.role === 'user'
                ? 'bg-gradient-to-br from-amber-500 to-amber-700 text-black'
                : 'bg-white/[0.03] border border-white/5 text-gray-200'
            }`}>
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              <p className="text-[9px] mt-1.5 opacity-50 font-medium">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white/[0.03] border border-white/5 rounded-2xl px-4 py-3 flex items-center gap-3">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-[10px] tracking-widest text-gray-500 uppercase font-medium">Processing...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/5">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !loading && sendMessage()}
            placeholder="Ask about crypto..."
            disabled={loading}
            className="flex-1 bg-white/5 border border-white/5 rounded-2xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-amber-500/30 focus:bg-white/[0.08] transition-all font-medium disabled:opacity-50"
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="bg-gradient-to-br from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 disabled:opacity-30 p-3 rounded-2xl transition-all hover:scale-105 duration-300"
          >
            <Send className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>
    </div>
  )
}
