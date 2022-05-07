import humps from 'humps'

import api from './api'

export const getQuestionsService = (params) => api.get('/questions', {
  params: {
    limit: 10,
    ...params,
  }
})

export const getQuestionService = (questionId) => api.get(`/questions/${questionId}`)

export const updateQuestionService = (questionId, payload) => api.put(`/questions/${questionId}`, payload)

export const shareContentResultsService = (params) => api.post('/share', {
  params: {
    ...humps.decamelizeKeys(params)
  }
})
