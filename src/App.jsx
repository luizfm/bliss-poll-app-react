import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { getServerHealth } from '_modules/server/actions'
import { getServer } from '_modules/server/selectors'
import QueryResult from '_components/query-result'
import { SERVER_STATUS } from '_utils/server-constants'

import './styles/_colors.css'
import './styles/global.css'

import styles from './styles.css'

const App = () => {
  const navigate = useNavigate()
  const { loading, status, error } = useSelector(getServer)
  const dispatch = useDispatch()

  const onFetchServer = useCallback(() => {
    dispatch(getServerHealth())
  }, [dispatch])

  useEffect(() => {
    onFetchServer()
  }, [onFetchServer])

  useEffect(() => {
    if (status === SERVER_STATUS.UP && !error && !loading) {
      navigate('/list')
    }
  }, [error, loading, navigate, status])

  return (
    <div className={styles['app-container']}>
      <QueryResult
        loading={loading}
        error={error}
        data={status}
        callback={onFetchServer}
        callbackText="Try again here"
      />
    </div>
  )
}
export default App
