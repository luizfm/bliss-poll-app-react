export const INITIAL_STATE = {
  filter: '',
  limit: 10,
  offset: null
}

export const UPDATE_FILTER = 'UPDATE_FILTER'

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_FILTER: {
      return {
        ...state,
        ...action.payload
      }
    }
    default:
      return state
  }
}
