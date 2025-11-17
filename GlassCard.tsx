0. Folder Structure
krypttrac/
  package.json
  next.config.mjs
  postcss.config.mjs
  tailwind.config.ts
  tsconfig.json
  .gitignore
  README.md
  src/
    app/
      layout.tsx
      page.tsx
      bag/
        page.tsx
      pings/
        page.tsx
      api/
        markets/route.ts
    components/
      ui/GlassCard.tsx
      ui/Navbar.tsx
      dashboard/WatchlistRow.tsx
      dashboard/TopMovers.tsx
      dashboard/NetWorthCard.tsx
    hooks/
      usePrices.ts
      useWatchlist.ts
    lib/
      coingecko.ts
      utils.ts
    styles/
      globals.css

1. package.json
{
  "name": "krypttrac",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.2.5",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "zustand": "^4.5.4",
    "axios": "^1.7.7",
    "recharts": "^2.12.7",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.2"
  },
  "devDependencies": {
    "@types/node": "^22.7.4",
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.11.1",
    "eslint-config-next": "^14.2.5",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.13",
    "typescript": "^5.6.3"
  }
}

2. next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  }
};

export default nextConfig;

3. tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        krypt: {
          bg: "#020617",
          card: "rgba(15, 23, 42, 0.78)",
          border: "rgba(148, 163, 184, 0.4)",
          cyan: "#22d3ee",
          gold: "#fbbf24",
          red: "#f97373",
          green: "#4ade80"
        }
      },
      boxShadow: {
        "glass": "0 18px 45px rgba(15, 23, 42, 0.85)",
        "neon-cyan": "0 0 35px rgba(34,211,238,0.65)",
        "neon-gold": "0 0 35px rgba(251,191,36,0.65)"
      },
      borderRadius: {
        "3xl": "1.5rem"
      },
      backgroundImage: {
        "krypt-gradient":
          "radial-gradient(circle at top, #0f172a 0, #020617 45%, #000 100%)"
      }
    }
  },
  plugins: []
};

export default config;

4. postcss.config.mjs
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};

5. tsconfig.json
{
  "compilerOptions": {
    "target": "ESNext",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "paths": {
      "@/*": ["./src/*"]
    },
    "types": ["node"]
  },
  "include": ["next-env.d.ts", "src/**/*.ts", "src/**/*.tsx"],
  "exclude": ["node_modules"]
}

6. src/styles/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: dark;
}

body {
  @apply bg-krypt-bg text-slate-100 antialiased;
  background-image: theme("backgroundImage.krypt-gradient");
  background-attachment: fixed;
}

/* Glass + neon utilities */
.glass {
  @apply bg-krypt-card border border-krypt-border rounded-3xl shadow-glass backdrop-blur-2xl;
}

.glass-heavy {
  @apply bg-slate-900/80 border border-krypt-border shadow-neon-cyan backdrop-blur-3xl;
}

.glass-border {
  border: 1px solid rgba(148, 163, 184, 0.5);
}

.neon-cyan {
  box-shadow: 0 0 35px rgba(34, 211, 238, 0.9);
}

.neon-gold {
  box-shadow: 0 0 35px rgba(251, 191, 36, 0.9);
}

.glass-hover {
  @apply transition-transform duration-150 hover:-translate-y-1 hover:shadow-neon-cyan;
}

7. src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

8. src/lib/coingecko.ts
import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3";

export type MarketCoin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  sparkline_in_7d?: { price: number[] };
  market_cap_rank?: number;
};

export async function fetchMarkets(): Promise<MarketCoin[]> {
  const res = await axios.get<MarketCoin[]>(`${BASE_URL}/coins/markets`, {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 50,
      page: 1,
      sparkline: true,
      price_change_percentage: "24h"
    }
  });
  return res.data;
}

export async function fetchTopMovers() {
  const markets = await fetchMarkets();
  const sorted = [...markets].sort(
    (a, b) =>
      (b.price_change_percentage_24h ?? 0) -
      (a.price_change_percentage_24h ?? 0)
  );

  const gainers = sorted.slice(0, 5);
  const losers = sorted.slice(-5).reverse();

  return { gainers, losers };
}

9. API route: src/app/api/markets/route.ts
import { NextResponse } from "next/server";
import { fetchMarkets, fetchTopMovers } from "@/lib/coingecko";

export async function GET() {
  try {
    const [markets, movers] = await Promise.all([
      fetchMarkets(),
      fetchTopMovers()
    ]);

    return NextResponse.json({
      markets,
      movers
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch markets" },
      { status: 500 }
    );
  }
}

10. Hooks
src/hooks/usePrices.ts
"use client";

import useSWR from "swr";
import axios from "axios";
import { MarketCoin } from "@/lib/coingecko";

type MarketsResponse = {
  markets: MarketCoin[];
  movers: {
    gainers: MarketCoin[];
    losers: MarketCoin[];
  };
};

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export function usePrices() {
  const { data, error, isLoading } = useSWR<MarketsResponse>(
    "/api/markets",
    fetcher,
    {
      refreshInterval: 30000
    }
  );

  return {
    markets: data?.markets ?? [],
    gainers: data?.movers.gainers ?? [],
    losers: data?.movers.losers ?? [],
    isLoading,
    isError: !!error
  };
}

src/hooks/useWatchlist.ts
"use client";

import { useEffect } from "react";
import { create } from "zustand";

type WatchlistState = {
  ids: string[];
  toggle: (id: string) => void;
};

const STORAGE_KEY = "krypttrac_watchlist";

export const useWatchlistStore = create<WatchlistState>((set, get) => ({
  ids: [],
  toggle: (id: string) => {
    const current = get().ids;
    const exists = current.includes(id);
    const next = exists
      ? current.filter(x => x !== id)
      : [...current, id];

    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }

    set({ ids: next });
  }
}));

