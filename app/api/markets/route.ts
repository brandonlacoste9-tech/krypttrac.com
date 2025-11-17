import { NextResponse } from 'next/server';
import { fetchTopCoins } from '@/lib/markets';

// Mark route as dynamic
export const dynamic = 'force-dynamic';

// Enable revalidation
export const revalidate = 60;

/**
 * GET /api/markets
 * Fetches top cryptocurrencies with caching
 * Revalidates every 60 seconds
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '25', 10);
    
    // Validate limit
    if (limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: 'Limit must be between 1 and 100' },
        { status: 400 }
      );
    }

    // Fetch market data (with built-in fallback to mock data)
    const coins = await fetchTopCoins(limit);

    return NextResponse.json(
      { 
        coins,
        timestamp: new Date().toISOString(),
        count: coins.length 
      },
      { 
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
        },
      }
    );
  } catch (error) {
    console.error('Error in /api/markets:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch market data',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
