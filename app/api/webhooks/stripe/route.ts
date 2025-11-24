import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { clerkClient } from '@clerk/nextjs/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Map Stripe price IDs to tier names
const PRICE_TO_TIER: Record<string, 'silver' | 'gold' | 'platinum'> = {
  // Price IDs from environment variables
  [process.env.NEXT_PUBLIC_STRIPE_SILVER_PRICE_ID || 'price_1SWyl0CzqBvMqSYFSSmYDj9V']: 'silver',
  [process.env.NEXT_PUBLIC_STRIPE_GOLD_PRICE_ID || 'price_1SWyl0CzqBvMqSYFt0JTPMRq']: 'gold',
  [process.env.NEXT_PUBLIC_STRIPE_PLATINUM_PRICE_ID || 'price_1SWyl1CzqBvMqSYFhSI9H1do']: 'platinum',
};

// Get tier from price ID
function getTierFromPriceId(priceId: string): 'silver' | 'gold' | 'platinum' | null {
  return PRICE_TO_TIER[priceId] || null;
}

// Update user's tier in Clerk
async function updateUserTier(
  customerId: string,
  tier: 'silver' | 'gold' | 'platinum' | 'free'
) {
  try {
    // Find user by Stripe customer ID stored in metadata
    const clerk = await clerkClient();
    const users = await clerk.users.getUserList({
      limit: 100,
    });

    // Find user with matching Stripe customer ID
    const user = users.data.find(
      (u) => u.publicMetadata?.stripeCustomerId === customerId
    );

    if (!user) {
      console.log(`No user found with Stripe customer ID: ${customerId}`);
      // Try to find by email from Stripe
      const customer = await stripe.customers.retrieve(customerId);
      if (customer.deleted) return;

      const email = customer.email;
      if (email) {
        const usersByEmail = await clerk.users.getUserList({
          emailAddress: [email],
        });

        if (usersByEmail.data.length > 0) {
          const foundUser = usersByEmail.data[0];
          await clerk.users.updateUserMetadata(foundUser.id, {
            publicMetadata: {
              ...foundUser.publicMetadata,
              tier,
              stripeCustomerId: customerId,
            },
          });
          console.log(`Updated tier for user ${foundUser.id} to ${tier}`);
          return;
        }
      }
      return;
    }

    await clerk.users.updateUserMetadata(user.id, {
      publicMetadata: {
        ...user.publicMetadata,
        tier,
        stripeCustomerId: customerId,
      },
    });

    console.log(`Updated tier for user ${user.id} to ${tier}`);
  } catch (error) {
    console.error('Error updating user tier:', error);
  }
}

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  console.log(`Received Stripe webhook: ${event.type}`);

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.mode === 'subscription' && session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
          );

          const priceId = subscription.items.data[0]?.price.id;
          const tier = getTierFromPriceId(priceId);

          if (tier && session.customer) {
            await updateUserTier(session.customer as string, tier);
          }
        }
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const priceId = subscription.items.data[0]?.price.id;
        const tier = getTierFromPriceId(priceId);

        if (tier && subscription.customer) {
          await updateUserTier(subscription.customer as string, tier);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;

        if (subscription.customer) {
          await updateUserTier(subscription.customer as string, 'free');
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;

        if (invoice.subscription && invoice.customer) {
          const subscription = await stripe.subscriptions.retrieve(
            invoice.subscription as string
          );

          const priceId = subscription.items.data[0]?.price.id;
          const tier = getTierFromPriceId(priceId);

          if (tier) {
            await updateUserTier(invoice.customer as string, tier);
          }
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log(`Payment failed for customer: ${invoice.customer}`);
        // Optionally downgrade user or send notification
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

// Disable body parsing for webhook signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};
