

import {SET_LOCALE} from "../actions"


const localeHandlers = {

  [SET_LOCALE]: (state, action) => {
    return action.locale
  }

}


export default function locale(state = {}, action) {

  const actionHandler = localeHandlers[action.type]

  if(!actionHandler) {
    return state
  }

  return actionHandler(state, action)
}