
import {FETCH_GALLERY_RESOLVE} from "../actions"


const galleryHandlers = {

  [FETCH_GALLERY_RESOLVE]: (state, action) => {
    return {...state, images: action.value}
  }

}


export default function gallery(state = {}, action) {

  const actionHandler = galleryHandlers[action.type]

  if(!actionHandler) {
    return state
  }

  return actionHandler(state, action)

}