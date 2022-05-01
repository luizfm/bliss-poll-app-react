import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import LoadSpinner from '_components/load-spinner'
import { getServerHealth } from '_modules/server/actions'

import './styles/_colors.css'
import './styles/global.css'

import styles from './styles.css'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getServerHealth())
  }, [dispatch])

  return (
    <div className={styles['app-container']}>
      <LoadSpinner />
    </div>
  )
}
export default App
