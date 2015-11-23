
import React, {Component, PropTypes} from 'react'
import Radium from 'radium'


const links = [
  {url: '/gallery', title:  'Gallery'},
  {url: '/clothes', title:  'Klær'},
  {url: '/about', title:  'About'},
  {url: '/contact', title:  'Contact'}
]


const Header = Radium(class extends Component {

  componentDidMount() {
    for(let menuItem of this.refs['menu-items'].querySelectorAll('li')) {
      console.log(menuItem)
    }
  }

  render() {
    return (
      <header>

        <div className="container"
             style={{ zIndex: 3
             }}>
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
        </div>


        <nav>
          <ul ref="menu-items"
              style={{ position: 'relative',
                       textAlign: 'center',
                       fontSize: '1.55em',
                       listStyleType: 'none',
                       zIndex: 1,
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

export default Header