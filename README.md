# krypttrac.com

Krypttrac — A premium crypto dashboard for kings. Real-time prices, neon glassmorphism UI, watchlists, movers, alerts, and a slick user experience without the clutter. Built for speed, style, and simplicity.

## Features

- **Premium Neon Glassmorphism**: Deep space gradient background with enhanced glass effects
- **Hero Section**: Eye-catching logo, "Built for Kings" tagline, and CTA buttons
- **Stat Cards**: Portfolio value, real-time updates, and premium status indicators
- **Market Movers**: Top Gainers and Top Losers 24h with live data
- **Fully Responsive**: Mobile-first design that looks KOOL AF on all devices
- **Mock Data**: Development data in `lib/mockMarkets.ts` (no API calls yet)

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Lucide Icons

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) to see the dashboard.

## Project Structure

```
krypttrac.com/
├── app/
│   ├── globals.css          # Enhanced glassmorphism styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main dashboard page
├── components/
│   ├── Hero.tsx             # Hero section with logo and CTAs
│   ├── StatCards.tsx        # Portfolio/Real-Time/Premium cards
│   ├── TopMovers.tsx        # Top Gainers/Losers display
│   ├── GlassCard.tsx        # Reusable glass card component
│   ├── Header.tsx           # Navigation header
│   └── ...
├── lib/
│   ├── mockMarkets.ts       # Mock crypto data for development
│   ├── api.ts               # API utilities (future use)
│   └── utils.ts             # Helper functions
├── types/
│   └── crypto.ts            # TypeScript type definitions
└── public/                  # Static assets
```

## Step 1 – Dashboard Shell

This is Step 1 of the Krypttrac redesign, focusing on:
- ✅ Premium neon glassmorphism design
- ✅ Hero section with brand identity
- ✅ Stat cards for key metrics
- ✅ Top Gainers/Losers sections
- ✅ Deep space gradient background
- ✅ Mobile-first responsive design
- ✅ Mock data implementation

## Next Steps

- Add real-time API integration
- Implement watchlist functionality
- Add portfolio tracking
- Create alerts system
- Add search functionality
- Enhance animations and interactions

## License

See LICENSE file for details.
