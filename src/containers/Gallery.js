
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import splitArray from 'split-array'
import { fetchGallery, setSelectedImage } from '../actions'



class Gallery extends Component {

  static query = [
    fetchGallery
  ]

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

    const selectedImage = gallery ? gallery.selectedImage : void 0

    return (
      <div>

        {selectedImage &&
          <div style={{ position: 'fixed',
                        top: 0,
                        left: 0,
                        zIndex: 10,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0, 0.8)' }}>
            <div onClick={() => dispatch(setSelectedImage(null))}
                 style={{ position: 'absolute',
                          cursor: 'pointer',
                          top: '15px',
                          right: '20px',
                          fontSize: '1.7em',
                          color: 'white'}}>
              &#10006;
            </div>
            <img src={selectedImage.url}
                 style={{ display: 'block',
                          margin: '10% auto',
                          maxWidth: '80%',
                          height: '80%'}}/>
          </div>}

        {imageRows.map((row, index) => (

          <div key={`row_${index}`}
               className="row"
               style={{ marginBottom: '15px' }}>

            {row.map((image, index) => (

              <div onClick={() => dispatch(setSelectedImage(image))}
                   key={`galleryimage_${index}`}
                   className="three columns">

                <img className="gallery-image"
                     style={{ width: '100%',
                              opacity: 0.01,
                              cursor: 'pointer',
                              transform: 'scale(0.01)' }}
                     src={image.url} />

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

export default connect(select)(Gallery)