import { getQuestionsService, shareContentResultsService } from '_services/question'
import { defineAction } from '_utils/redux'

export const GET_QUESTIONS = defineAction('GET_QUESTIONS')
export const SHARE_CONTENT_RESULTS = defineAction('SHARE_CONTENT_RESULTS')

export const getQuestions = ({ params }) => (dispatch) => dispatch({
  type: GET_QUESTIONS,
  payload: getQuestionsService(params).then((response) => response.data)
})

export const shareContentResults = ({ destinationEmail, contentUrl }) => (dispatch) => dispatch({
  type: SHARE_CONTENT_RESULTS,
  payload: shareContentResultsService({ destinationEmail, contentUrl })
})
