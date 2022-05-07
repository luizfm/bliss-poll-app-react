import { useCallback, useEffect, useState } from 'react'

export default () => {
  const [isOnline, setIsOnline] = useState(true)
  const [isOffline, setIsOffline] = useState(false)

  const handleOnline = useCallback(() => {
    setIsOnline(true)
    setIsOffline(false)
  }, [])

  const handleOffline = useCallback(() => {
    setIsOnline(false)
    setIsOffline(true)
  }, [])

  useEffect(() => {
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [handleOffline, handleOnline])

  return [isOnline, isOffline]
}
