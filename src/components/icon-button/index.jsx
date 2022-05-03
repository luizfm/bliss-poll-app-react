import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import Button from '_components/button'
import Svg from '_components/svg'
import { svgShapeProps } from '_utils/proptypes'

import styles from './styles.css'

export const ICON_BUTTON_THEME = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary'
}

const IconButton = ({
  icon,
  onClick,
  className,
  iconClassName,
  theme,
  ...buttonProps
}) => (
  <Button
    className={classnames(styles['icon-button'], styles[theme], className)}
    onClick={onClick}
    {...buttonProps}
  >
    <Svg icon={icon} className={classnames(styles.icon, iconClassName)} />
  </Button>
)

IconButton.propTypes = {
  icon: svgShapeProps.isRequired,
  className: PropTypes.string,
  iconClassName: PropTypes.string,
  onClick: PropTypes.func,
  theme: PropTypes.oneOf(Object.values(ICON_BUTTON_THEME)),
}

IconButton.defaultProps = {
  className: '',
  iconClassName: '',
  onClick: () => {},
  theme: ICON_BUTTON_THEME.PRIMARY
}

export default React.memo(IconButton)
