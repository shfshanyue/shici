const withLess = require('@zeit/next-less')
const fs = require('fs')
const path = require('path')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const theme = require('./theme.json')

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = (file) => {}
}

module.exports = withLess({
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  webpack: (config, { isServer, ...rest }) => {
    if (!config.dev) {
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
    }

    if (process.env.ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerPort: 8888 + Number(isServer)
      }))
    }

    return config
  }
})
