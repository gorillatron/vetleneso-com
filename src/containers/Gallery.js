
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import splitArray from 'split-array'
import { Link } from 'react-router'
import { fetchGallery, setSelectedImage } from '../actions'
import Radium from 'radium'
import requestAnimationFrame from 'raf'


class FullScreenImage extends Component {

  componentDidMount() {
    const img = this.refs['selected-image-img']

    this.showLoader()

    const loaded = () => {
      setTimeout(() => {
        requestAnimationFrame(() => {
          this.hideLoader()
          img.style.opacity = 1
        })
      }, 2100)
    }

    if(img.complete) {
      loaded()
    } else {
      img.addEventListener('load', loaded)
    }

    img.src = this.props.selectedImage.imageUrl
  }

  showLoader() {
    const loader = this.refs['loader']

    requestAnimationFrame(() => {
      loader.style.opacity = 1
    })

    requestAnimationFrame(() => {
      new mojs.Tween({
        repeat:   9999,
        delay:    0,
        duration: 737,
        onUpdate: function (progress) {
          var easingProgress = mojs.easing.bounce.out(progress)
          loader.style.transform = 'scale(' + (1 - (.7*easingProgress)) + ')'
        }
      }).run()
    })
  }

  hideLoader() {
    const loader = this.refs['loader']
    requestAnimationFrame(() => {
      loader.style.opacity = 0.0001
    })
  }

  render() {
    return (
      <div ref="element"
           style={{ position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: 10,
                    width: '100%',
                    height: '100%',
                    boxSizing: 'border-box',
                    backgroundColor: 'rgba(0,0,0, 0.88)' }}>

        <Link to="/gallery">
          <div style={{ position: 'absolute',
                        cursor: 'pointer',
                        top: '15px',
                        right: '20px',
                        fontSize: '1.7em',
                        color: 'white'}}>
            ×
          </div>
        </Link>

        <div ref="loader"
             style={{
               width: '30px',
               height: '30px',
               borderRadius: '16px',
               backgroundColor: 'rgb(230, 40, 70)',
               position: 'absolute',
               opacity: 0.0001,
               top: '50%',
               left: '50%',
               margin: '-15px -15px 0px 0px'
             }}></div>

        <img ref="selected-image-img"
             style={{ display: 'block',
                      margin: '5% auto',
                      opacity: '0.001',
                      maxWidth: '80%',
                      transition: 'opacity 0.3s ease',
                      height: '80%'}}/>
      </div>
    )
  }

}

class Gallery extends Component {

  static query = [
    fetchGallery
  ];

  componentDidMount() {

    if(!this.props.gallery || !this.props.gallery.images) {
      this.props.dispatch(fetchGallery())
    }

    setTimeout(() => {
      var i = 1
      for(let image of document.querySelectorAll('.gallery-image')) {
        new mojs.Tween({
          delay: 120 * i,
          duration: 700,
          onUpdate: (progress) => {
            var bp = mojs.easing.bounce.out(progress)
            image.style.opacity = progress
            image.style.transform = `scale(${bp})`
          }
        }).run()
        i++
      }
    }, 300)
  }

  render() {

    const { dispatch, gallery } = this.props
    const imageRows = gallery && gallery.images ?
            splitArray(gallery.images, 4) :
            []

    let selectedImage = void 0

    if(this.props.params && this.props.params.fileName) {
      const selectedImageFileName = this.props.params.fileName
      selectedImage = this.props.gallery.images.find((image, index) => {
        return image.fileName == selectedImageFileName
      })
    }

    return (
      <div>

        { selectedImage &&
          <FullScreenImage selectedImage={selectedImage} /> }

        {imageRows.map((row, rowindex) => (

          <div key={`row_${rowindex}`}
               className="row"
               style={{ marginBottom: '15px' }}>

            {row.map((image, imageindex) => (

              <div key={`galleryimage_${rowindex}/${imageindex}`}
                   className="three columns">

                <Link to={`/gallery/${image.fileName}`}>
                  <img ref={`${image.fileName}_img`}
                       className="gallery-image"
                       style={{
                         width: '100%',
                         opacity: 0.01,
                         cursor: 'pointer'
                       }}
                       src={image.thumbUrl} />
                </Link>

              </div>
            ))}

          </div>

        ))}
      </div>
    )
  }
}


function select(state) {
  return {gallery: state.gallery}
}

const RGallery = Radium(Gallery)

export default connect(select)(RGallery)