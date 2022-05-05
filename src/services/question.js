import humps from 'humps'

import api from './api'

export const getQuestionsService = (params) => api.get('/questions', {
  params: {
    limit: 10,
    ...params,
  }
})

export const shareContentResultsService = (params) => api.post('/share', {
  params: {
    ...humps.decamelizeKeys(params)
  }
})
