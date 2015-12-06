
import React, { Component } from 'react'
import Radium from 'radium'
import { Router, Route, IndexRoute } from 'react-router'
import AppContainer from '../containers/App'
import Gallery from '../containers/Gallery'
import AboutComponent from '../components/About'


export function createRoutes(){
  return new Promise((resolve) => {
    resolve([
      <Route path="/" component={AppContainer}>
        <IndexRoute component={Gallery}/>
        <Route path="gallery(/:fileName)" component={Gallery} />
        <Route path="about" component={AboutComponent} />
      </Route>
    ])
  })
}