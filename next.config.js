const withLess = require('@zeit/next-less')
const fs = require('fs')
const path = require('path')

const theme = require('./theme.json')


// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = (file) => {}
}

module.exports = withLess({
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: theme
  },
})
