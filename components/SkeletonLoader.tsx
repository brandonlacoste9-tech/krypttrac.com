'use client';

import { useThemeStore } from '@/lib/themeStore';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-white/10 rounded ${className}`}
    />
  );
}

export function CoinRowSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl glass">
      {/* Coin image */}
      <Skeleton className="w-10 h-10 rounded-full" />

      {/* Coin name */}
      <div className="flex-1">
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-3 w-12" />
      </div>

      {/* Price */}
      <div className="text-right">
        <Skeleton className="h-4 w-20 mb-2" />
        <Skeleton className="h-3 w-14" />
      </div>
    </div>
  );
}

export function TopMoversSkeleton() {
  const { theme } = useThemeStore();

  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Skeleton className="w-8 h-8 rounded-full" />
        <Skeleton className="h-6 w-32" />
      </div>

      {/* Coin rows */}
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <CoinRowSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <Skeleton className="w-10 h-10 rounded-lg" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-8 w-32 mb-2" />
      <Skeleton className="h-3 w-20" />
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>

      {/* Top movers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopMoversSkeleton />
        <TopMoversSkeleton />
      </div>
    </div>
  );
}

export function LoadingSpinner({ size = 24 }: { size?: number }) {
  const { theme } = useThemeStore();

  return (
    <svg
      className="animate-spin"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill={theme.accent}
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
