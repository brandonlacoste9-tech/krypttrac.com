import { useUser } from '@clerk/nextjs';
import { UserTier } from '@/lib/themeStore';

export function useUserTier(): UserTier {
  const { user, isLoaded } = useUser();

  if (!isLoaded || !user) {
    return 'free';
  }

  const tier = user.publicMetadata?.tier as UserTier | undefined;

  // Validate tier value
  if (tier === 'silver' || tier === 'gold' || tier === 'platinum') {
    return tier;
  }

  return 'free';
}

export function getTierDisplayName(tier: UserTier): string {
  const names: Record<UserTier, string> = {
    free: 'Free',
    silver: 'Silver King',
    gold: 'Gold King',
    platinum: 'Platinum King',
  };
  return names[tier];
}

export function getTierBadge(tier: UserTier): string {
  const badges: Record<UserTier, string> = {
    free: '',
    silver: '🥈',
    gold: '🥇',
    platinum: '💎',
  };
  return badges[tier];
}

export function getTierColor(tier: UserTier): string {
  const colors: Record<UserTier, string> = {
    free: '#6B7280',
    silver: '#C0C0C0',
    gold: '#FFD700',
    platinum: '#8B5CF6',
  };
  return colors[tier];
}
