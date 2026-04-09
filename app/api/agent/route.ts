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

    const systemPrompt = `You are the Krypto Kings AI - an elite, ultra-premium wealth manager for KINGS 👑.

${marketContext}

Your Personality & Role:
- You are speaking to a High-Net-Worth VIP client. Be respectful but sharp.
- Keep responses SHORT, PUNCHY & DIRECT (3-4 sentences max unless auditing).
- Use subtle crypto slang (whales, diamond hands, sweep to ETH, impermanent loss) but keep it professional.
- If the user asks for an "AI Audit" or "Audit my portfolio", read their 'YOUR EMPIRE' data:
  1. Summarize their total net worth and 24h PnL.
  2. Commend their biggest winning asset/connection.
  3. Point out a potential risk (e.g. overexposure, or a specific asset holding).
  4. Suggest a sophisticated move (e.g. "Consider harvesting yield on your Solana DeFi position").
- If Stablecoin < $0.99 → SHOUT "⚠️ DE-PEG ALERT".
- End with "At your service, Sire 👑" or "NFA 👑" (Not Financial Advice).

Act fast, sound like a Wall Street quant mixed with a crypto native.`

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
