const routes = require('next-routes')

module.exports = routes()                           
  .add('poem', '/poems/:uuid')
  .add('author', '/authors/:uuid')
