import humps from 'humps'

import api from './api'

export const getQuestionsService = (params) => {
  console.log({ params })
  return api.get('/questions', {
    params: {
      ...params,
      limit: 10,
    }
  })
}

export const shareContentResultsService = (params) => api.post('/share', {
  params: {
    ...humps.decamelizeKeys(params)
  }
})
