import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/db"
import { subscriptionPlans } from "@/config/subscriptions"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user || !session.user.email) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { tier } = await req.json()
    const plan = subscriptionPlans.find(p => p.id === tier)

    if (!plan) {
      return new NextResponse("Invalid tier", { status: 400 })
    }

    // Get the user from DB to find stripeCustomerId
    const dbUser = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!dbUser) {
      return new NextResponse("User not found", { status: 404 })
    }

    const returnUrl = `${process.env.NEXTAUTH_URL}/dashboard`

    // Create Stripe Checkout Session
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      customer_email: session.user.email,
      line_items: [
        {
          price: plan.stripePriceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${returnUrl}?success=true`,
      cancel_url: `${returnUrl}?canceled=true`,
      metadata: {
        userId: dbUser.id,
        tier: plan.tier
      },
    })

    return NextResponse.json({ url: stripeSession.url })
  } catch (error) {
    console.error("[STRIPE_CHECKOUT]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
