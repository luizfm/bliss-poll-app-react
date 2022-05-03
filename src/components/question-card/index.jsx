import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'

import { formatDate } from '_utils/date'
import { questionShape } from '_utils/proptypes'

import styles from './styles.css'

const QuestionCard = ({ questionItem }) => {
  const {
    question, thumbUrl, publishedAt, choices, id
  } = questionItem

  const dateFormatted = useMemo(() => formatDate(publishedAt), [publishedAt])

  return (
    <Link to={`/questions/${id}`} className={styles['question-card-container']}>
      <img className={styles['card-image']} src={thumbUrl} alt="" />
      <div className={styles['card-content']}>
        <h2 className={styles['card-title']}>{question}</h2>
        <span className={styles['card-published']}>{dateFormatted}</span>
        <span className={styles['card-stack-quantities']}>
          Stack Quantities:
          {' '}
          {choices.length}
        </span>
      </div>
    </Link>
  )
}

QuestionCard.propTypes = {
  questionItem: questionShape.isRequired
}

export default React.memo(QuestionCard)
