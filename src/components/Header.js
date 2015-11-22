
import React, {Component, PropTypes} from 'react'
import Radium from 'radium'
import Mojs from '../lib/Mojs'


const links = [
  {url: '/gallery', title:  'Gallery'},
  {url: '/clothes', title:  'Klær'},
  {url: '/about', title:  'About'},
  {url: '/contact', title:  'Contact'}
]

var Header = Radium(class extends Component {

  componentDidMount() {
    this.refs['links'].find('li').forEach((li) => {
      new Mojs.Tween({
        repeat:   999,
        delay:    100,
        onUpdate: function (progress) {
          var bounceProgress = mojs.easing.bounce.out(progress)
          li.style.transform = 'translateY(' + 150*bounceProgress + 'px)'
        }
      }).run()
    })
  }

  render() {
    return (
      <header>

        <div id="logo-wrapper"
             className="twelve column"
             style={{ backgroundImage: 'url("/images/chickentown_lr.jpg")',
                      backgroundSize: 'cover',
                      transition: 'height 0.15s ease',
                      height: 300
             }}>
          <div style={{ backgroundColor: 'white',
                        height: '240px',
                        marginTop: '20px',
                        padding: '10px',
                        width: '100%' }}>
            <img src="/images/neso_logo@1x.png"
                 style={{
                   display: 'block',
                   height: '100%',
                   margin: '0px auto'
                 }}/>
          </div>
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
                           padding: '15px',
                           transform: 'translateY(-150px)' }}>
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

export default Header