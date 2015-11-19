
import React, { Component } from 'react'
import Radium from 'radium'
import { Router, Route, Link } from 'react-router'
import AppContainer from './containers/App'
import AboutComponent from './components/About'


export function createRoutes(){
  return new Promise((resolve) => {
    resolve([
      <Route path="/" component={AppContainer}>
        <Route path="about" component={AboutComponent} />
      </Route>
    ])
  })
}