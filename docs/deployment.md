# Deployment Guide

This guide covers deploying Krypttrac to various platforms.

## Prerequisites

Before deploying:

- [ ] All tests pass locally
- [ ] Build succeeds: `npm run build`
- [ ] Environment variables are configured
- [ ] API keys are ready
- [ ] Repository is pushed to GitHub

## Vercel (Recommended)

Vercel is the recommended platform for deploying Next.js applications.

### Setup

1. **Create a Vercel account** at [vercel.com](https://vercel.com)

2. **Import your repository**
   - Click "New Project"
   - Import from GitHub
   - Select `brandonlacoste9-tech/krypttrac.com`

3. **Configure build settings** (usually auto-detected)
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Add environment variables**
   ```
   NEXT_PUBLIC_API_URL=https://api.coingecko.com/api/v3
   NEXT_PUBLIC_COINGECKO_API_KEY=your_api_key_here
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live at `your-project.vercel.app`

### Automatic Deployments

Vercel automatically deploys:
- **Production**: When you push to `main` branch
- **Preview**: When you create a pull request

### Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. Wait for SSL certificate to provision

### Environment Variables

```bash
# Production
NEXT_PUBLIC_API_URL=https://api.coingecko.com/api/v3
NEXT_PUBLIC_COINGECKO_API_KEY=prod_key_here

# Preview (optional)
NEXT_PUBLIC_API_URL=https://api.coingecko.com/api/v3
NEXT_PUBLIC_COINGECKO_API_KEY=dev_key_here
```

## Netlify

### Setup

1. **Create a Netlify account** at [netlify.com](https://netlify.com)

2. **Import repository**
   - Click "Add new site"
   - Import from Git → GitHub
   - Select your repository

3. **Build settings**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

4. **Environment variables**
   - Go to Site settings → Environment variables
   - Add your variables

5. **Deploy**

### netlify.toml

Create a `netlify.toml` file in your project root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Self-Hosted

### Using Docker

1. **Create Dockerfile**

```dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
ENV PORT 3000

CMD ["npm", "start"]
```

2. **Build and run**

```bash
# Build image
docker build -t krypttrac .

# Run container
docker run -p 3000:3000 krypttrac
```

3. **Docker Compose**

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=https://api.coingecko.com/api/v3
    restart: unless-stopped
```

### Using PM2

1. **Install PM2**

```bash
npm install -g pm2
```

2. **Create ecosystem.config.js**

```javascript
module.exports = {
  apps: [{
    name: 'krypttrac',
    script: 'npm',
    args: 'start',
    cwd: '/path/to/krypttrac.com',
    instances: 2,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
    },
  }],
};
```

3. **Deploy**

```bash
# Build application
npm run build

# Start with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 startup
pm2 startup
```

### Nginx Reverse Proxy

```nginx
server {
    listen 80;
    server_name krypttrac.com www.krypttrac.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Environment Variables

### Required Variables

```bash
# API Configuration
NEXT_PUBLIC_API_URL=https://api.coingecko.com/api/v3

# Optional: CoinGecko API Key (for higher rate limits)
NEXT_PUBLIC_COINGECKO_API_KEY=your_api_key_here
```

### Development vs Production

```bash
# .env.local (Development)
NEXT_PUBLIC_API_URL=https://api.coingecko.com/api/v3
NEXT_PUBLIC_COINGECKO_API_KEY=dev_key

# .env.production (Production)
NEXT_PUBLIC_API_URL=https://api.coingecko.com/api/v3
NEXT_PUBLIC_COINGECKO_API_KEY=prod_key
```

## Performance Optimization

### Build Optimization

```bash
# Analyze bundle size
ANALYZE=true npm run build

# Generate static export (if applicable)
npm run build && npm run export
```

### Caching Strategy

1. **Edge Caching** (Vercel)
   - Automatic for static assets
   - Configured in `next.config.js`

2. **CDN Integration**
   - Configure in platform settings
   - Use for images and static assets

3. **API Response Caching**
   - Implement in API routes
   - Use Redis or similar

### Image Optimization

```typescript
// next.config.js
module.exports = {
  images: {
    domains: ['api.coingecko.com'],
    formats: ['image/avif', 'image/webp'],
  },
};
```

## Monitoring

### Vercel Analytics

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Error Tracking (Sentry)

1. **Install Sentry**

```bash
npm install @sentry/nextjs
```

2. **Configure**

```javascript
// sentry.client.config.js
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

## SSL/HTTPS

### Vercel/Netlify
- Automatic SSL certificates
- Auto-renewal
- HTTP to HTTPS redirect

### Self-Hosted
- Use Let's Encrypt with Certbot
- Configure Nginx/Apache for HTTPS

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d krypttrac.com -d www.krypttrac.com
```

## CI/CD

GitHub Actions automatically:
- Run tests on pull requests
- Build and deploy on merge to main
- Security scanning with CodeQL

See `.github/workflows/` for configuration.

## Rollback

### Vercel
- Go to Deployments
- Select previous deployment
- Click "Promote to Production"

### PM2
```bash
# List deployments
pm2 list

# Reload previous version
pm2 reload krypttrac

# Restart
pm2 restart krypttrac
```

### Docker
```bash
# Tag versions
docker build -t krypttrac:v1.0.0 .

# Rollback
docker stop krypttrac
docker run -d --name krypttrac krypttrac:v1.0.0
```

## Troubleshooting

### Build Fails

```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### API Rate Limiting

- Implement caching
- Use API key for higher limits
- Add rate limit handling

### Memory Issues

```bash
# Increase Node memory
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

## Checklist

Before deploying to production:

- [ ] All features tested
- [ ] Build succeeds locally
- [ ] Environment variables configured
- [ ] API keys are valid
- [ ] Domain configured (if custom)
- [ ] SSL certificate working
- [ ] Monitoring set up
- [ ] Backup strategy in place
- [ ] Documentation updated

## Support

For deployment issues:
- Check platform documentation
- Review build logs
- Check GitHub Actions
- Contact platform support
