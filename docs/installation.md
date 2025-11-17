# Installation Guide

This guide will help you set up Krypttrac on your local machine for development.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 20.x or higher
- **npm**: Version 9.x or higher (comes with Node.js)
- **Git**: For version control

You can verify your installations by running:

```bash
node --version
npm --version
git --version
```

## Installation Methods

### Method 1: Standard Installation

1. **Clone the repository**

```bash
git clone https://github.com/brandonlacoste9-tech/krypttrac.com.git
cd krypttrac.com
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

4. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Method 2: Using Dev Container (Recommended)

If you use VS Code, we provide a dev container configuration for a consistent development environment.

1. **Install Prerequisites**
   - [VS Code](https://code.visualstudio.com/)
   - [Docker Desktop](https://www.docker.com/products/docker-desktop)
   - [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

2. **Open in Container**
   - Open the project in VS Code
   - Press `F1` and select "Dev Containers: Reopen in Container"
   - Wait for the container to build (first time takes a few minutes)

3. **Start Development**
   ```bash
   npm run dev
   ```

## Environment Configuration

Create a `.env.local` file in the root directory for local environment variables:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=https://api.coingecko.com/api/v3

# Optional: Add your CoinGecko API key for higher rate limits
NEXT_PUBLIC_COINGECKO_API_KEY=your_api_key_here
```

## Verify Installation

Run the following commands to ensure everything is set up correctly:

```bash
# Lint the code
npm run lint

# Build the application
npm run build

# Start production server
npm start
```

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, you can specify a different port:

```bash
PORT=3001 npm run dev
```

### Node Version Issues

If you encounter Node version issues, consider using [nvm](https://github.com/nvm-sh/nvm):

```bash
nvm install 20
nvm use 20
```

### Dependency Installation Fails

Try clearing the cache and reinstalling:

```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Build Errors

Ensure TypeScript compilation succeeds:

```bash
npx tsc --noEmit
```

## Next Steps

- Read the [Quick Start Guide](quick-start.md)
- Explore the [Development Guide](development.md)
- Check out the [Architecture Overview](architecture.md)

## Additional Tools

### Recommended VS Code Extensions

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features
- GitHub Copilot

### Useful Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint

# Type checking
npx tsc --noEmit     # Check TypeScript types

# Format code
npx prettier --write "**/*.{js,jsx,ts,tsx,json,md}"
```

## Getting Help

If you encounter any issues during installation:

1. Check the [troubleshooting section](#troubleshooting) above
2. Search [existing issues](https://github.com/brandonlacoste9-tech/krypttrac.com/issues)
3. Ask in [Discussions](https://github.com/brandonlacoste9-tech/krypttrac.com/discussions)
4. Create a new issue with details about your problem
