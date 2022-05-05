import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import ArrowBackIcon from '_assets/icons/arrow-back-icon.svg'
import IconButton from '_components/icon-button'
import { getQuestionByIdSelector } from '_modules/question/selectors'

import styles from './styles.css'

const QuestionDetails = () => {
  const { questionId } = useParams()
  const question = useSelector((state) => getQuestionByIdSelector(state, questionId))
  console.log(question)

  return (
    <main className={styles['question-details-container']}>
      <img alt="A background for current question" className={styles['cover-image']} />
      <div className={styles['content-wrapper']}>
        <IconButton icon={ArrowBackIcon} />
        <h1>What is your favorite language?</h1>
        <span>Published at: 20/12/2022</span>
      </div>
    </main>
  )
}

export default QuestionDetails
