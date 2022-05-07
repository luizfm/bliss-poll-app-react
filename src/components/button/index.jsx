import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Link } from 'react-router-dom'
import styles from './styles.css'

export const BUTTON_THEME = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  GHOST: 'ghost'
}

const Button = ({
  children,
  className,
  theme,
  to,
  disabled,
  ...restProps
}) => {
  const buttonStyles = useMemo(() => ({
    className: classnames(
      styles.button,
      styles[theme],
      { [styles.disabled]: disabled },
      className
    )
  }), [className, disabled, theme])

  if (to) {
    return (
      <Link
        to={to}
        disabled={disabled}
        {...buttonStyles}
        {...restProps}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      type="button"
      disabled={disabled}
      {...buttonStyles}
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
  disabled: PropTypes.bool,
}

Button.defaultProps = {
  className: '',
  theme: BUTTON_THEME.PRIMARY,
  to: '',
  disabled: false,
}

export default Button
