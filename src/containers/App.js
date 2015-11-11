import React, {Component, PropTypes} from "react"
import {connect} from "react-redux"


class App extends Component {

  render() {
    return <div>app container</div>
  }

}

function select(state) {
  return state
}

export default connect(select)(App)