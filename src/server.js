
import Koa from 'koa'
import koaConvert from 'koa-convert'
import staticCache from 'koa-static-cache'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createStoreWithMiddleware } from './store'
import reducers from './reducers'
import Root from './containers/Root'
import { match, RoutingContext } from 'react-router'
import { createRoutes } from './routes'
import fetchComponentData from './lib/fetchComponentData'


const app = new Koa()
const port = process.env.PORT || 3000


app.use(koaConvert(staticCache(path.join(__dirname, '../resources'), {
  maxAge: 10 * 24 * 60 * 60 // 10 days
})))


async function render(renderProps) {

  const store = createStoreWithMiddleware(reducers, {})

  const data = await fetchComponentData(store.dispatch, renderProps.components, renderProps.params)

  const html = renderToString(
    <Root radiumConfig={renderProps.radiumConfig}>
      <Provider store={store}>
        <RoutingContext {...renderProps} />
      </Provider>
    </Root>
  )

  const initialState = store.getState()

  return `
    <!doctype html>
    <html>
      <head>
        <title>Vetle</title>
        <link rel="stylesheet" href="/css/skeleton/normalize.css" />
        <link rel="stylesheet" href="/css/skeleton/skeleton.css" />
        <link rel="stylesheet" href="/css/fonts.css" />
      </head>
      <body>

        <style>
          html, body, #app {
            height: 100%;
            width: 100%;
          }
        </style>

        <div id="app">${html}</div>

        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>

        <script src="/js/client.js"></script>

      </body>
    </html>
    `
}

app.use(async function(ctx, next) {

  const routes = await createRoutes()

  try {

    const renderProps = await new Promise((resolve, reject) => {
      match({routes: routes, location: ctx.request.url }, (error, redirectLocation, renderProps) => {
        if (error) {
          throw {...error, status: 500}
        } else if (redirectLocation) {
          throw {...error, redirectLocation}
        } else if (renderProps) {
          resolve(renderProps)
        } else {
          throw {...error, status: 400}
        }
      })
    })

    renderProps.radiumConfig = { userAgent: ctx.req.headers['user-agent'] }
    ctx.body = await render(renderProps)

  }
  catch(error) {
    if(error.redirectLocation) {
      ctx.redirect(redirectLocation.pathname + redirectLocation.search)
    }
    else {
      ctx.throw(error.status, error.message)
    }
  }

})

app.listen(port, () => console.log("server started"))