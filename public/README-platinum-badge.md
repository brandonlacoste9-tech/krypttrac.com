# 💎 Platinum Badge System

## Badge Tiers

### Free (No Badge)
- No visible badge shown

### Silver King - $9.99/mo
- Gray gradient badge
- Star ⭐ icon
- "SILVER KING" label

### Gold King - $24.99/mo  
- Gold gradient badge
- Crown 👑 icon
- "GOLD KING" label

### Platinum King - $49.99/mo
- Purple/pink gradient with glow
- Silver KK crown logo (`/public/kk-logo-platinum.png`)
- "PLATINUM KING" label
- Pulse animation effect

## Usage Examples

### In Chat Messages
```tsx
import { TierBadge } from '@/components/TierBadge'

<div className="flex items-center gap-2">
  <span>King Brandon</span>
  <TierBadge tier="platinum" size="sm" />
</div>
```

### In User Profile
```tsx
<div className="flex items-center gap-3">
  <Avatar />
  <TierBadge tier="gold" size="lg" />
</div>
```

### Navigation Badge Only
```tsx
<TierBadge tier="platinum" size="md" showLabel={false} />
```

### All Size Options
- `size="sm"` - Small (16px icon, 10px text) - For chat
- `size="md"` - Medium (20px icon, 12px text) - Default
- `size="lg"` - Large (24px icon, 14px text) - For profiles

## Component Props

```typescript
interface TierBadgeProps {
  tier: 'free' | 'silver' | 'gold' | 'platinum'
  size?: 'sm' | 'md' | 'lg'  // Default: 'md'
  showLabel?: boolean          // Default: true
}
```

## Logo Requirements

**Platinum Badge Logo:**
- Path: `/public/kk-logo-platinum.png`
- Format: PNG with transparency
- Recommended: Silver metallic KK crown
- Sizes needed:
  - Small: 16x16px
  - Medium: 20x20px  
  - Large: 24x24px

## Where Badges Appear

✅ Chat messages (next to username)
✅ User profiles (on avatar)
✅ Leaderboards (next to rank)
✅ Comments section
✅ Settings page (tier display)
✅ Navigation menu
✅ Premium chat header

## Integration

Already integrated in:
- ✅ `components/PremiumChat.tsx`

To add to other components:
```tsx
import { TierBadge } from '@/components/TierBadge'

// Use wherever you display user info
<TierBadge tier={user.tier} />
```
