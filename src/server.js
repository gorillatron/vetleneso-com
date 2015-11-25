

import Koa from 'koa'
import koaConvert from 'koa-convert'
import staticCache from 'koa-static-cache'
import path from 'path'
import apiMiddleware from './api/middleware'
import render from './lib/render'

const app = new Koa()
const port = process.env.PORT || 3000

// Serve static files
// with caching for 10 days
app.use(koaConvert(staticCache(path.join(__dirname, '../resources'), {
  maxAge: 10 * 24 * 60 * 60
})))

// Set up router for calling api methods from the client
app.use(apiMiddleware())

// The main method that render the React app and outputs
// the html to the user. Does routing with react-router
app.use(render())

app.listen(port, () => console.log("server started"))