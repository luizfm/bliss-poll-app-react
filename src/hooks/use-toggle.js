import { useCallback, useState } from 'react'

export default (initialVisibility = '') => {
  const [visibility, setVisibility] = useState(initialVisibility)

  const onToggleVisibility = useCallback(() => {
    setVisibility((prevValue) => !prevValue)
  }, [])

  return [visibility, onToggleVisibility]
}
