
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createStoreWithMiddleware } from '../store'
import reducers from '../reducers'
import Root from '../containers/Root'
import { match, RoutingContext } from 'react-router'
import { createRoutes } from './routes'
import fetchComponentData from './fetchComponentData'


// Creates a Koa middleware that uses the react app to render the html to the client.
export default function middlewareFactory() {
  return async function(ctx, next) {

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

      ctx.body = await renderHTML(renderProps)

    }
    catch(error) {
      if(error.redirectLocation) {
        ctx.redirect(redirectLocation.pathname + redirectLocation.search)
      }
      else {
        ctx.throw(error.status, error.message)
      }
    }

  }
}


async function renderHTML(renderProps) {

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

        <script src="/js/mojs.js"></script>
        <script src="/js/client.js"></script>

      </body>
    </html>
    `
}