
import Koa from 'koa'
import koaConvert from 'koa-convert'
import staticCache from 'koa-static-cache'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'
import AppContainer from './containers/App'
import { match, RoutingContext } from 'react-router'
import routes from './routes'


const app = new Koa()


app.use(koaConvert(staticCache(path.join(__dirname, '../resources'), {
  maxAge: 10 * 24 * 60 * 60 // 10 days
})))


function render(renderProps) {

  const store = createStore(reducers, {})

  const html = renderToString(
    <Provider store={store}>
      <RoutingContext {...renderProps} />
    </Provider>
  )

  const initialState = store.getState()

  return `
    <!doctype html>
    <html>
      <head>
        <title>Vetle</title>
      </head>
      <body>
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
  match({routes, location: ctx.request.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      ctx.throw(500, error.message)
    } else if (redirectLocation) {
      ctx.redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      ctx.body = render(renderProps)
    } else {
      ctx.throw(400)
    }
  })
})

app.listen(3000, () => console.log("server started"))