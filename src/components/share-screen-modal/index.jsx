import React, { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useLocation, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import CloseIcon from '_assets/icons/close-icon.svg'
import Modal from '_components/modal'
import Input from '_components/input'
import { getCurrentPageName, contentUrlParse, PARAMS_AND_PAGE_ICONS } from '_utils/filter'
import { shareContentResults } from '_modules/question/actions'
import Button, { BUTTON_THEME } from '_components/button'
import IconButton from '_components/icon-button'
import Svg from '_components/svg'

import styles from './styles.css'

const ShareScreenModal = ({ onClose, className, sharedData }) => {
  const dispatch = useDispatch()
  const urlParams = useParams()

  const location = useLocation()
  const currentPage = getCurrentPageName(location.pathname, urlParams)
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

  const queryParams = useMemo(() => Object.keys(sharedData || {}).map((key) => (
    <div className={styles['param-description-box']}>
      <Svg icon={PARAMS_AND_PAGE_ICONS[key]} className={styles['param-icon']} />
      <dd key={key}>
        {key}
        :
        {' '}
        {sharedData[key]}
      </dd>
    </div>
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
          <p className={styles['share-tip']}>
            {`You're about to share the following page with ${email || '(inform an email)'}`}
          </p>
          <dt className={styles['page-info-container']}>
            <Svg icon={PARAMS_AND_PAGE_ICONS.PAGE} />
            <span>Page: </span>
            {currentPage}
          </dt>
          {sharedData && (
            <>
              <div className={styles['param-description-container']}>
                {queryParams}
              </div>
            </>
          )}
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
  })
}

ShareScreenModal.defaultProps = {
  onClose: () => {},
  className: '',
  sharedData: null
}

export default React.memo(ShareScreenModal)
