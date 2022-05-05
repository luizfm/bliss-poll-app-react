import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import LoadSpinner from '_components/load-spinner'
import Button from '_components/button'
import ErrorImage from '_assets/images/error-image.webp'

import styles from './styles.css'

const QueryResult = ({
  loading, data, error, children, callback, callbackText
}) => {
  const handleCallbackAction = useMemo(
    () => (!callbackText ? (
      { to: '/' }
    ) : (
      { onClick: callback }
    )),
    [callback, callbackText]
  )

  if (error) {
    return (
      <div className={styles['error-card-container']}>
        <p className={styles['error-text']}>Oh no, what just happened?. We&apos;re sorry about this</p>
        <img src={ErrorImage} alt="A person in front of a computer" />
        <Button {...handleCallbackAction}>{callbackText || 'Navigate back to home'}</Button>
      </div>
    )
  }

  if (loading) {
    return (
      <>
        {children}
        <LoadSpinner className={styles.loader} />
      </>
    )
  }

  if (!data) {
    return <p>Nothing to show</p>
  }

  return children
}

QueryResult.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})), PropTypes.shape({}), PropTypes.node
  ]),
  error: PropTypes.bool,
  children: PropTypes.node,
  callback: PropTypes.func,
  callbackText: PropTypes.string
}

QueryResult.defaultProps = {
  loading: false,
  data: null,
  error: false,
  children: null,
  callback: () => {},
  callbackText: ''
}

export default React.memo(QueryResult)
