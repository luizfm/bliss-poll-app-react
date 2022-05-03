import humps from 'humps'

import { createReducer } from '_utils/redux'

import { GET_QUESTIONS } from './actions'

const INITIAL_STATE = {
  questions: [],
  results: [],
  loading: false,
  error: false,
}

const reducer = createReducer(INITIAL_STATE, {
  [GET_QUESTIONS.PENDING]: (state) => ({
    ...state,
    loading: true
  }),
  [GET_QUESTIONS.FULFILLED]: (state, { payload }) => {
    const questionsIds = payload.map((question) => question.id)

    const questions = {}
    payload.forEach((question) => {
      questions[question.id] = humps.camelizeKeys(question)
    })

    return {
      ...state,
      questions,
      results: questionsIds,
      loading: false,
    }
  },
  [GET_QUESTIONS.REJECTED]: (state) => ({
    ...state,
    loading: false,
    error: true,
  })
})

export default reducer
