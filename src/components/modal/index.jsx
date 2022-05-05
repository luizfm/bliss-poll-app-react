import React from 'react'
import AriaModal from 'react-aria-modal'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './styles.css'

const Modal = ({
  id, onClose, title, children, className
}) => (
  <AriaModal
    titleText={title}
    initialFocus={`#${id}`}
    onExit={onClose}
    underlayClass={styles.modal}
  >
    <div id={id} className={classnames(styles['modal-wrapper'], className)}>
      {children}
    </div>
  </AriaModal>
)

Modal.propTypes = {
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

Modal.defaultProps = {
  onClose: () => {},
  className: ''
}

export default React.memo(Modal)
