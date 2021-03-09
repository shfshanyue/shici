const routes = require('next-routes')

module.exports = routes()
  .add('phrases', '/phrases')
  .add('poems', '/poems')
  .add('register', '/register', 'login')
  .add('login', '/login', 'login')
  .add('profile', '/users/:userId/:tag')