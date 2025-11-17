import { NextResponse } from 'next/server';
import { coinGeckoAPI } from '@/lib/coingecko';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const days = searchParams.get('days') || '7';
    
    const data = await coinGeckoAPI.getMarketChart(params.id, 'usd', days);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch chart data' },
      { status: 500 }
    );
  }
}
