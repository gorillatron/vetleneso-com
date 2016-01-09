
import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from './promiseMiddleware'

const GLOBAL = typeof global !== undefined ? global : window

export const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(
  (GLOBAL.devToolsExtension ?
    GLOBAL.devToolsExtension()(createStore) :
    createStore))