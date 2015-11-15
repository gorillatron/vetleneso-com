
import React from 'react'
import { Router, Route, Link } from 'react-router'
import AppContainer from './containers/App'
import AboutComponent from './components/About'


const routes = [
  <Route path="/" component={AppContainer}>
    <Route path="about" component={AboutComponent} />
  </Route>
]


export default routes