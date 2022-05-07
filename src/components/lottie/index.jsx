import React, { useMemo } from 'react'
import ReactLottie from 'react-lottie'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './styles.css'

const Lottie = ({
  lottieFile, height, width, className
}) => {
  const lottieOptions = useMemo(() => ({
    loop: true,
    autoplay: true,
    animationData: lottieFile,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }), [lottieFile])

  return (
    <div className={classnames(styles['lottie-container'], className)}>
      <ReactLottie
        options={lottieOptions}
        height={height}
        width={width}
      />
    </div>
  )
}

Lottie.propTypes = {
  lottieFile: PropTypes.shape({}).isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
  className: PropTypes.string,
}

Lottie.defaultProps = {
  height: 100,
  width: 100,
  className: ''
}

export default React.memo(Lottie)
