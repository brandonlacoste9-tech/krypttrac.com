import { ApifyClient } from 'apify-client'

const apifyToken = process.env.APIFY_API_KEY
// Initialize the ApifyClient with API token
const client = apifyToken ? new ApifyClient({ token: apifyToken }) : null

export async function fetchTwitterSentiment(query: string) {
  if (!client) {
    return "Apify API key is not configured. Please add APIFY_API_KEY to your environment."
  }

  try {
    // Run the popular Twitter Scraper (quacker/twitter-url-scraper or another reliable one)
    // For demonstration and speed, we use a lightweight scraper configuration
    // Often, 'apidojo/tweet-scraper' or 'quacker/twitter-scraper' is standard. We will use 'apidojo/tweet-scraper'
    const run = await client.actor("apidojo/tweet-scraper").call({
      searchTerms: [query],
      maxItems: 5,
      sort: "Latest"
    })

    const { items } = await client.dataset(run.defaultDatasetId).listItems()
    
    if (!items || items.length === 0) {
      return `No recent tweets found for ${query}.`
    }

    const compiledTweets = items
      .filter((tweet) => tweet.text)
      // @ts-expect-error - dynamic apify return type
      .map((tweet) => `[@${tweet.author?.userName || 'unknown'}]: ${tweet.text}`)
      .join('\n\n')

    return `Recent Twitter chatter about ${query}:\n${compiledTweets}\n\nAnalyze the sentiment of these tweets as Positive, Neutral, or Negative.`
  } catch (error: unknown) {
    console.error("Apify Twitter Scraper Error:", error)
    return `Failed to scrape Twitter: ${error instanceof Error ? error.message : String(error)}`
  }
}

export async function fetchDefiLlamaYields(protocol?: string) {
  if (!client) {
    return "Apify API key is not configured."
  }

  try {
    // There are community DeFiLlama actors, but if none are reliable, we can use a Google Search scraper to find news,
    // OR we can just hit the Apify Google Search actor to find the latest APY for the requested protocol.
    // Let's use standard google-search scraper for the highest yield info
    const run = await client.actor("apify/google-search-scraper").call({
      queries: protocol ? [`${protocol} protocol current APY yield defillama site:defillama.com`] : ["top stablecoin yields defi 2024"],
      resultsPerPage: 3,
    })

    const { items } = await client.dataset(run.defaultDatasetId).listItems()
    
    // @ts-expect-error - dynamic apify return type
    const Snippets = items[0]?.organicResults?.map((res: Record<string, unknown>) => `- ${res.title}: ${res.description}`).join('\n') || "No data found."
    return `Latest DeFi Yield data found via Apify Search:\n${Snippets}`
  } catch (error: unknown) {
    console.error("Apify DeFi Scraper Error:", error)
    return `Failed to fetch DeFi data: ${error instanceof Error ? error.message : String(error)}`
  }
}
