
import api from 'api'

export const FETCH_GALLERY = "FETCH_GALLERY"
export const SET_SELECTED_IMAGE = "SET_SELECTED_IMAGE"
export const FETCH_GALLERY_RESOLVE = "FETCH_GALLERY_RESOLVE"

export function fetchGallery() {
  return { type: FETCH_GALLERY,
           promise: api.callMethod('fetchGallery')}
}

export function setSelectedImage(image) {
  return { type: SET_SELECTED_IMAGE,
           image }
}


export const SET_LOCALE = "SET_LOCALE"

export function setLocale(locale) {
  return { type: SET_LOCALE,
           locale }
}