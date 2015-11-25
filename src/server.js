

import Koa from 'koa'
import koaConvert from 'koa-convert'
import staticCache from 'koa-static-cache'
import path from 'path'
import apiMiddleware from './api/middleware'
import render from './lib/render'

const app = new Koa()
const port = process.env.PORT || 3000


app.use(koaConvert(staticCache(path.join(__dirname, '../resources'), {
  maxAge: 10 * 24 * 60 * 60 // 10 days
})))

app.use(apiMiddleware())

app.use(render())

app.listen(port, () => console.log("server started"))