export function useWatchlistHydrate() {
  const setIds = useWatchlistStore.setState;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        setIds({ ids: parsed });
      }
    } catch {}
  }, [setIds]);
}

11. Core UI Components
src/components/ui/GlassCard.tsx
"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  heavy?: boolean;
  hover?: boolean;
};

export function GlassCard({ children, className, heavy, hover }: Props) {
  return (
    <div
      className={cn(
        heavy ? "glass-heavy" : "glass",
        hover && "glass-hover",
        "transition-all",
        className
      )}
    >
      {children}
    </div>
  );
}

src/components/ui/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Home" },
  { href: "/bag", label: "Bag" },
  { href: "/pings", label: "Pings" }
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-4 left-1/2 z-40 -translate-x-1/2">
      <nav className="glass flex items-center gap-4 px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-400 to-krypt-gold flex items-center justify-center text-sm font-bold shadow-neon-cyan">
            K
          </span>
          <span className="text-sm font-semibold tracking-wide">
            Krypttrac
          </span>
        </div>
        <div className="ml-4 flex gap-2 text-xs sm:text-sm">
          {items.map(item => {
            const active = item.href === pathname;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3 py-1 transition-colors",
                  active
                    ? "bg-cyan-500/20 text-cyan-300"
                    : "text-slate-300 hover:bg-slate-700/40"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}

src/components/dashboard/NetWorthCard.tsx
import { GlassCard } from "@/components/ui/GlassCard";

export function NetWorthCard() {
  // mock numbers for now
  const netWorth = 128430.23;
  const change = 4.2;

  return (
    <GlassCard className="p-5 sm:p-6 lg:p-7 neon-gold">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            GM, King 👑
          </p>
          <h1 className="mt-2 text-2xl sm:text-3xl font-semibold">
            Your bag today
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Krypttrac keeps your kingdom in view.
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400">Net worth</p>
          <p className="text-2xl sm:text-3xl font-semibold">
            ${netWorth.toLocaleString()}
          </p>
          <p
            className={
              change >= 0 ? "text-emerald-400 text-xs" : "text-rose-400 text-xs"
            }
          >
            {change >= 0 ? "▲" : "▼"} {change.toFixed(2)}% 24h
          </p>
        </div>
      </div>
    </GlassCard>
  );
}

src/components/dashboard/WatchlistRow.tsx
"use client";

import { usePrices } from "@/hooks/usePrices";
import { useWatchlistHydrate, useWatchlistStore } from "@/hooks/useWatchlist";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

export function WatchlistRow() {
  useWatchlistHydrate();
  const { markets, isLoading } = usePrices();
  const ids = useWatchlistStore(s => s.ids);
  const toggle = useWatchlistStore(s => s.toggle);

  const coins =
    ids.length > 0
      ? markets.filter(m => ids.includes(m.id))
      : markets.slice(0, 6);

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-wide text-slate-200">
          Watchlist
        </h2>
        <p className="text-xs text-slate-400">
          Tap to pin / unpin coins to your deck.
        </p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {isLoading && (
          <>
            {Array.from({ length: 4 }).map((_, i) => (
              <GlassCard
                key={i}
                className="h-32 w-48 flex-shrink-0 animate-pulse bg-slate-800/70"
              />
            ))}
          </>
        )}

        {!isLoading &&
          coins.map(c => {
            const isPinned = ids.includes(c.id);
            const pct = c.price_change_percentage_24h ?? 0;
            const up = pct >= 0;
            return (
              <button
                key={c.id}
                onClick={() => toggle(c.id)}
                className="flex-shrink-0 text-left"
              >
                <GlassCard
                  hover
                  className={cn(
                    "h-32 w-48 flex flex-col justify-between p-4",
                    isPinned && "shadow-neon-cyan"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400 uppercase">
                        {c.symbol}
                      </p>
                      <p className="text-sm font-semibold">{c.name}</p>
                    </div>
                    <span className="rounded-full bg-slate-900/60 px-2 py-1 text-[10px] text-slate-300">
                      {isPinned ? "Pinned 👑" : "Tap to pin"}
                    </span>
                  </div>
                  <div className="flex items-end justify-between">
                    <p className="text-lg font-semibold">
                      ${c.current_price.toLocaleString()}
                    </p>
                    <p
                      className={cn(
                        "text-xs font-medium",
                        up ? "text-emerald-400" : "text-rose-400"
                      )}
                    >
                      {up ? "▲" : "▼"} {pct.toFixed(2)}%
                    </p>
                  </div>
                </GlassCard>
              </button>
            );
          })}
      </div>
    </section>
  );
}

src/components/dashboard/TopMovers.tsx
"use client";

import { usePrices } from "@/hooks/usePrices";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

export function TopMovers() {
  const { gainers, losers, isLoading } = usePrices();

  return (
    <section className="grid gap-4 md:grid-cols-2">
      <MoversColumn
        title="Top rockets 🚀"
        description="Kings that led the charge in the last 24h."
        coins={gainers}
        loading={isLoading}
        positive
      />
      <MoversColumn
        title="Top ice ❄️"
        description="Coins that cooled off the hardest."
        coins={losers}
        loading={isLoading}
        positive={false}
      />
    </section>
  );
}

function MoversColumn({
  title,
  description,
  coins,
  loading,
  positive
}: {
  title: string;
  description: string;
  coins: any[];
  loading: boolean;
  positive: boolean;
}) {
  return (
    <GlassCard className="p-4 sm:p-5">
      <div className="mb-3">
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="text-xs text-slate-400">{description}</p>
      </div>
      <div className="space-y-2">
        {loading &&
          Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-10 w-full animate-pulse rounded-lg bg-slate-800/70"
            />
          ))}
        {!loading &&
          coins.map((c, i) => {
            const pct = c.price_change_percentage_24h ?? 0;
            const up = pct >= 0;
            return (
              <div
                key={c.id}
                className={cn(
                  "flex items-center justify-between rounded-xl px-3 py-2 text-xs",
                  "bg-slate-900/50 border border-slate-700/60",
                  positive && "border-emerald-500/40",
                  !positive && "border-rose-500/40"
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900/70 text-[10px]">
                    #{i + 1}
                  </span>
                  <div>
                    <p className="font-medium">{c.name}</p>
                    <p className="text-[10px] uppercase text-slate-400">
                      {c.symbol}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-slate-300">
                    ${c.current_price.toLocaleString()}
                  </p>
                  <p
                    className={cn(
                      "text-[11px] font-semibold",
                      up ? "text-emerald-400" : "text-rose-400"
                    )}
                  >
                    {up ? "▲" : "▼"} {pct.toFixed(2)}%
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </GlassCard>
  );
}

12. App Shell
src/app/layout.tsx
import "./../styles/globals.css";
import type { ReactNode } from "react";
import { Navbar } from "@/components/ui/Navbar";

export const metadata = {
  title: "Krypttrac – Crypto Kings Dashboard",
  description: "Clean, glassy crypto dashboard for kings of the market."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-krypt-bg text-slate-100">
        <Navbar />
        <main className="pt-24 pb-10 px-4 sm:px-6 lg:px-10 max-w-6xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}

src/app/page.tsx (Home)
import { NetWorthCard } from "@/components/dashboard/NetWorthCard";
import { WatchlistRow } from "@/components/dashboard/WatchlistRow";
import { TopMovers } from "@/components/dashboard/TopMovers";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <NetWorthCard />
      <WatchlistRow />
      <TopMovers />
    </div>
  );
}

src/app/bag/page.tsx
import { GlassCard } from "@/components/ui/GlassCard";

export default function BagPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Your Bag 💼</h1>
      <p className="text-sm text-slate-400">
        This is your portfolio view. In v1, it&apos;s a placeholder. We&apos;ll
        wire real positions, P/L and allocation next.
      </p>

      <GlassCard className="p-5">
        <p className="text-sm text-slate-300">
          Soon: add coins, set entry price, and watch Krypttrac flex your
          gains like a Wall Street scoreboard.
        </p>
      </GlassCard>
    </div>
  );
}

src/app/pings/page.tsx
import { GlassCard } from "@/components/ui/GlassCard";

export default function PingsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Pings 📡</h1>
      <p className="text-sm text-slate-400">
        Price alerts for kings. In this MVP, this page is a visual stub we&apos;ll
        wire to local storage and notifications later.
      </p>

      <GlassCard className="p-5">
        <p className="text-sm text-slate-300">
          Soon: &quot;Ping me when BTC breaks 80k&quot;, &quot;Alert when SOL
          dips under 100&quot; and more. Clean, simple, no clutter.
        </p>
      </GlassCard>
    </div>
  );
}

13. README.md (short + clean)
# Krypttrac

Krypttrac is a clean, glass-morphic crypto dashboard built for kings of the market.  
Real-time prices, a sexy watchlist, and top movers – without the clutter.

## Tech Stack

- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- TypeScript
- SWR + Axios
- CoinGecko public API

## Getting Started

```bash
npm install
npm run dev


Then open http://localhost:3000

Roadmap

Portfolio (Bag) with P/L

Alerts (Pings) with local storage

Multi-portfolio support

Auth + cloud sync


---

## 14. .gitignore (recap)

Use the Node template + this:

```gitignore
node_modules/
.next/
out/
dist/
.env
.env.local
.env.*
!.env.example
.DS_Store
.vscode/
.idea/
