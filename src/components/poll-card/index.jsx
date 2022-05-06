import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import IconButton from '_components/icon-button'
import FavoriteIcon from '_assets/icons/favorite-icon.svg'

import styles from './styles.css'

const PollCard = ({
  choice, votes, className, onSelectOption
}) => (
  <dl className={classnames(styles['poll-card-container'], className)}>
    <dt>{choice}</dt>
    <dd>
      Current votes:
      {' '}
      {votes}
    </dd>
    <IconButton icon={FavoriteIcon} onClick={onSelectOption} id={choice} />
  </dl>
)

PollCard.propTypes = {
  choice: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
  className: PropTypes.string,
  onSelectOption: PropTypes.func,
}

PollCard.defaultProps = {
  className: '',
  onSelectOption: () => {}
}

export default React.memo(PollCard)
