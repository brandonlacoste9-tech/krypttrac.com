import { NextResponse } from 'next/server';
import { coinGeckoAPI } from '@/lib/coingecko';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await coinGeckoAPI.getCoinDetail(params.id);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch coin details' },
      { status: 500 }
    );
  }
}
