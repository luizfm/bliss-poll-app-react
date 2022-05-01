import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import styles from './styles.css'

export const LOAD_SPINNER_THEME = {
  GRAY: 'gray',
  WHITE: 'white',
}

const LoadSpinner = ({ className, theme }) => (
  <div
    className={classnames(
      styles['load-spinner-container'],
      styles[theme],
      className
    )}
  >
    <div className={styles.loader} />
  </div>
)

LoadSpinner.propTypes = {
  className: PropTypes.string,
  theme: PropTypes.oneOf(Object.values(LOAD_SPINNER_THEME)),
}

LoadSpinner.defaultProps = {
  className: '',
  theme: LOAD_SPINNER_THEME.GRAY,
}

export default React.memo(LoadSpinner)
