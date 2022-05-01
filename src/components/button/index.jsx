import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Link } from 'react-router-dom'
import styles from './styles.css'

export const BUTTON_THEME = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary'
}

const Button = ({
  children, className, theme, to, ...restProps
}) => {
  if (to) {
    return (
      <Link
        className={classnames(styles.button, styles[theme], className)}
        to={to}
        {...restProps}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      className={classnames(styles.button, styles[theme], className)}
      type="button"
      {...restProps}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  theme: PropTypes.oneOf(Object.values(BUTTON_THEME)),
  to: PropTypes.string,
}

Button.defaultProps = {
  className: '',
  theme: BUTTON_THEME.PRIMARY,
  to: ''
}

export default Button
