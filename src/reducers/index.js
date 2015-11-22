
import {combineReducers} from "redux"
import {FETCH_GALLERY_RESOLVE} from "../actions"


const galleryHandlers = {

  [FETCH_GALLERY_RESOLVE]: (state, action) => {
    return {...state, images: action.value}
  }

}


function gallery(state = {}, action) {

  const actionHandler = galleryHandlers[action.type]

  if(!actionHandler) {
    return state
  }

  return actionHandler(state, action)

}


const reducers = combineReducers({
  gallery
})


export default reducers