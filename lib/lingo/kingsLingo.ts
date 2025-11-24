// Street Kings Lingo Translation System
// Finance terms → King language

export const kingsLingo = {
  // Portfolio & Value
  'Portfolio Value': 'Your Empire',
  'Total Portfolio': 'Total Stack',
  'Your Portfolio': 'Your Bag',

  // Status & Features
  'Real-Time Updates': 'Live Juice',
  'Premium Status': 'King Status',
  'Premium Feature': 'King-Level',
  'Live': 'Juiced',
  'Active': 'Locked In',

  // Market Movements
  'Top Gainers': "Moonin' Right Now",
  'Top Losers': "Takin' L's Today",
  'Market Movers': "What's Poppin'",
  'Trending': 'On Fire',

  // Price Actions
  'Price Up': 'Moonin',
  'Price Down': 'Dipping',
  'All-Time High': 'Peak Performance',
  'New ATH': 'New Peak Unlocked',
  'Bullish': 'We Up',
  'Bearish': 'We Down',

  // User Actions
  'View Dashboard': 'Check Your Bag',
  'Track': 'Watch',
  'Add to Watchlist': 'Keep Eyes On',
  'Sign Up': 'Join the Kingdom',
  'Sign In': 'Enter the Throne',
  'Sign Out': 'Peace Out',

  // Stats
  'Daily Change': "Today's Moves",
  'Weekly Change': 'This Week',
  '24h Change': '24h Moves',
  'Volume': 'The Flow',
  'Market Cap': 'Total Worth',

  // Alerts & Notifications
  'Price Alert': 'Bag Alert',
  'Alert Triggered': 'Heads Up King',

  // Misc
  'Loading': 'Cookin...',
  'Refreshing': 'Refreshin the Juice',
  'Error': 'Hold Up',
  'Success': 'W',
  'Coins': 'Bags',
  'Tracking': 'Watchin',
} as const;

// Type for lingo keys
export type LingoKey = keyof typeof kingsLingo;

// Translate function
export function translate(key: LingoKey): string {
  return kingsLingo[key] || key;
}

// Format percentage with W/L
export function formatPercentWithWL(percent: number): string {
  const sign = percent >= 0 ? '+' : '';
  const wl = percent >= 0 ? ' (W)' : ' (L)';
  return `${sign}${percent.toFixed(2)}%${wl}`;
}

// Get hype level based on percentage
export function getHypeLevel(percent: number): 'fire' | 'solid' | 'mid' | 'rough' | 'oof' {
  if (percent >= 20) return 'fire';      // 🔥
  if (percent >= 10) return 'solid';     // 💪
  if (percent >= 0) return 'mid';        // 👀
  if (percent >= -10) return 'rough';    // 😤
  return 'oof';                          // 💀
}

// Get emoji for hype level
export function getHypeEmoji(percent: number): string {
  const level = getHypeLevel(percent);
  const emojis = {
    fire: '🔥',
    solid: '💪',
    mid: '👀',
    rough: '😤',
    oof: '💀',
  };
  return emojis[level];
}

// Voice line translations
export const voiceLines = {
  appOpen: "Yooo FAAM, let's get this bread!",
  welcome: "Welcome back King, your bag awaits!",
  portfolioUp10: "Your bag is moonin', King!",
  portfolioUp20: "We stackin' W's today! Let's GO!",
  newATH: "New peak unlocked! Crown secured!",
  priceAlert: (coin: string, price: string) =>
    `Heads up King! ${coin} just hit $${price}!`,
  bigWin: "That's a FAT W right there!",
  signIn: "King's in the building! Let's work!",
  signOut: "Peace out King, secure the bag!",
  error: "Hold up, something ain't right.",
};
