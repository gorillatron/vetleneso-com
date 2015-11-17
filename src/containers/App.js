
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Radium from 'radium'


class App extends Component {

  render() {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        'backgroundImage': 'url("/images/chickentown_lr.jpg")',
        'backgroundSize': 'cover'
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