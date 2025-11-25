# 🧩 Krypto Kings Component Documentation

Complete guide to all custom components in the Krypto Kings application.

## TierBadge Component

Location: `components/TierBadge.tsx`

### Purpose
Display membership tier badges throughout the app with royal styling and animations.

### Props

```typescript
interface TierBadgeProps {
  tier: 'free' | 'silver' | 'gold' | 'platinum'
  size?: 'sm' | 'md' | 'lg'        // Default: 'md'
  showLabel?: boolean               // Default: true
}
```

### Usage Examples

```tsx
import { TierBadge } from '@/components/TierBadge'

// Small badge in chat
<TierBadge tier="platinum" size="sm" />

// Medium badge (default)
<TierBadge tier="gold" />

// Large badge for profiles
<TierBadge tier="silver" size="lg" />

// Icon only (no label)
<TierBadge tier="platinum" showLabel={false} />
```

### Tier Styles

**Free**: Hidden (no badge shown)

**Silver King**:
- Gray gradient badge
- Star ⭐ icon
- Label: "SILVER KING"

**Gold King**:
- Gold gradient badge
- Crown 👑 icon
- Label: "GOLD KING"

**Platinum King**:
- Purple/pink gradient with glow
- Silver KK crown logo
- Label: "PLATINUM KING"
- Pulse animation

### Size Reference

- **sm**: Icon 16px, Text 10px - For chat messages
- **md**: Icon 20px, Text 12px - Default size
- **lg**: Icon 24px, Text 14px - For profiles

---

## AIAgent Component

Location: `components/AIAgent.tsx`

### Purpose
Floating AI assistant button with chat interface powered by Claude Haiku.

### Props

```typescript
interface AIAgentProps {
  dashboardData?: {
    gainers: Array<{name: string, price: string, change: string}>
    losers: Array<{name: string, price: string, change: string}>
    stablecoins: Array<{symbol: string, price: string, change: string}>
  }
  portfolioData?: any
}
```

### Usage

```tsx
import { AIAgent } from '@/components/AIAgent'

// With dashboard data
<AIAgent
  dashboardData={{
    gainers: topGainers,
    losers: topLosers,
    stablecoins: stables
  }}
  portfolioData={userPortfolio}
/>

// Standalone (no context)
<AIAgent />
```

### Features

- **Floating Button**: Positioned bottom-right
- **De-peg Alert**: Pulses red when stablecoin < $0.99
- **Context-Aware**: Uses dashboard data for relevant responses
- **Crypto Slang**: Responds like a king (mooning, rekt, etc.)
- **Expandable Chat**: Full conversation interface

### Styling States

- **Normal**: Purple gradient, crown icon 👑
- **Alert**: Red pulse, warning icon ⚠️
- **Expanded**: Full-screen overlay with chat

---

## PremiumChat Component

Location: `components/PremiumChat.tsx`

### Purpose
Exclusive chat room for Gold and Platinum members.

### Props

```typescript
interface PremiumChatProps {
  userTier?: 'free' | 'silver' | 'gold' | 'platinum'
  userId?: string
}
```

### Usage

```tsx
import { PremiumChat } from '@/components/PremiumChat'

// For authenticated user
<PremiumChat
  userTier={user.tier}
  userId={user.id}
/>

// Guest view (shows upgrade prompt)
<PremiumChat userTier="free" />
```

### Features

**For Gold/Platinum Members:**
- Real-time messaging
- User avatars with tier badges
- Timestamp display
- Message input with enter key support
- Platinum perk indicator (@ai commands)

**For Free/Silver Users:**
- Locked state with upgrade cards
- Pricing display ($24.99 Gold, $49.99 Platinum)
- Feature comparison
- Call-to-action buttons

### Message Interface

```typescript
interface Message {
  id: string
  userId: string
  username: string
  tier: 'gold' | 'platinum'
  content: string
  timestamp: Date
}
```

---

## Header Component

Location: `components/Header.tsx`

### Purpose
Main navigation header with logo and branding.

### Usage

```tsx
import { Header } from '@/components/Header'

<Header />
```

### Features

- **Logo**: Golden KK crown from `/public/kk-logo.png`
- **Title**: "Krypto Kings" with gradient
- **Responsive**: Mobile-friendly design
- **Blur Effect**: Backdrop blur for depth

### Styling

- Background: Slate 900 with 50% opacity
- Border: Purple gradient
- Logo: 32x32px crown icon

---

## Footer Component

Location: `components/Footer.tsx`

### Purpose
Footer with Opus Magnum badge and copyright.

### Usage

```tsx
import { Footer } from '@/components/Footer'

<Footer />
```

### Features

- **Opus Magnum Badge**: Clickable, opens Colony OS
- **Copyright**: Dynamic year
- **Tagline**: "Built for Kings 👑"

### Link

Opens: `https://opus-magnum.vercel.app`

---

## Component Integration Examples

### Profile Page

```tsx
import { TierBadge } from '@/components/TierBadge'

function ProfilePage({ user }) {
  return (
    <div className="flex items-center gap-4">
      <Avatar src={user.avatar} />
      <div>
        <h2>{user.name}</h2>
        <TierBadge tier={user.tier} size="lg" />
      </div>
    </div>
  )
}
```

### Dashboard with AI

```tsx
import { AIAgent } from '@/components/AIAgent'
import { Header } from '@/components/Header'

function Dashboard({ marketData, portfolio }) {
  return (
    <>
      <Header />
      <main>
        {/* Dashboard content */}
      </main>
      <AIAgent
        dashboardData={marketData}
        portfolioData={portfolio}
      />
    </>
  )
}
```

### Chat with Badges

```tsx
import { PremiumChat } from '@/components/PremiumChat'

function ChatPage({ user }) {
  return (
    <div className="h-screen">
      <PremiumChat
        userTier={user.tier}
        userId={user.id}
      />
    </div>
  )
}
```

---

## Styling Guidelines

All components use:
- **Tailwind CSS** for styling
- **Purple/Pink/Gold** color scheme
- **Backdrop blur** for glassmorphism
- **Smooth animations** for interactions

### Color Palette

```css
/* Purple Gradient */
from-purple-600 via-pink-600 to-purple-600

/* Gold Gradient */
from-yellow-600 via-yellow-500 to-yellow-600

/* Background */
bg-slate-900/50

/* Borders */
border-purple-500/20
```

---

## Component Dependencies

Install these for all components to work:

```bash
npm install lucide-react      # Icons
npm install next              # Image component
```

---

## Best Practices

1. **Always import from @/components**
2. **Pass user tier for access control**
3. **Test all tier variations**
4. **Use size="sm" in compact areas**
5. **Provide fallbacks for missing data**

---

For more examples, see component files directly! 👑
