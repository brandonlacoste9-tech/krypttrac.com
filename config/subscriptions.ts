export type SubscriptionPlan = {
  id: string;
  name: string;
  description: string;
  stripePriceId: string;
  price: number;
  tier: 'noble' | 'royal';
};

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'noble',
    name: 'Noble',
    description: 'For those who seek the path of wealth.',
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_NOBLE || '',
    price: 29,
    tier: 'noble',
  },
  {
    id: 'royal',
    name: 'Royal',
    description: 'True dominion over the on-chain realm.',
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_ROYAL || '',
    price: 99,
    tier: 'royal',
  },
];
