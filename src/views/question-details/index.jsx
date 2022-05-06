/* eslint-disable max-len */
import React, {
  useCallback, useEffect, useReducer, useState
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import ArrowBackIcon from '_assets/icons/arrow-back-icon.svg'
import IconButton from '_components/icon-button'
import {
  getQuestionByIdSelector, getQuestionsSelector, getCurrentQuestionId
} from '_modules/question/selectors'
import { getQuestion, updateQuestion } from '_modules/question/actions'
import QueryResult from '_components/query-result'
import { formatDate } from '_utils/date'
import PollCard from '_components/poll-card'
import { usePrevious } from '_hooks/use-previous'

import {
  reducer, INITIAL_STATE, UPDATE_STATE, UPDATE_CHOICE
} from './reducer'
import styles from './styles.css'

const QuestionDetails = () => {
  const { questionId } = useParams() // We should questionId here to get from state as well, but since the api is always returning id 1, I created a field on the reducer that return the last question id visited
  const dispatch = useDispatch()
  const { loading, questions, error } = useSelector(getQuestionsSelector)
  const wasLoading = usePrevious(loading)
  const currentQuestionId = useSelector(getCurrentQuestionId) // So this selector is going to make the magic for me instead of the questionId from param itself
  const currentQuestion = useSelector((state) => getQuestionByIdSelector(state, currentQuestionId))

  const [state, localDispatch] = useReducer(reducer, INITIAL_STATE)
  const [isUpdatingQuestion, setIsUpdatingQuestion] = useState(false)

  const onSelectOption = useCallback((event) => {
    const { id } = event.currentTarget

    localDispatch({
      type: UPDATE_CHOICE,
      payload: {
        choice: id
      }
    })

    setIsUpdatingQuestion(true)
  }, [])

  useEffect(() => {
    if (isUpdatingQuestion) {
      dispatch(updateQuestion(questionId, state))
      setIsUpdatingQuestion(false)
    }
  }, [dispatch, isUpdatingQuestion, questionId, state])

  useEffect(() => {
    dispatch(getQuestion(questionId))
  }, [dispatch, questionId])

  useEffect(() => {
    if (!loading && wasLoading) {
      localDispatch({
        type: UPDATE_STATE,
        payload: currentQuestion
      })
    }
  }, [currentQuestion, loading, wasLoading])

  return (
    <main className={styles['question-details-container']}>
      <QueryResult loading={loading} data={questions} error={error}>
        <img
          src={currentQuestion?.imageUrl}
          alt="A background for current question"
          className={styles['cover-image']}
        />
        <div className={styles['image-overlay']} />
        <article className={styles['question-content']}>
          <div className={styles['content-head']}>
            <IconButton icon={ArrowBackIcon} className={styles['back-button']} />
            <h1 className={styles.title}>{currentQuestion?.question}</h1>
            <span className={styles['published-date']}>
              Published at:
              {' '}
              {formatDate(currentQuestion?.publishedAt, 'MM/dd/yyyy')}
            </span>
          </div>
          <div className={styles['poll-container']}>
            {state?.choices.map((item) => (
              <PollCard
                key={item.choice}
                choice={item.choice}
                votes={item.votes}
                onSelectOption={onSelectOption}
              />
            ))}
          </div>
        </article>
      </QueryResult>
    </main>
  )
}

export default QuestionDetails
