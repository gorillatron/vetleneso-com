
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchGallery } from '../actions'


class Gallery extends Component {

  static query = [
    fetchGallery
  ]

  render() {

    const { dispatch, gallery } = this.props

    return (
      <div>
        {gallery && gallery.images &&
          gallery.images.map((image) => (
            <div>{image}</div>
          )
        )}
      </div>
    )
  }
}

function select(state) {
  return {gallery: state.gallery}
}

export default connect(select)(Gallery)