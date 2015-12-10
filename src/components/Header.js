
import React, {Component, PropTypes} from 'react'
import Radium from 'radium'
import { Link, IndexLink } from 'react-router'


const pages = [
  {url: '/gallery', title:  'Gallery', isIndex: true},
  {url: '/about', title:  'About'},
  {url: '/contact', title:  'Contact'}
]

const styles = {
  header: {
    position: 'relative',
    padding: '0px 15px',
    zIndex: 0,
    backgroundColor: 'white'
  },
  logowrapper: {
    transition: 'height 0.15s ease',
    height: 300
  },
  logoimagewrapper: {
    height: '240px',
    marginTop: '20px',
    padding: '10px',
    width: '100%'
  },
  logoimage: {
    display: 'block',
    height: '100%',
    margin: '0px auto',
    transform: 'scale(0)'
  },
  nav: {
    ul: {
      position: 'relative',
      textAlign: 'center',
      fontSize: '1.55em',
      listStyleType: 'none',
      zIndex: 1,
      margin: 0
    },
    li: {
      display: 'inline-block',
      padding: '15px',
      opacity: 0
    },
    link: {
      color: 'rgb(110,110,110)',
      fontFamily: 'Arial Black',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      textDecoration: 'none'
    },
    activeLink: { color: 'rgb(20,20,20)' }
  }
}


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
              style={styles.header}>

        <div>

          <div id="logo-wrapper"
               className="twelve column"
               style={styles.logowrapper}>

            <div style={styles.logoimagewrapper}>
              <img ref="logo-image"
                   src="/images/neso_logo@1x.png"
                   style={styles.logoimage}/>
            </div>

          </div>
        </div>


        <nav>

          <ul ref="menu-items"
              style={styles.nav.ul}>

            {pages.map((link, index) => (
              <li key={index}
                  style={styles.nav.li}>
                <Link style={Object.assign({}, styles.nav.link, isActiveLink(this.props.pathname, link) ? styles.nav.activeLink : {})}
                      to={link.url}>
                  {link.title}
                </Link>
              </li>
            ))}

          </ul>
        </nav>

      </header>
    )
  }

})

function isActiveLink(pathname, link) {
  return pathname === link.url ||
         pathname === '/' && link.isIndex
}

export default Header