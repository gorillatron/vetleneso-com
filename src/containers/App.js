import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Radium from 'radium'


class App extends Component {

  render() {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        background: 'url("/images/chickentown.jpg")',
        'background-size': 'cover'
      }}>
        {this.props.children}
      </div>
    )
  }

}


function select(state) {
  return state
}


export default connect(select)(Radium(App))