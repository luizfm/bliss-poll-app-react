import React, { useEffect, useState } from 'react'
import {
  Navigate, Outlet, useLocation, useNavigate
} from 'react-router-dom'

import './styles/_colors.css'
import './styles/global.css'

import styles from './styles.css'
import useConnectivity from './hooks/use-connectivity'
import { usePrevious } from './hooks/use-previous'

const App = () => {
  const [isOnline, isOffline] = useConnectivity()
  const wasOffline = usePrevious(isOffline)
  const navigate = useNavigate()
  const location = useLocation()
  const [lastPath, setLastPath] = useState('')

  useEffect(() => {
    if (isOffline) {
      if (location.pathname !== '/offline') {
        setLastPath(location.pathname)
      }
      navigate('/offline')
    }
  }, [isOffline, location.pathname, navigate])

  useEffect(() => {
    if (wasOffline && isOnline) {
      navigate(lastPath)
    }
  }, [isOnline, lastPath, navigate, wasOffline])

  useEffect(() => {
    if (!wasOffline && isOnline) {
      navigate('/server-health')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles['app-container']}>
      <Outlet />
    </div>
  )
}
export default App
