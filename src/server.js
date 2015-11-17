
import Koa from 'koa'
import koaConvert from 'koa-convert'
import staticCache from 'koa-static-cache'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'
import Root from './containers/Root'
import { match, RoutingContext } from 'react-router'
import routes from './routes'


const app = new Koa()
const port = process.env.PORT || 3000


app.use(koaConvert(staticCache(path.join(__dirname, '../resources'), {
  maxAge: 10 * 24 * 60 * 60 // 10 days
})))


function render(renderProps) {

  const store = createStore(reducers, {})
  const props = { ...renderProps }

  const html = renderToString(
    <Root radiumConfig={renderProps.radiumConfig}>
      <Provider store={store}>
        <RoutingContext {...props} />
      </Provider>
    </Root>
  )

  const initialState = store.getState()

  return `
    <!doctype html>
    <html>
      <head>
        <title>Vetle</title>
      </head>
      <body>

        <style>
          * {
            padding: 0px;
            margin: 0px;
          }
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


app.use(function(ctx, next) {
  match({routes: routes(), location: ctx.request.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      ctx.throw(500, error.message)
    } else if (redirectLocation) {
      ctx.redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      renderProps.radiumConfig = { userAgent: ctx.req.headers['user-agent'] }
      ctx.body = render(renderProps)
    } else {
      ctx.throw(400)
    }
  })
})

app.listen(port, () => console.log("server started"))