import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import Root from './containers/Root'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import reducers from './reducers'
import routes from './routes'

const initialState = window.__INITIAL_STATE__

const store = createStore(reducers, initialState)

render(
  <Root>
    <Provider store={store}>
      <Router routes={routes()} history={createBrowserHistory()}/>
    </Provider>
  </Root>,
  document.getElementById('app')
)