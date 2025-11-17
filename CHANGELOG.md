# Changelog

All notable changes to Krypttrac will be documented in this file.

## [Unreleased]

## [1.1.0] - 2025-11-17

### Added - Step 2: Live Markets Integration

- **Real-time Market Data**: Integrated CoinGecko API for live cryptocurrency prices and market data
- **API Route**: Created `/api/markets` endpoint with 60-second caching for optimal performance
- **Typed API Client**: Added `lib/markets.ts` with TypeScript interfaces for type-safe API interactions
- **Graceful Fallback**: Automatic fallback to mock data if API is unavailable or fails
- **Loading States**: Subtle shimmer loading animation while fetching market data
- **Error Handling**: Premium-styled status pill showing connection state
- **Environment Configuration**: Support for `NEXT_PUBLIC_MARKET_API_BASE` environment variable
- **Sparkline Support**: Extended data types to support 7-day price sparklines (for future charts)

### Changed

- Updated `TopMovers` component to display loading states
- Enhanced main page with live data fetching and error handling
- Updated `types/crypto.ts` to include optional sparkline data
- Modified `lib/mockMarkets.ts` to include sample sparkline data for consistency

### Technical Details

- Cache strategy: 60-second revalidation on server-side
- Client-side refresh: Automatic data refresh every 60 seconds
- Fallback mechanism: Uses local mock data if API request fails
- Styling: All existing neon glassmorphism styling preserved

## [1.0.0] - 2025-11-17

### Added - Step 1: Dashboard Shell

- Premium neon glassmorphism design system
- Hero section with brand identity
- Stat cards for portfolio metrics
- Top Gainers/Losers market movers sections
- Deep space gradient background
- Mobile-first responsive design
- Mock data implementation for development
- Navigation header with logo
- Glass card reusable component
- TypeScript type definitions for crypto data
