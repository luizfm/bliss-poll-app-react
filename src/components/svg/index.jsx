import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import { svgShapeProps } from '_utils/proptypes'

import styles from './styles.css'

const Svg = ({ icon, className }) => (
  <svg
    viewBox={icon.viewBox}
    aria-hidden="true"
    className={classnames(styles.icon, className)}
  >
    <use xlinkHref={`#${icon.id}`} />
  </svg>
)

Svg.propTypes = {
  icon: svgShapeProps.isRequired,
  className: PropTypes.string,
}

Svg.defaultProps = {
  className: ''
}

export default Svg
