# Krypttrac 👑

> A clean, modern cryptocurrency dashboard for kings. Real-time prices, glass UI, watchlists, movers, alerts, and a slick user experience without the clutter. Built for speed, style, and simplicity.

[![CI](https://github.com/brandonlacoste9-tech/krypttrac.com/workflows/CI/badge.svg)](https://github.com/brandonlacoste9-tech/krypttrac.com/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)

## ✨ Features

- 📊 **Real-time Cryptocurrency Prices** - Live data from CoinGecko API
- 🎨 **Glass Morphism UI** - Modern, beautiful glass-effect design
- 📱 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- 🔍 **Advanced Search** - Find any cryptocurrency quickly
- 📈 **Top Movers** - Track biggest gainers and losers
- ⭐ **Watchlist** - Save and monitor your favorite cryptos
- 💼 **Portfolio Tracking** - Manage your crypto investments
- 🔔 **Price Alerts** - Get notified of significant price changes
- ⚡ **Lightning Fast** - Built with Next.js 14 for optimal performance

## 🚀 Quick Start

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/brandonlacoste9-tech/krypttrac.com.git
cd krypttrac.com

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Documentation

Comprehensive documentation is available in the [docs](./docs) directory:

- [Installation Guide](./docs/installation.md) - Detailed setup instructions
- [Architecture Overview](./docs/architecture.md) - System design and structure
- [Development Guide](./docs/development.md) - Best practices and workflows
- [Deployment Guide](./docs/deployment.md) - Production deployment
- [Contributing Guidelines](./CONTRIBUTING.md) - How to contribute

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **API**: [CoinGecko](https://www.coingecko.com/en/api)

## 🏗️ Project Structure

```
krypttrac.com/
├── .devcontainer/       # VS Code dev container
├── .github/             # GitHub Actions & templates
├── app/                 # Next.js app directory
│   ├── page.tsx        # Home page
│   ├── alerts/         # Price alerts
│   ├── portfolio/      # Portfolio tracking
│   └── watchlist/      # Watchlist page
├── components/          # React components
├── lib/                 # Utility functions
├── types/               # TypeScript definitions
└── docs/                # Documentation
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](./CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🔐 Security

Security is important to us. Please see our [Security Policy](./SECURITY.md) for reporting vulnerabilities.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- [CoinGecko](https://www.coingecko.com/) for the cryptocurrency API
- [Vercel](https://vercel.com/) for hosting and deployment
- All our [contributors](https://github.com/brandonlacoste9-tech/krypttrac.com/graphs/contributors)

## 📧 Contact

- GitHub: [@brandonlacoste9-tech](https://github.com/brandonlacoste9-tech)
- Issues: [GitHub Issues](https://github.com/brandonlacoste9-tech/krypttrac.com/issues)
- Discussions: [GitHub Discussions](https://github.com/brandonlacoste9-tech/krypttrac.com/discussions)

---

**Built with ❤️ by the Krypttrac team**
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

\`\`\`bash
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
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see the dashboard.

## Project Structure

\`\`\`
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
\`\`\`

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
