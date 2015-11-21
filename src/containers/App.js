
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Radium from 'radium'
import Header from '../components/Header'

class App extends Component {

  constructor() {
    super()
  }

  render() {
    return (
      <div style={{ width: '100%',
                    height: '100%' }}>

        <div style={{ position: 'fixed',
                      zIndex: 1,
                      width: '100%',
                      height: '100%',
                      'backgroundImage': 'url("/images/chickentown_lr.jpg")',
                      'backgroundSize': 'cover' }}>
        </div>

        <div style={{ position: 'relative',
                      zIndex: 2,
                      width: '100%',
                      height: '100%'}}>

            <div className="container"
                 style={{ padding: '1px',
                          minHeight: '100%',
                          backgroundColor: "rgba(255,255,255, 0.97)"
                 }}>

              <Header/>

              <div id="content"
                   ref="outer-wrapper">
                {this.props.children}
              </div>

            </div>

          </div>

      </div>
    )
  }

}


function select(state) {
  return state
}


export default connect(select)(Radium(App))