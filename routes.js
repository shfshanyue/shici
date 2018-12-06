const routes = require('next-routes')

module.exports = routes()                           
  .add('home', '/', 'home')
  .add('poems', '/poems')
  .add('poem', '/poems/:uuid')
