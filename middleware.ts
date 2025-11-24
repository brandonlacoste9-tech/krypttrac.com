import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Define protected routes
const isProtectedRoute = createRouteMatcher([
  '/portfolio(.*)',
  '/watchlist(.*)',
  '/alerts(.*)',
  '/api/protected(.*)', // Protect sensitive API routes
])

// Define public auth routes (login, signup)
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/public(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  // Get auth state
  const { userId } = await auth()
  const { pathname } = req.nextUrl

  // Redirect authenticated users away from auth pages
  if (userId && isPublicRoute(req)) {
    const dashboardUrl = new URL('/portfolio', req.url)
    return NextResponse.redirect(dashboardUrl)
  }

  // Protect routes requiring authentication
  if (!userId && isProtectedRoute(req)) {
    const signInUrl = new URL('/sign-in', req.url)
    signInUrl.searchParams.set('redirect_url', pathname)
    return NextResponse.redirect(signInUrl)
  }

  // Allow request to proceed
  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
