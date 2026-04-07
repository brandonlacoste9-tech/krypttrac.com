import { Anthropic } from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { fetchDashboardSnapshot } from '@/lib/server/market-fetch'
import { parseUsdString } from '@/lib/dashboard-context'

export async function POST(request: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey?.trim()) {
    return NextResponse.json(
      { error: 'AI is not configured. Add ANTHROPIC_API_KEY to your environment.' },
      { status: 503 }
    )
  }

  try {
    const { message, dashboardData: bodyDashboard, portfolioData } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    let gainers = bodyDashboard?.gainers || []
    let losers = bodyDashboard?.losers || []
    let stablecoins = bodyDashboard?.stablecoins || []

    if (!gainers.length && !losers.length) {
      const snap = await fetchDashboardSnapshot()
      gainers = snap.aiContext.gainers
      losers = snap.aiContext.losers
      stablecoins = snap.aiContext.stablecoins
    }

    const marketContext = `
📊 LIVE MARKET DATA (Built for Kings 👑)

🔥 MOOMIN' RIGHT NOW:
${gainers
  .slice(0, 5)
  .map((c: { name: string; price: string; change: string }, i: number) => `#${i + 1} ${c.name}: ${c.price} (${c.change})`)
  .join('\n') || 'No gainers data'}

📉 TAKIN' L'S TODAY:
${losers
  .slice(0, 5)
  .map((c: { name: string; price: string; change: string }, i: number) => `#${i + 1} ${c.name}: ${c.price} (${c.change})`)
  .join('\n') || 'No losers data'}

💵 STABLECOINS:
${stablecoins
  .map((c: { symbol: string; price: string; change: string }) => {
    const px = parseUsdString(c.price)
    const depeg = Number.isFinite(px) && px > 0 && px < 0.99 ? ' ⚠️ DE-PEG' : ''
    return `${c.symbol}: ${c.price} (${c.change})${depeg}`
  })
  .join('\n') || 'No stablecoin data'}

👑 YOUR EMPIRE:
${portfolioData ? JSON.stringify(portfolioData) : 'No portfolio connected — user is tracking the global market view'}
`

    const systemPrompt = `You are the Krypto Kings AI - crypto advisor for KINGS 👑

${marketContext}

Your Personality:
- SHORT & DIRECT (2-3 sentences max)
- HYPE THE WINS 🚀
- WARN THE RISKS ⚠️
- USE CRYPTO SLANG (mooning, aping, diamond hands, rekt)
- BE REAL (no corporate talk)

Rules:
- Stablecoin < $0.99 → "⚠️ DE-PEG ALERT"
- Coin up >5% → "🔥 MOOMIN'"
- Coin down >3% → "📉 TAKIN' L's"
- Always reference LIVE data when listing movers
- End with "NFA 👑" (Not Financial Advice)

Be the advisor kings deserve - smart, fast, and no BS.`

    const anthropic = new Anthropic({ apiKey })

    const response = await anthropic.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 500,
      system: systemPrompt,
      messages: [{ role: 'user', content: message }],
    })

    const reply =
      response.content[0].type === 'text' ? response.content[0].text : 'Unable to process request'

    return NextResponse.json({
      reply,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Agent error:', error)
    return NextResponse.json({ error: 'Failed to get AI response' }, { status: 500 })
  }
}
