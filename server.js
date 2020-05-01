const { createServer } = require('http')
const next = require('next')
const { parse } = require('url')
const { join } = require('path')

const routes = require('./routes')
const LRUCache = require('lru-cache')

const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 * 24 * 365
})

const isDev = process.env.NODE_ENV !== 'production'

const app = next({
  dev: isDev
})

const handler = routes.getRequestHandler(app)

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl

    if (pathname === '/robots.txt') {
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.write('User-agent: *\nSitemap: https://shici.xiange.tech/sitemap/site.xml')
      res.end()
    } else if (pathname === '/') {
      renderAndCache(req, res, '/poems', {})
    } else {
      handler(req, res)
    }
  }).listen(3000)
})

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
