
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import splitArray from 'split-array'
import { fetchGallery } from '../actions'



class Gallery extends Component {

  static query = [
    fetchGallery
  ]

  componentDidMount() {
    setTimeout(() => {
      var i = 1
      for(let image of document.querySelectorAll('.gallery-image')) {
        new mojs.Tween({
          delay: 120 * i,
          duration: 1200,
          onUpdate: (progress) => {
            var bp = mojs.easing.bounce.out(progress)
            image.style.opacity = progress
            image.style.transform = `scale(${bp})`
          }
        }).run()
        i++
      }
    }, 1100)
  }

  render() {

    const { dispatch, gallery } = this.props
    const imageRows = gallery && gallery.images ?
            splitArray(gallery.images, 4) :
            []


    return (
      <div>

        {imageRows.map((row) => (

          <div className="row"
               style={{ marginBottom: '15px' }}>

            {row.map((image, index) => (

              <div className="three columns"
                   style={{  }}>

                <img className="gallery-image"
                     key={`galleryimage_${index}`}
                     style={{width: '100%',
                             opacity: 0.01,
                             transform: 'scale(0.01)'}}
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