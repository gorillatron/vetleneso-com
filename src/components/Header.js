
import React, {Component, PropTypes} from 'react'
import Radium from 'radium'
import { Link } from 'react-router'


const links = [
  {url: '/', title:  'Gallery'},
  {url: '/about', title:  'About'}
]


const Header = Radium(class extends Component {

  componentDidMount() {
    setTimeout(() => this.imageAnimation(), 33)
    setTimeout(() => this.linksAnimation(), 66)
  }

  imageAnimation() {
    new mojs.Tween({
      delay: 150,
      duration: 1000,
      onUpdate: (progress) => {
        var bp = mojs.easing.bounce.out(progress)
        this.refs['logo-image'].style.transform = `scale(${bp})`
      }
    }).run()
  }

  linksAnimation() {
    var offset = -60
    var i = 1
    for(let menuItem of this.refs['menu-items'].querySelectorAll('li')) {
      new mojs.Tween({
        delay: 99 * i + 600,
        duration: 200,
        onUpdate: (progress) => {
          var bp = mojs.easing.bounce.out(progress)
          var y = offset + ((offset * -1) * bp)
          menuItem.style.opacity = progress
        }
      }).run()
      i++
    }
  }

  render() {
    return (
      <header className="container"
              style={{ position: 'relative',
                       padding: '0px 15px',
                       zIndex: 0,
                       backgroundColor: 'white'}}>

        <div>

          <div id="logo-wrapper"
               className="twelve column"
               style={{ transition: 'height 0.15s ease',
                        height: 300
               }}>

            <div style={{ height: '240px',
                          marginTop: '20px',
                          padding: '10px',
                          width: '100%' }}>
              <img ref="logo-image"
                   src="/images/neso_logo@1x.png"
                   style={{
                     display: 'block',
                     height: '100%',
                     margin: '0px auto',
                     transform: 'scale(0)'
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
              <li key={index}
                  style={{ display: 'inline-block',
                           padding: '15px',
                           opacity: 0 }}>
                <Link style={{ color: 'rgb(60,60,60)',
                         ':hover': {
                           color: 'rgb(10,10,10)'
                         },
                         fontFamily: 'Arial Black',
                         fontWeight: 'bold',
                         textTransform: 'uppercase',
                         textDecoration: 'none' }}
                      to={link.url}>{link.title}</Link>
              </li>
            ))}

          </ul>
        </nav>

      </header>
    )
  }

})

export default Header