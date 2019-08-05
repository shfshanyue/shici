const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  webpack: (config, { isServer }) => {
    // if (!config.dev) {
      // config.plugins.push(
        // new SWPrecacheWebpackPlugin({
        //   verbose: true,
        //   stripPrefix: '.next',
        //   replacePrefix: 'next',
          // runtimeCaching: [
          //   {
          //     handler: 'networkFirst',
          //     urlPattern: /^https?.*/
          //   }
          // ]
        // })
      // )
    // }

    if (process.env.ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: path.resolve(__dirname, `static/${new Date().toJSON().substr(0, 10)}-${process.env.COMMIT}`, isServer ? 'server.html' : 'client.html')
      }))
    }

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
