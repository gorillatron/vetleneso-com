
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createStoreWithMiddleware } from '../store'
import reducers from '../reducers'
import Root from '../containers/Root'
import { match, RoutingContext } from 'react-router'
import { createRoutes } from './routes'
import fetchComponentData from './fetchComponentData'
import { setLocale } from '../actions'


// Creates a Koa middleware that uses the react app to render the html to the client.
export default function middlewareFactory() {
  return async function(ctx, next) {

    // Create the routes component to pass to the react-router/match
    const routes = await createRoutes()

    try {

      // Match the route with the routes and generate the react renderProps
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

      // Set the user-agent for the radium css module
      renderProps.radiumConfig = { userAgent: ctx.req.headers['user-agent'] }

      // Promise based redux store
      const store = createStoreWithMiddleware(reducers, {})

      // Set the locale in the store
      store.dispatch(setLocale(ctx.getLocaleFromCookie() || ctx.getLocaleFromHeader()))

      // Fetch the data that the components are asking for in
      // their static 'query' param
      await fetchComponentData(store.dispatch, renderProps.components, renderProps.params)

      // Render the html to the client
      ctx.body = await renderHTML(renderProps, store)

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


async function renderHTML(renderProps, store) {

  // Render the react app to a string
  const html = renderToString(
    <Root radiumConfig={renderProps.radiumConfig}>
      <Provider store={store}>
        <RoutingContext {...renderProps} />
      </Provider>
    </Root>
  )

  // Fetch the state from the store and pass it to the client.
  // So that the client can pick up the state from where the server left of.
  // In isomorphic terms we call this dehydration and rehydration.
  const initialState = store.getState()

  return `
    <!doctype html>
    <html>
      <head>
        <title>Vetle</title>
        <link rel="stylesheet" href="/css/skeleton/normalize.css" />
        <link rel="stylesheet" href="/css/skeleton/skeleton.css" />
        <link rel="stylesheet" href="/css/fonts.css" />
        <link rel="apple-touch-icon" sizes="57x57" href="/images/favicons/apple-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="60x60" href="/images/favicons/apple-icon-60x60.png">
        <link rel="apple-touch-icon" sizes="72x72" href="/images/favicons/apple-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="76x76" href="/images/favicons/apple-icon-76x76.png">
        <link rel="apple-touch-icon" sizes="114x114" href="/images/favicons/apple-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="120x120" href="/images/favicons/apple-icon-120x120.png">
        <link rel="apple-touch-icon" sizes="144x144" href="/images/favicons/apple-icon-144x144.png">
        <link rel="apple-touch-icon" sizes="152x152" href="/images/favicons/apple-icon-152x152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="/images/favicons/apple-icon-180x180.png">
        <link rel="icon" type="image/png" sizes="192x192"  href="/images/favicons/android-icon-192x192.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicons/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96" href="/images/favicons/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicons/favicon-16x16.png">
        <link rel="manifest" href="manifest.json">
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