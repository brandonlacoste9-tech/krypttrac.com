## Cursor Cloud specific instructions

### Overview

Krypto Kings is a single Next.js 14 application (not a monorepo) — a premium crypto portfolio tracking dashboard with AI chat (Anthropic Claude) and tiered memberships. See `README.md` for full feature list.

### Services

| Service | How to run | Notes |
|---------|-----------|-------|
| Next.js dev server | `npm run dev` | Runs on `localhost:3000`. The only local service required. |

### Required environment variables

The app uses **Clerk** for authentication (not Supabase, despite what `README.md` and `.env.example` say — the actual code exclusively uses `@clerk/nextjs`). Create `.env.local` with:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<from Clerk dashboard>
CLERK_SECRET_KEY=<from Clerk dashboard>
ANTHROPIC_API_KEY=<from Anthropic console, needed for /api/agent endpoint>
```

Without valid Clerk keys, **both `npm run build` and `npm run dev` will error** — ClerkProvider wraps the root layout and validates the key format at runtime.

### Lint / type-check / build / dev

Standard `package.json` scripts: `npm run lint`, `npm run build`, `npm run dev`, `npm start`. Also `npx tsc --noEmit` for type-checking.

ESLint requires `eslint` v8 and `eslint-config-next` v14 (matching Next.js 14). If the `.eslintrc.json` file is missing, create one with `{"extends": "next/core-web-vitals"}`. ESLint v9 is **incompatible** with Next.js 14's `next lint`.

### Gotchas

- The `.env.example` references Supabase vars, but there is **zero Supabase code** in the codebase — it was migrated to Clerk. Ignore Supabase-related setup.
- Stripe is listed as a dependency but has no integration code yet ("Coming Soon").
- The production build (`npm run build`) pre-renders pages via SSG, which invokes Clerk and fails without valid keys. For local development, use `npm run dev` which renders on-demand.
- No database, Docker, or external services are needed beyond the SaaS API keys above.
