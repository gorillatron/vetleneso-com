
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Radium from 'radium'

const links = [
  {url: '/gallery', title:  'Gallery'},
  {url: '/clothes', title:  'Klær'},
  {url: '/about', title:  'About'},
  {url: '/contact', title:  'Contact'}
]

var Header = Radium(class extends Component {

  render() {
    return (
      <header>

        <div id="logo-wrapper"
             className="twelve column"
             style={{
               height: 300
             }}>
          <img src="/images/neso_logo@1x.png"
               style={{
                 display: 'block',
                 height: '100%',
                 margin: '0px auto'
               }}/>
        </div>

        <nav>
          <ul style={{
            textAlign: 'center',
            fontSize: '1.55em',
            listStyleType: 'none'
          }}>
            {links.map((link, index) => (
              <li style={{ display: 'inline-block',
                           padding: '15px' }}>
                <a key={'menu_link_' + index}
                   style={{ color: 'rgb(60,60,60)',
                            ':hover': {
                              color: 'rgb(10,10,10)'
                            },
                            fontFamily: 'Arial Black',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            textDecoration: 'none' }}
                   href={link.url}>
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

      </header>
    )
  }

})


class App extends Component {

  render() {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        'backgroundImage': 'url("/images/chickentown_lr.jpg")',
        'backgroundSize': 'cover'
      }}>

        <div className="outer-wrapper container"
             style={{
               minHeight: '100%',
               backgroundColor: "rgba(255,255,255, 0.97)"
             }}>

          <div className="row">
            <Header/>
          </div>

          <div className="row" id="content">
            {this.props.children}
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