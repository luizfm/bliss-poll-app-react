export const INITIAL_STATE = {
  id: null,
  imageUrl: '',
  thumbUrl: '',
  question: '',
  choices: []
}

export const UPDATE_STATE = 'UPDATE_STATE'
export const UPDATE_CHOICE = 'UPDATE_CHOICE'

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_STATE: {
      return {
        ...state,
        ...action.payload
      }
    }
    case UPDATE_CHOICE: {
      const { choice } = action.payload

      const updatedChoices = state.choices.map((item) => {
        if (item.choice === choice) {
          return {
            ...item,
            votes: item.votes + 1
          }
        }

        return item
      })

      return {
        ...state,
        choices: updatedChoices
      }
    }
    default:
      return state
  }
}
