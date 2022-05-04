import React, { useCallback, useState } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import Svg from '_components/svg'
import { svgShapeProps } from '_utils/proptypes'

import styles from './styles.css'

const Input = React.forwardRef(({
  id,
  name,
  onChange,
  value,
  label,
  hiddenLabel,
  className,
  startAdornment,
  endAdornment,
  error,
  ...inputProps
}, ref) => {
  const [isFocused, setIsFocused] = useState(false)

  const onFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const onBlur = useCallback(() => {
    setIsFocused(false)
  }, [])

  return (
    <div className={classnames(styles['input-container'], className)}>
      <label htmlFor={id} className={classnames(styles.label, { [styles['hidden-label']]: hiddenLabel })}>{label}</label>
      <div className={classnames(styles['input-wrapper'], { [styles.focused]: isFocused })}>
        {startAdornment && (
          <Svg className={styles['start-adornment']} icon={startAdornment} />
        )}
        <input
          ref={ref}
          className={styles.input}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          {...inputProps}
        />
        {endAdornment && (
          <Svg className={styles['end-adornment']} icon={endAdornment} />
        )}
      </div>
      {!!error && <span className={styles['error-message']}>{error}</span>}
    </div>
  )
})

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
  error: PropTypes.string,
  hiddenLabel: PropTypes.bool,
  className: PropTypes.string,
  startAdornment: svgShapeProps,
  endAdornment: svgShapeProps,
}

Input.defaultProps = {
  hiddenLabel: false,
  value: '',
  className: '',
  startAdornment: null,
  endAdornment: null,
  onChange: () => {},
  error: '',
}

export default Input
