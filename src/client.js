
require("babel-polyfill")

import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import Root from './containers/Root'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import reducers from './reducers'
import { createRoutes } from './routes'


var init = async function() {

  const initialState = window.__INITIAL_STATE__

  console.log('lol')
  const routes = await createRoutes()
  console.log('lol')
  const store = createStore(reducers, initialState)
  const appElement = document.getElementById('app')

  render(
    <Root>
      <Provider store={store}>
        <Router routes={routes} history={createBrowserHistory()}/>
      </Provider>
    </Root>,
    appElement
  )
}

init()
