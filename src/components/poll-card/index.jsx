import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import IconButton, { ICON_BUTTON_THEME } from '_components/icon-button'
import FavoriteIcon from '_assets/icons/favorite-icon.svg'
import Lottie from '_components/lottie'

import styles from './styles.css'

const PollCard = ({
  choice, votes, className, onSelectOption, animation
}) => (
  <dl className={classnames(styles['poll-card-container'], className)}>
    {animation && (
      <Lottie lottieFile={animation} />
    )}
    <dt className={styles.choice}>{choice}</dt>
    <dd className={styles.votes}>
      Current votes:
      {' '}
      {votes}
    </dd>
    <IconButton
      className={styles['favorite-button']}
      iconClassName={styles['favorite-icon']}
      icon={FavoriteIcon}
      onClick={onSelectOption}
      id={choice}
      theme={ICON_BUTTON_THEME.GHOST}
    />
  </dl>
)

PollCard.propTypes = {
  choice: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
  className: PropTypes.string,
  onSelectOption: PropTypes.func,
  animation: PropTypes.shape({})
}

PollCard.defaultProps = {
  className: '',
  onSelectOption: () => {},
  animation: null
}

export default React.memo(PollCard)
