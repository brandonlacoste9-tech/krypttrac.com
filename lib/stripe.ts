import Stripe from 'stripe'

/**
 * Lazy-initialized Stripe client.
 * Prevents module-level crash when STRIPE_SECRET_KEY is not set
 * (e.g. during `next build` page-data collection).
 */
function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    throw new Error(
      'STRIPE_SECRET_KEY is not set. Add it to your .env file.'
    )
  }
  return new Stripe(key, {
    apiVersion: '2025-01-27' as any,
    appInfo: {
      name: 'kryptotrac.com',
      version: '0.1.0',
    },
  })
}

/** Use this in API routes: `stripe.checkout.sessions.create(...)` */
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop, receiver) {
    // Lazily create the real Stripe instance on first property access
    const real = getStripe()
    return Reflect.get(real, prop, receiver)
  },
})
