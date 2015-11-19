
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

    const imageHeight = this.props.imageHeight
    const backgroundOpacity = imageHeight < 250 ? 0.96 : 0

    return (
      <header className="row"
              ref="header"
              style={{ position: 'fixed',
                       transition: 'all 0.33s ease',
                       backgroundColor: "rgba(255,255,255, " +backgroundOpacity+ ")",
                       boxShadow: imageHeight < 120 ? '0px 2px 0px 0px rgba(0,0,0,1)' : 'none',
                       top: 0,
                       width: 'inherit',
                       maxWidth: '960px',
                       display: 'block'}}>

        <div id="logo-wrapper"
             className="twelve column"
             style={{
               transition: 'height 0.15s ease',
               height: imageHeight
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
            listStyleType: 'none',
            margin: 0
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

  constructor() {
    super()
    this.state = {
      scrollTop: 0,
      lastScrollTop: 0
    }
  }

  componentDidMount() {
    document.addEventListener('scroll', () => {
      const lastScrollTop = this.state.scrollTop
      const scrollTop = document.querySelector('body').scrollTop
      this.setState({ lastScrollTop, scrollTop })
    }, false)
  }

  render() {

    const scrollBase = this.state.scrollTop >= 0 ? (200 - (this.state.scrollTop)) : 0
    const headerImageHeight =  (scrollBase > 0 ? scrollBase : 0) + 72.3

    return (
      <div style={{ width: '100%',
                    height: '100%'}}>

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

              <Header imageHeight={headerImageHeight}/>

              <div id="content"
                   ref="outer-wrapper"
                   style={{ transition: 'margin-top 0.15s ease',
                            minHeight: '100%',
                            marginTop: headerImageHeight + 75 }}>
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