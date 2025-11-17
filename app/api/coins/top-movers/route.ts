import { NextResponse } from 'next/server';
import { coinGeckoAPI } from '@/lib/coingecko';

export async function GET() {
  try {
    const data = await coinGeckoAPI.getTopMovers();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch top movers' },
      { status: 500 }
    );
  }
}
