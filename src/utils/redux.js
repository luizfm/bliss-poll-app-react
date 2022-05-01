import { defineAction as reduxDefine } from 'redux-define'

const REQUEST = ['PENDING', 'FULFILLED', 'REJECTED']

export const defineAction = (type) => reduxDefine(type, REQUEST)

export const createReducer = (initialState, handlers) => (state = initialState, action) => {
  const reduceFn = handlers[action.type]
  return reduceFn ? reduceFn(state, action) : state
}
