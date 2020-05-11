const { createServer } = require('http')
const next = require('next')

const routes = require('./routes')
const LRUCache = require('lru-cache')

const ssrCache = new LRUCache({
  max: 2000, 
  maxAge: 1000 * 60 * 60 * 24 * 7
})

const isDev = process.env.NODE_ENV !== 'production'

const app = next({
  dev: isDev
})

const handler = routes.getRequestHandler(app, ({req, res, route, query}) => {
  renderAndCache(req, res, route.page, query)
})

app.prepare().then(() => {
  createServer(handler).listen(3000)
})

// TODO: enhance cache
async function renderAndCache (req, res, pagePath, queryParams) {
  const key = req.url

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key) && !isDev) {
    res.setHeader('x-cache', 'HIT')
    res.end(ssrCache.get(key))
    return
  }

  try {
    const html = await app.renderToHTML(req, res, pagePath, queryParams)

    if (res.statusCode !== 200) {
      res.end(html)
      return
    }

    ssrCache.set(key, html)

    res.setHeader('x-cache', 'MISS')
    res.end(html)
  } catch (err) {
    res.statusCode = 404
    app.renderError(err, req, res, pagePath, queryParams)
  }
}
