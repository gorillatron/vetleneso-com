
import {combineReducers} from "redux"
import {FETCH_GALLERY} from "../actions"

function gallery(state = {}, action) {
  switch(action.type) {
    case FETCH_GALLERY:
      return {...state, images: ["tore", "pål", "per"]}
    default:
      return state
  }
}

const app = combineReducers({
  gallery
})

export default app