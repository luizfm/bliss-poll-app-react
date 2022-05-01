import getServerHealthService from '_services/server'
import { defineAction } from '_utils/redux'

export const GET_SERVER_HEALTH = defineAction('GET_SERVER_HEALTH')

export const getServerHealth = () => (dispatch) => dispatch({
  type: GET_SERVER_HEALTH,
  payload: getServerHealthService(),
})
