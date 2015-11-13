import React, {Component, PropTypes} from "react"
import {connect} from "react-redux"
import { Router, Route, Link } from 'react-router'


class Site extends Component {

  render() {
    return (
      <div>
        Site
        {this.props.children}
      </div>
    )
  }

}


class App extends Component {

  render() {
    return (
      <Router>
        <Route path="/" component={Site}>
        </Route>
      </Router>
    )
  }

}

function select(state) {
  return state
}

export default connect(select)(App)