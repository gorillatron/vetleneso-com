
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


const app = new Koa()

app.use(koaConvert(staticCache(path.join(__dirname, '../resources'), {
  maxAge: 10 * 24 * 60 * 60 // 10 days
})))

app.use(function (ctx, next) {

  const store = createStore(reducers, {})

  const html = renderToString(
    <Provider store={store}>
      <AppContainer />
    </Provider>
  )

  const initialState = store.getState()

  ctx.body = `
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
        <script src="/js/app.js"></script>
      </body>
    </html>
    `
})

app.listen(3000, () => console.log("server started"))