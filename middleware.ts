import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const isProtected = createRouteMatcher(['/dashboard(.*)', '/api/agent(.*)'])

// If Clerk keys are missing, skip auth entirely so the site still loads
const hasClerkKeys = !!(process.env.CLERK_SECRET_KEY && process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)

function fallbackMiddleware(req: NextRequest) {
  return NextResponse.next()
}

export default hasClerkKeys
  ? clerkMiddleware(async (auth, req) => {
      if (isProtected(req)) await auth.protect()
    })
  : fallbackMiddleware

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
