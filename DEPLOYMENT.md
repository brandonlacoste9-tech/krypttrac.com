# 🚀 Krypto Kings Deployment Guide

Complete guide for deploying Krypto Kings to production.

## Prerequisites

- GitHub account with `krypttrac.com` repository
- Vercel account (free tier works)
- Anthropic API key
- Supabase project set up

## Step 1: Vercel Setup

### Connect Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import `brandonlacoste9-tech/krypttrac.com`
4. Configure project:
   - Framework Preset: **Next.js**
   - Root Directory: `./` (leave default)
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Environment Variables

Add these in Vercel → Settings → Environment Variables:

**Required:**
```
ANTHROPIC_API_KEY=sk-ant-xxxxx
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Optional:**
```
COINGECKO_API_KEY=CG-xxxxx
STRIPE_SECRET_KEY=sk_live_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

### Deploy

Click **Deploy** and wait ~2 minutes.

## Step 2: Custom Domain

### Add Domain to Vercel

1. Go to Project → Settings → Domains
2. Add your domain: `kryptokings.app`
3. Add www subdomain: `www.kryptokings.app`

### Configure DNS

Add these records at your domain registrar:

**A Record:**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

**CNAME Record:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

Wait 5-10 minutes for DNS propagation.

## Step 3: Supabase Configuration

### Database Setup

Run these SQL commands in Supabase SQL Editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'silver', 'gold', 'platinum')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create function to handle new users
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, tier)
  VALUES (NEW.id, NEW.email, 'free');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();
```

### Email Templates

Configure in Supabase → Authentication → Email Templates:

1. **Confirm Signup**: Customize with Krypto Kings branding
2. **Magic Link**: Update with purple/gold colors
3. **Reset Password**: Match royal theme

### Auth Settings

1. Go to Authentication → Settings
2. Enable Email provider
3. Set Site URL: `https://kryptokings.app`
4. Add Redirect URLs:
   - `https://kryptokings.app/auth/callback`
   - `http://localhost:3000/auth/callback` (for dev)

## Step 4: Anthropic API Setup

1. Get API key at [Anthropic Console](https://console.anthropic.com/)
2. Add to Vercel environment variables
3. Test AI agent:
   ```bash
   curl https://kryptokings.app/api/agent \
     -X POST \
     -H "Content-Type: application/json" \
     -d '{"message":"Why is Bitcoin mooning?"}'
   ```

## Step 5: Payment Integration (Optional)

### Stripe Setup

1. Create account at [Stripe](https://stripe.com)
2. Get API keys from Dashboard
3. Create products:
   - **Gold King**: $24.99/month
   - **Platinum King**: $49.99/month
4. Add webhook endpoint: `https://kryptokings.app/api/webhooks/stripe`
5. Add keys to Vercel environment variables

### Test Payments

Use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

## Step 6: Monitoring & Analytics

### Vercel Analytics

Enable in Project → Analytics (free tier available)

### Error Tracking

Recommended: [Sentry](https://sentry.io)

```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

### Performance Monitoring

Check in Vercel:
- Functions tab for API performance
- Analytics for page load times
- Build times in Deployments

## Step 7: Post-Deployment Checklist

- [ ] Custom domain working
- [ ] SSL certificate active (automatic via Vercel)
- [ ] AI agent responding correctly
- [ ] Authentication flow working
- [ ] Email confirmations sending
- [ ] Premium chat accessible for Gold/Platinum
- [ ] Badges displaying correctly
- [ ] Logos showing on all pages
- [ ] Mobile responsive on all devices
- [ ] No console errors in browser

## Continuous Deployment

Vercel automatically deploys on:
- ✅ Push to `main` branch
- ✅ Pull request preview deployments
- ✅ Git commits trigger builds

### Manual Deployment

```bash
# From local machine
cd krypttrac.com
vercel --prod
```

## Rollback

If deployment fails:

1. Go to Vercel → Deployments
2. Find last working deployment
3. Click "..." → Promote to Production

## Troubleshooting

### Build Fails

Check Vercel build logs:
- TypeScript errors?
- Missing dependencies?
- Environment variables set?

### AI Agent Not Working

- Verify `ANTHROPIC_API_KEY` in Vercel
- Check API usage at Anthropic Console
- Test endpoint manually

### Auth Issues

- Check Supabase project is active
- Verify redirect URLs match exactly
- Check email templates are configured

## Support

- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs
- Anthropic Docs: https://docs.anthropic.com

---

🎉 **Your kingdom is now live!** Visit https://kryptokings.app to rule! 👑
