import React, { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import CloseIcon from '_assets/icons/close-icon.svg'
import Modal from '_components/modal'
import Input from '_components/input'
import { getCurrentPageName, contentUrlParse } from '_utils/filter'
import { shareContentResults } from '_modules/question/actions'
import Button, { BUTTON_THEME } from '_components/button'
import IconButton from '_components/icon-button'

import styles from './styles.css'

const ShareScreenModal = ({ onClose, className, sharedData }) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const currentPage = getCurrentPageName(location.pathname)
  const [email, setEmail] = useState('')

  const onEmailChange = useCallback((event) => {
    const { value } = event.target

    setEmail(value)
  }, [])

  const onShareResults = useCallback(() => {
    const url = contentUrlParse({
      ...sharedData,
      path: location.pathname
    })

    dispatch(shareContentResults({ destinationEmail: email, contentUrl: url }))
  }, [dispatch, email, location.pathname, sharedData])

  const queryParams = useMemo(() => Object.keys(sharedData).map((key) => (
    <dd key={key}>
      {key}
      :
      {' '}
      {sharedData[key]}
    </dd>
  )), [sharedData])

  return (
    <Modal
      id="share-screen-modal"
      title="Share your results"
      onClose={onClose}
      className={className}
    >
      <section className={styles['modal-content']}>
        <div className={styles['modal-header']}>
          <h2 className={styles['modal-title']}>Share your results with someone</h2>
          <IconButton icon={CloseIcon} className={styles['close-button']} onClick={onClose} />
        </div>
        <Input
          name="email"
          id="email-input"
          className={styles.input}
          value={email}
          onChange={onEmailChange}
          label="email"
          hiddenLabel
          placeholder="email@gmail.com"
        />
        <dl>
          <dt>
            {`You're about to share the following page and params with ${email}`}
          </dt>
          <dd>
            Page:
            {' '}
            {currentPage}
          </dd>
          <dd>Search Params:</dd>
          {queryParams}
        </dl>

        <Button
          onClick={onShareResults}
          theme={BUTTON_THEME.SECONDARY}
          disabled={!email}
        >
          Send content to typed email
        </Button>
      </section>
    </Modal>
  )
}

ShareScreenModal.propTypes = {
  onClose: PropTypes.func,
  className: PropTypes.string,
  sharedData: PropTypes.shape({
    filter: PropTypes.string,
    offset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    limit: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }).isRequired
}

ShareScreenModal.defaultProps = {
  onClose: () => {},
  className: ''
}

export default React.memo(ShareScreenModal)
