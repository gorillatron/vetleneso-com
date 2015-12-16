
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import splitArray from 'split-array'
import { Link } from 'react-router'
import { fetchGallery, setSelectedImage } from '../actions'
import Radium from 'radium'


class FullScreenImage extends Component {

  render() {
    return (
      <div ref="element"
           style={{ position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: 10,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0, 0.8)' }}>
        <Link to="/gallery">
          <div style={{ position: 'absolute',
                        cursor: 'pointer',
                        top: '15px',
                        right: '20px',
                        fontSize: '1.7em',
                        color: 'white'}}>
            &#10006;
          </div>
        </Link>
        <img ref="selected-image-img"
             src={this.props.selectedImage.imageUrl}
             style={{ display: 'block',
                      margin: '5% auto',
                      maxWidth: '80%',
                      height: '80%'}}/>
      </div>
    )
  }

}


const Gallery = Radium(class extends Component {

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
                         cursor: 'pointer',
                         transform: 'scale(0.01)'
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
})


function select(state) {
  return {gallery: state.gallery}
}


export default connect(select)(Gallery)