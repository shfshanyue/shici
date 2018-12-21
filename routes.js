const routes = require('next-routes')

module.exports = routes()                           
  .add('poems', '/poems')
  .add('poem', '/poems/:uuid')
  .add('author', '/authors/:uuid')
