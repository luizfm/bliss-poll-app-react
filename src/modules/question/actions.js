import {
  getQuestionsService, shareContentResultsService, getQuestionService, updateQuestionService
} from '_services/question'
import { defineAction } from '_utils/redux'

export const GET_QUESTIONS = defineAction('GET_QUESTIONS')
export const GET_QUESTION = defineAction('GET_QUESTION')
export const UPDATE_QUESTION = defineAction('UPDATE_QUESTION')
export const SHARE_CONTENT_RESULTS = defineAction('SHARE_CONTENT_RESULTS')

export const getQuestions = ({ params }) => (dispatch) => dispatch({
  type: GET_QUESTIONS,
  payload: getQuestionsService(params).then((response) => response.data)
})

export const getQuestion = (questionId) => (dispatch) => dispatch({
  type: GET_QUESTION,
  payload: getQuestionService(questionId).then((response) => response.data)
})

export const updateQuestion = (questionId, payload) => (dispatch) => dispatch({
  type: UPDATE_QUESTION,
  payload: updateQuestionService(questionId, payload).then((response) => response.data)
})

export const shareContentResults = ({ destinationEmail, contentUrl }) => (dispatch) => dispatch({
  type: SHARE_CONTENT_RESULTS,
  payload: shareContentResultsService({ destinationEmail, contentUrl })
})
