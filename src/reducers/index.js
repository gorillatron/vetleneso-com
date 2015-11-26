
import {combineReducers} from "redux"
import gallery from './gallery'
import locale from './locale'


const reducers = combineReducers({
  gallery,
  locale
})


export default reducers