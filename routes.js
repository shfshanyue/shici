const routes = require('next-routes')

module.exports = routes()                           
  .add('poem', '/poems/:uuid')
