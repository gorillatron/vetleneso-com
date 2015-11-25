
import Router from 'koa-router'
import {handlers as apiHandlers} from './server'


export default function middlewareFactory() {
  const apiRouter = new Router()

  apiRouter.get('/api/:methodName', async function(ctx, next) {

    const handler = apiHandlers[ctx.params.methodName]

    if(!handler) {
      return ctx.throw(404, `no handler for method: ${methodName}`)
    }

    const result = await handler()

    ctx.body = result
  })

  return apiRouter.routes()
}