const routes = require('next-routes')

module.exports = routes()                           
  .add('poems', '/poems')
  .add('poem', '/poems/:uuid')
  .add('phrases', '/phrases')
  .add('authors', '/authors')
  .add('author', '/authors/:uuid')
