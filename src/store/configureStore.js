import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import promise from 'redux-promise-middleware'
import rootReducer from '_modules/reducers'

const configureStore = (preLoadedState) => {
  const middlewares = [thunk, promise]

  return createStore(
    rootReducer,
    preLoadedState,
    composeWithDevTools(applyMiddleware(...middlewares, logger))
  )
}

export default configureStore
