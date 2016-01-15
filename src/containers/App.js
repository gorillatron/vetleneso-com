
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Radium, { Style } from 'radium'
import Header from '../components/Header'


const styles = {

  body: {
    fontFamily: 'Helvetica Neue',
    fontSize: '16px',
    letterSpacing: '0.2px',
    lineHeight: '25.6px',
    color: 'rgb(51,51,51)'
  },

  img: {
    borderRadius: '2px'
  }

}


class App extends Component {

  render() {
    return (
      <div style={{ position: 'relative',
                    zIndex: 0,
                    width: '100%',
                    height: '100%'}}>

        <Style rules={styles} />

        <div style={{ position: 'fixed',
                      zIndex: 1,
                      width: '100%',
                      height: '100%',
                      backgroundSize: 'cover', }}>
        </div>

        <div style={{ position: 'relative',
                      zIndex: 2,
                      width: '100%',
                      height: '100%'}}>

            <Header pathname={this.props.location.pathname}/>

            <div className="container"
                 style={{ padding: '0px 15px',
                          minHeight: '100%',
                          backgroundColor: 'white'
                 }}>

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