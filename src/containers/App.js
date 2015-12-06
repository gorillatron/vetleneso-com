
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Radium from 'radium'
import Header from '../components/Header'


class App extends Component {

  static query = [

  ]

  constructor() {
    super()
  }

  componentDidMount() {
    document.body.addEventListener('click', (event) => {
      const y = event.clientY + document.body.scrollTop
      const x = event.clientX
      var burst = new mojs.Burst({
        count: 7,
        radius: { 10: 50},
        shape:    'circle',
        fill:     [ '#00FA92', '#C0E752', '#FECE52', '#FFA0F4', '#00BCAF', '#FF1CEE' ],
        x, y
      })
    })
  }

  render() {
    return (
      <div style={{ position: 'relative',
                    zIndex: 0,
                    width: '100%',
                    height: '100%'}}>


        <div style={{ position: 'fixed',
                      zIndex: 1,
                      width: '100%',
                      height: '100%',
                      backgroundImage: 'url("/images/chickentown_lr.jpg")',
                      backgroundSize: 'cover', }}>
        </div>

        <div style={{ position: 'relative',
                      zIndex: 2,
                      width: '100%',
                      height: '100%'}}>

            <Header/>

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