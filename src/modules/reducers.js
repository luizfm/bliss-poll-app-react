import { combineReducers } from 'redux'

import question from './question/reducer'
import server from './server/reducer'

const appReducer = combineReducers({ question, server })

const rootReducer = (state, action) => appReducer(state, action)

export default rootReducer
