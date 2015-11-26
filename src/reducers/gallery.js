
import {FETCH_GALLERY_RESOLVE, SET_SELECTED_IMAGE} from "../actions"


const galleryHandlers = {

  [FETCH_GALLERY_RESOLVE]: (state, action) => {
    return {...state, images: action.value}
  },

  [SET_SELECTED_IMAGE]: (state, action) => {
    return {...state, selectedImage: action.image }
  }

}


export default function gallery(state = {}, action) {

  const actionHandler = galleryHandlers[action.type]

  if(!actionHandler) {
    return state
  }

  return actionHandler(state, action)

}