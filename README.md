# 👑 Krypto Kings

**Built for Kings 👑**

Premium crypto portfolio tracking and management platform for sophisticated investors.

![Krypto Kings](https://img.shields.io/badge/Built_for-Kings_👑-purple?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)

## 🌟 Features

- **Real-time Portfolio Tracking** - Live crypto prices and portfolio analytics
- **King-mode AI Agent** - Claude-powered crypto advisor with market insights
- **Premium Chat Tiers** - Exclusive Gold ($24.99/mo) and Platinum ($49.99/mo) memberships
- **Royal Design** - Purple, pink, and gold luxury interface
- **Stablecoin Monitoring** - Auto-alerts for de-peg events
- **Multi-tier Access** - Exclusive features for premium kings

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **AI**: Anthropic Claude (Haiku model)
- **Auth**: Supabase Authentication
- **Database**: Supabase PostgreSQL
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/brandonlacoste9-tech/krypttrac.com.git
cd krypttrac.com

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see your kingdom!

## 🔑 Environment Setup

1. **Anthropic API Key** (Required for AI agent)
   - Get your key at: https://console.anthropic.com/
   - Add to `.env.local`: `ANTHROPIC_API_KEY=your_key_here`

2. **Supabase Setup** (Required for auth)
   - Create project at: https://supabase.com
   - Add your project URL and keys to `.env.local`

3. **Optional APIs**
   - CoinGecko for real crypto data
   - Stripe for payment processing

## 🌐 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/brandonlacoste9-tech/krypttrac.com)

```bash
# Using Vercel CLI
npm install -g vercel
vercel --prod
```

**Important**: Add all environment variables in Vercel dashboard:
- Settings → Environment Variables → Add each variable

## 💎 Membership Tiers

### Gold King - $24.99/mo
- 👑 Kings Lounge access
- 💰 Unlimited coin tracking
- 📊 Advanced analytics
- 🎯 Priority support

### Platinum King - $49.99/mo
- ✨ Everything in Gold
- 🤖 AI chat commands (@ai)
- 🔊 Voice announcements
- 👨‍💼 White-glove support
- 💎 Platinum badge with pulse animation

## 🏗️ Project Structure

```
krypto-kings/
├── app/
│   ├── api/agent/          # AI API endpoint
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles
├── components/
│   ├── AIAgent.tsx         # AI chat interface
│   ├── Header.tsx          # Navigation header
│   ├── Footer.tsx          # Footer with branding
│   ├── PremiumChat.tsx     # Premium membership chat
│   └── TierBadge.tsx       # Membership tier badges
├── public/
│   ├── kk-logo.png         # Golden KK crown
│   └── kk-logo-platinum.png # Silver KK crown
└── lib/
    └── supabase/           # Supabase client setup
```

## 🎨 Branding

- **Name**: Krypto Kings
- **Domain**: kryptokings.app
- **Tagline**: "Built for Kings 👑"
- **Colors**:
  - Purple: `#581c87` to `#a855f7`
  - Pink: `#db2777` to `#f472b6`
  - Gold: `#eab308` to `#fbbf24`
- **Logo**: Golden "KK" with royal crown

## 🧪 Development

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Run production build locally
npm start

# Lint code
npm run lint

# Type check
npx tsc --noEmit
```

## 📱 Features by Component

### AIAgent
- Real-time AI responses using Claude Haiku
- Stablecoin de-peg alerts (visual indicator)
- Crypto slang and king-mode personality
- Context-aware with dashboard data

### PremiumChat
- Exclusive Gold/Platinum member chat
- Tier-based access control
- Real-time messaging
- Integrated TierBadge display

### TierBadge
- 4 tiers: Free, Silver, Gold, Platinum
- Pulse animation for Platinum
- Size variants: sm, md, lg
- Shows custom logos and gradients

## 🔐 Security

- Environment variables for sensitive keys
- Supabase Row Level Security (RLS)
- API rate limiting recommended
- No credentials in code

## 📄 License

MIT License - Built for Kings

## 🤝 Credits

Powered by **Opus Magnum** - Colony OS

Built with Claude Code by Anthropic

---

© 2025 Krypto Kings. Built for Kings 👑 Powered by premium technology.

## 🚦 Status

- ✅ AI Agent - Live
- ✅ Premium Chat - Live
- ✅ Badge System - Live
- ✅ Supabase Auth - Live
- 🔄 Payment Integration - Coming Soon
- 🔄 Real Crypto API - Coming Soon
