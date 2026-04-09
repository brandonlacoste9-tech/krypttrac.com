/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'assets.coingecko.com', pathname: '/**' },
      { protocol: 'https', hostname: 'coin-images.coingecko.com', pathname: '/**' },
      { protocol: 'https', hostname: 'img.clerk.com', pathname: '/**' },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^(porto\/internal|porto|@base-org\/account|@coinbase\/wallet-sdk|@metamask\/connect-evm|@safe-global\/safe-apps-sdk|@safe-global\/safe-apps-provider|@walletconnect\/ethereum-provider)$/,
      })
    )
    return config
  },
}

module.exports = nextConfig
