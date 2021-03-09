const { createServer } = require('http')
const next = require('next')

const routes = require('./routes')

const isDev = process.env.NODE_ENV !== 'production'

const app = next({
  dev: isDev
})

const handler = routes.getRequestHandler(app, ({ req, res, route, query }) => {
  renderAndCache(req, res, route.page, query)
})

app.prepare().then(() => {
  createServer(handler).listen(3000)
})

// TODO: enhance cache
async function renderAndCache(req, res, pagePath, queryParams) {

  try {
    const html = await app.renderToHTML(req, res, pagePath, queryParams)

    if (res.statusCode !== 200) {
      res.end(html)
      return
    }

    res.end(html)
  } catch (err) {
    res.statusCode = 404
    app.renderError(err, req, res, pagePath, queryParams)
  }
}
