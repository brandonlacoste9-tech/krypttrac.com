import { NextResponse } from 'next/server';
import { coinGeckoAPI } from '@/lib/coingecko';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const per_page = parseInt(searchParams.get('per_page') || '50');
    
    const data = await coinGeckoAPI.getMarketsList('usd', 'market_cap_desc', per_page, page, true);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch coin list' },
      { status: 500 }
    );
  }
}
