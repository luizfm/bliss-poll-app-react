import api from './api'

const getServerHealth = () => api.get('/health')

export default getServerHealth
