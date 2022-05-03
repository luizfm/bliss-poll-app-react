import { createReducer } from '_utils/redux'
import { SERVER_STATUS } from '_utils/server-constants'
import { GET_SERVER_HEALTH } from './actions'

const INITIAL_STATE = {
  loading: false,
  status: '',
  error: false,
}

const reducer = createReducer(INITIAL_STATE, {
  [GET_SERVER_HEALTH.PENDING]: (state, { payload }) => ({
    ...state,
    loading: true,
  }),
  [GET_SERVER_HEALTH.FULFILLED]: (state, { payload }) => ({
    ...state,
    status: payload.status,
    loading: false,
    error: payload.status !== SERVER_STATUS.UP
  }),
  [GET_SERVER_HEALTH.REJECTED]: (state, { payload }) => ({
    ...state,
    loading: false,
    error: true,
  }),
})

export default reducer
