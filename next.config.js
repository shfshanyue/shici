const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  async rewrites() {
    return [
      {
        source: '/poems/:id/phrase/:phraseId',
        destination: '/poems/:id?phraseId=:phraseId'
      }
    ]
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.gql$/,
      exclude: /node_modules/,
      use: {
        loader: 'graphql-tag/loader'
      }
    })

    return config
  }
}
)