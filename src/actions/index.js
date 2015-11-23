
import * as api from 'api'

export const FETCH_GALLERY = "FETCH_GALLERY"
export const FETCH_GALLERY_RESOLVE = "FETCH_GALLERY_RESOLVE"

export function fetchGallery() {
  return { type: FETCH_GALLERY,
           promise: api.fetchGallery()}
}