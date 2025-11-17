# Development Guide

This guide covers best practices, workflows, and tips for developing Krypttrac.

## Development Workflow

### Daily Development

1. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000)

2. **Make your changes**
   - Edit files in your preferred editor
   - Changes are hot-reloaded automatically

3. **Check your work**
   ```bash
   npm run lint        # Check for linting errors
   npx tsc --noEmit    # Type check
   npm run build       # Test production build
   ```

4. **Commit changes**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   git push origin your-branch-name
   ```

### Branch Strategy

- `main` - Production-ready code
- `feature/*` - New features
- `fix/*` - Bug fixes
- `docs/*` - Documentation updates
- `refactor/*` - Code refactoring

### Creating a New Feature

1. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Implement the feature**
   - Write clean, documented code
   - Follow existing patterns
   - Keep components small and focused

3. **Test thoroughly**
   - Test in different browsers
   - Test responsive design
   - Test edge cases

4. **Submit a pull request**
   - Fill out the PR template
   - Link related issues
   - Request reviews

## Code Style Guidelines

### TypeScript

```typescript
// ✅ Good: Use proper typing
interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
}

function formatPrice(price: number): string {
  return `$${price.toLocaleString()}`;
}

// ❌ Bad: Avoid 'any' type
function getData(): any {
  return fetch('/api/data');
}
```

### React Components

```typescript
// ✅ Good: Functional component with proper types
interface CryptoCardProps {
  crypto: CryptoData;
  onSelect?: (id: string) => void;
}

export function CryptoCard({ crypto, onSelect }: CryptoCardProps) {
  return (
    <div className="glass-card">
      <h3>{crypto.name}</h3>
      <p>{formatPrice(crypto.current_price)}</p>
    </div>
  );
}

// ❌ Bad: Unclear props, no types
export function Card({ data, fn }) {
  return <div>{data.x}</div>;
}
```

### Tailwind CSS

```tsx
// ✅ Good: Organized utilities, responsive design
<div className="
  flex flex-col gap-4
  p-6 rounded-xl
  bg-white/10 backdrop-blur-lg
  border border-white/20
  hover:bg-white/20 transition-all
  md:flex-row md:gap-6
">

// ❌ Bad: Disorganized, hard to read
<div className="flex bg-white/10 p-6 gap-4 rounded-xl border backdrop-blur-lg hover:bg-white/20 border-white/20 transition-all flex-col">
```

### File Naming

- Components: `PascalCase.tsx` (e.g., `CryptoCard.tsx`)
- Utilities: `camelCase.ts` (e.g., `formatPrice.ts`)
- Pages: `page.tsx` (Next.js App Router convention)
- Types: `camelCase.ts` or `PascalCase.ts` (e.g., `crypto.ts`)

## Component Development

### Creating a New Component

1. **Create the component file**
   ```bash
   touch components/NewComponent.tsx
   ```

2. **Define the component**
   ```typescript
   interface NewComponentProps {
     // Define props
   }

   export function NewComponent({ }: NewComponentProps) {
     return (
       <div>
         {/* Component JSX */}
       </div>
     );
   }
   ```

3. **Export from index (if using barrel exports)**
   ```typescript
   // components/index.ts
   export { NewComponent } from './NewComponent';
   ```

### Component Best Practices

- **Single Responsibility**: Each component should do one thing well
- **Composition**: Build complex UIs from simple components
- **Props over State**: Prefer props when possible
- **Meaningful Names**: Use descriptive names for components and props
- **Extract Reusable Logic**: Use custom hooks for shared logic

### Example: Glass Card Component

```typescript
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ 
  children, 
  className = '', 
  hover = false 
}: GlassCardProps) {
  return (
    <div className={`
      glass-card
      ${hover ? 'hover-effect' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
}
```

## Working with APIs

### API Integration Pattern

```typescript
// lib/api.ts
export async function fetchCryptoData() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    throw error;
  }
}
```

### Error Handling

```typescript
// In a component
const [data, setData] = useState<CryptoData[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  fetchCryptoData()
    .then(setData)
    .catch(err => setError(err.message))
    .finally(() => setLoading(false));
}, []);

if (loading) return <LoadingSpinner />;
if (error) return <ErrorMessage message={error} />;
```

## Styling Guide

### Glass Morphism Implementation

```css
/* globals.css */
.glass-card {
  @apply
    bg-white/10
    backdrop-blur-lg
    border border-white/20
    rounded-xl
    shadow-lg;
}

.glass-card-hover {
  @apply
    glass-card
    hover:bg-white/20
    transition-all duration-300
    cursor-pointer;
}
```

### Color Palette

```typescript
// Defined in tailwind.config.ts
colors: {
  primary: {
    DEFAULT: '#6366f1',
    dark: '#4f46e5',
  },
  success: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
}
```

### Responsive Design

```tsx
// Mobile-first approach
<div className="
  text-sm        // Mobile
  md:text-base   // Tablet
  lg:text-lg     // Desktop
">
```

## Debugging

### Development Tools

1. **React DevTools**
   - Inspect component tree
   - View props and state
   - Track renders

2. **Browser DevTools**
   - Network tab for API calls
   - Console for errors
   - Performance profiling

3. **Next.js DevTools**
   - Build info
   - Route information
   - Performance metrics

### Common Issues

#### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Clear node modules
rm -rf node_modules package-lock.json
npm install

# Check TypeScript
npx tsc --noEmit
```

#### Styling Issues

```bash
# Clear Tailwind cache
npm run dev -- --turbo --clean
```

## Performance Optimization

### Best Practices

1. **Use React.memo for expensive components**
   ```typescript
   export const ExpensiveComponent = React.memo(({ data }) => {
     // Component logic
   });
   ```

2. **Optimize images**
   ```typescript
   import Image from 'next/image';

   <Image
     src="/logo.png"
     alt="Logo"
     width={100}
     height={100}
     priority
   />
   ```

3. **Lazy load components**
   ```typescript
   import dynamic from 'next/dynamic';

   const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
     loading: () => <p>Loading...</p>,
   });
   ```

## Testing

### Manual Testing Checklist

- [ ] Feature works as expected
- [ ] No console errors
- [ ] Responsive on mobile, tablet, desktop
- [ ] Works in Chrome, Firefox, Safari
- [ ] Fast loading times
- [ ] Accessible (keyboard navigation, screen readers)

### Automated Testing (Future)

```typescript
// Example test structure
import { render, screen } from '@testing-library/react';
import { CryptoCard } from './CryptoCard';

describe('CryptoCard', () => {
  it('displays crypto name and price', () => {
    const mockData = {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      current_price: 50000,
    };

    render(<CryptoCard crypto={mockData} />);
    
    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getByText(/50000/)).toBeInTheDocument();
  });
});
```

## Git Workflow

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add price alert functionality
fix: correct portfolio calculation
docs: update installation guide
style: format code with prettier
refactor: simplify API integration
perf: optimize image loading
test: add tests for CryptoCard
chore: update dependencies
```

### Before Committing

```bash
# Run checks
npm run lint
npx tsc --noEmit
npm run build

# Stage and commit
git add .
git commit -m "feat: your message"
```

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [MDN Web Docs](https://developer.mozilla.org)

## Getting Help

- Check existing documentation
- Search GitHub issues
- Ask in GitHub Discussions
- Review similar code in the repository
