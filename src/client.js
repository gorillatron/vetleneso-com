
// Include the babel polyfill
// Todo: find out if this should be requiered seperatly depending on the browser env
import babelPolyfil from "babel-polyfill"

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import cookies from 'js-cookie'
import Root from './containers/Root'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { createStoreWithMiddleware } from './store'
import reducers from './reducers'
import { createRoutes } from './lib/routes'
import observeStore from './lib/observeStore'
import * as actions from './actions'


(async function() {

  // The state as set up by the server for rehydration
  const initialState = window.__INITIAL_STATE__

  // Set up the react-router routes
  const routes = await createRoutes()

  // Inject the state back into the store.
  // This is called rehydrating in react terms.
  const store = createStoreWithMiddleware(reducers, initialState)
  const appElement = document.getElementById('app')

  // Observe the change of locale and set the new locale
  // in the cookie so subsequent request use the same locale.
  observeStore(store, (state) => state.locale, (locale) => {
    cookies.set('locale', locale)
  })

  window.dev = {
    store,
    actions
  }

  render(
    <Root>
      <Provider store={store}>
        <Router routes={routes} history={createBrowserHistory()}/>
      </Provider>
    </Root>,
    appElement
  )
})();