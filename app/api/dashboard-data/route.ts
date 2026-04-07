import { NextResponse } from 'next/server'
import { fetchDashboardSnapshot } from '@/lib/server/market-fetch'

export const revalidate = 60

export async function GET() {
  const snap = await fetchDashboardSnapshot()
  const status = snap.error && snap.markets.length === 0 ? 502 : 200
  return NextResponse.json(snap, { status })
}
