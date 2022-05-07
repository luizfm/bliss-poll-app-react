/* eslint-disable max-len */
import React, {
  useCallback, useEffect, useMemo, useReducer, useState
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Fade from 'react-reveal/Fade';
import classnames from 'classnames'

import ArrowBackIcon from '_assets/icons/arrow-back-icon.svg'
import ShareScreenModal from '_components/share-screen-modal'
import IconButton from '_components/icon-button'
import {
  getQuestionByIdSelector, getQuestionsSelector, getCurrentQuestionId
} from '_modules/question/selectors'
import { getQuestion, updateQuestion } from '_modules/question/actions'
import QueryResult from '_components/query-result'
import { formatDate } from '_utils/date'
import PollCard from '_components/poll-card'
import { usePrevious } from '_hooks/use-previous'
import { LOTTIE_CONSTANTS, formatKey } from '_utils/lotties'
import Button from '_components/button';
import useToggle from '_hooks/use-toggle';
import { notEmptyPayloadFields } from '_utils/constants';

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
  const [isShareScreenOpen, onToggleShareScreen] = useToggle()
  const [isShareButtonVisible, setShareButtonVisibility] = useState(false)

  const sharedData = useMemo(() => notEmptyPayloadFields(state), [state])

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

      setShareButtonVisibility(true)
    }
  }, [currentQuestion, loading, wasLoading])

  return (
    <main className={styles['question-details-container']}>
      <QueryResult loading={loading} data={questions} error={error} alignLoaderCenter>
        <img
          src={currentQuestion?.imageUrl}
          alt="A background for current question"
          className={styles['cover-image']}
        />
        <div className={styles['image-overlay']} />
        <article className={styles['question-content']}>
          <div className={styles['content-head']}>
            <IconButton icon={ArrowBackIcon} className={styles['back-button']} to="/questions" />
            <h1 className={styles.title}>{currentQuestion?.question}</h1>
            <span className={styles['published-date']}>
              Published at:
              {' '}
              {formatDate(currentQuestion?.publishedAt, 'MM/dd/yyyy')}
            </span>
          </div>
          <div className={styles['share-button-container']}>
            <Fade top cascade when={isShareButtonVisible}>
              <Button
                className={classnames(styles['share-button'], { [styles.hidden]: !isShareButtonVisible })}
                onClick={onToggleShareScreen}
              >
                Share results
              </Button>
            </Fade>
          </div>
          <div className={styles['poll-container']}>
            {state?.choices.map((item) => (
              <PollCard
                key={item.choice}
                choice={item.choice}
                votes={item.votes}
                onSelectOption={onSelectOption}
                animation={LOTTIE_CONSTANTS[formatKey(item.choice)]}
              />
            ))}
          </div>
        </article>
      </QueryResult>
      {isShareScreenOpen && (
        <ShareScreenModal onClose={onToggleShareScreen} />
      )}
    </main>
  )
}

export default QuestionDetails
