const routes = require('next-routes')

module.exports = routes()                           
  .add('poems', '/poems')
  .add('poem', '/poems/:uuid')
  .add('phrases', '/phrases')
  .add('author', '/authors/:uuid')
