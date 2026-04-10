import { Anthropic } from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { fetchDashboardSnapshot } from '@/lib/server/market-fetch'
import { parseUsdString } from '@/lib/dashboard-context'
import { fetchTwitterSentiment, fetchDefiLlamaYields } from '@/lib/server/apify'

export const maxDuration = 60

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
📊 LIVE MARKET DATA (kryptotrac Intelligence)

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

🌐 YOUR PORTFOLIO:
${portfolioData ? JSON.stringify(portfolioData) : 'No portfolio connected — user is tracking the global market view'}
`

    const systemPrompt = `You are the kryptotrac AI - a precision-focused, ultra-premium wealth intelligence system.

${marketContext}

Your Personality & Role:
- You are speaking to a high-level institutional client. Be professional, sharp, and data-driven.
- Keep responses SHORT, PUNCHY & DIRECT (3-4 sentences max unless auditing).
- Use sophisticated crypto terminology (whales, liquidity depth, alpha, harvesting) but keep it clean.
- If the user asks for an "Audit", read their 'YOUR PORTFOLIO' data:
  1. Briefly summarize total net worth and performance.
  2. Identify the strongest performing connection.
  3. Flag potential risks or over-concentrations.
  4. Suggest a precision-driven move.
- If Stablecoin < $0.99 → SHOUT "⚠️ DE-PEG ALERT".
- End with "kryptotrac Analytics" or "NFA" (Not Financial Advice).

Act fast, sound like a data scientist mixed with an on-chain analyst.`

    const anthropic = new Anthropic({ apiKey })

    const tools: Anthropic.Tool[] = [
      {
        name: 'get_twitter_sentiment',
        description: 'Fetch real-time Twitter/X chatter and sentiment about a specific crypto asset using Apify. Use this whenever the user asks about sentiment, social media, or what people are saying online.',
        input_schema: {
          type: 'object',
          properties: { asset: { type: 'string', description: 'The crypto asset to search for (e.g. "Solana" or "$SOL")' } },
          required: ['asset']
        }
      },
      {
        name: 'get_defi_yields',
        description: 'Search for the latest DeFi yields or APY for a specific protocol or global stablecoins. Use this when the user asks for high yields, staking rates, or DefiLlama data.',
        input_schema: {
          type: 'object',
          properties: { protocol: { type: 'string', description: 'The protocol to search for (e.g. "Aave", "Curve", or leave empty for total market yields)' } }
        }
      }
    ]

    const messages: Anthropic.MessageParam[] = [{ role: 'user', content: message }]

    let response = await anthropic.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 500,
      system: systemPrompt,
      messages,
      tools
    })

    // Handle tool execution if the AI decided to use Apify
    if (response.stop_reason === 'tool_use') {
      const toolUse = response.content.find(c => c.type === 'tool_use') as Anthropic.ToolUseBlock;
      let toolResultText = ""

      if (toolUse.name === 'get_twitter_sentiment') {
        const input = toolUse.input as { asset: string }
        toolResultText = await fetchTwitterSentiment(input.asset)
      } else if (toolUse.name === 'get_defi_yields') {
        const input = toolUse.input as { protocol?: string }
        toolResultText = await fetchDefiLlamaYields(input.protocol)
      }

      // Add assistant command and tool response back to the conversation
      messages.push({ role: 'assistant', content: response.content })
      messages.push({
        role: 'user',
        content: [
          {
            type: 'tool_result',
            tool_use_id: toolUse.id,
            content: toolResultText,
          }
        ]
      })

      // Get final response synthesizing the Apify data
      response = await anthropic.messages.create({
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 500,
        system: systemPrompt,
        messages,
        tools
      })
    }

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
