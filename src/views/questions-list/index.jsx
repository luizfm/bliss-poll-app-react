import React, {
  useCallback, useEffect, useMemo, useReducer, useRef, useState
} from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useDebouncedCallback } from 'use-debounce'
import Fade from 'react-reveal/Fade';
import { Waypoint } from 'react-waypoint';
import classnames from 'classnames'

import { questionsList, getQuestionsSelector } from '_modules/question/selectors'
import Input from '_components/input'
import SearchIcon from '_assets/icons/search-icon.svg'
import { getQuestions } from '_modules/question/actions'
import QuestionCard from '_components/question-card'
import { filterParse } from '_utils/filter'
import QueryResult from '_components/query-result'
import useToggle from '_hooks/use-toggle'
import Button from '_components/button'
import ShareScreenModal from '_components/share-screen-modal'

import { usePrevious } from '_hooks/use-previous'
import styles from './styles.css'
import { INITIAL_STATE, reducer, UPDATE_FILTER } from './reducer'

const QUESTIONS_PER_RENDER = 10

const QuestionsList = () => {
  const questionList = useSelector(questionsList)
  const { loading, questions, error } = useSelector(getQuestionsSelector)
  const wasLoading = usePrevious(loading)
  const inputRef = useRef(null)
  const location = useLocation()
  const dispatch = useDispatch()

  const [{ filter, offset, limit }, localDispatch] = useReducer(reducer, INITIAL_STATE)
  const [isShareScreenOpen, onToggleShareScreen] = useToggle()
  const [isShareButtonVisible, setShareButtonVisibility] = useState(false)

  const onSearch = useCallback((value) => {
    const payload = {
      filter: value,
      offset,
      limit: QUESTIONS_PER_RENDER,
    }

    dispatch(getQuestions({ params: payload }))
  }, [dispatch, offset])

  const debouncedSearchValue = useDebouncedCallback(onSearch, 500)

  const onSearchChange = useCallback((event) => {
    const { value } = event.target

    localDispatch({
      type: UPDATE_FILTER,
      payload: {
        filter: value,
        limit: QUESTIONS_PER_RENDER,
      }
    })

    debouncedSearchValue(value)
  }, [debouncedSearchValue])

  const onFetchMoreQuestions = useCallback(() => {
    const payload = {
      filter,
      offset,
      limit: limit + QUESTIONS_PER_RENDER,
    }

    localDispatch({
      type: UPDATE_FILTER,
      payload
    })

    dispatch(getQuestions({ params: payload }))
  }, [dispatch, filter, limit, offset])

  const sharedData = useMemo(() => ({
    ...(filter ? { filter } : {}),
    ...(offset ? { offset } : {}),
    ...(limit ? { limit } : {})
  }),
  [filter, limit, offset])

  useEffect(() => {
    if (!loading && wasLoading && filter) {
      setShareButtonVisibility(true)
    }

    if (!filter) {
      setShareButtonVisibility(false)
    }
  }, [filter, loading, wasLoading])

  useEffect(() => {
    if (location.search.includes('filter=')) {
      inputRef.current.focus()
    }
  }, [location.search])

  useEffect(() => {
    const params = filterParse(location.search)

    localDispatch({
      type: UPDATE_FILTER,
      payload: params
    })

    dispatch(getQuestions({ params }))
  }, [dispatch, location.search])

  return (
    <main className={styles['question-list-container']}>
      <h1 className={styles['question-title']}>Questions List</h1>
      <div className={styles['action-box']}>
        <Input
          className={styles.input}
          ref={inputRef}
          id="search-question"
          name="search-input"
          label="Search a question"
          startAdornment={SearchIcon}
          value={filter}
          onChange={onSearchChange}
          placeholder="Search a question here"
        />
        <div className={styles['button-wrapper']}>
          <Fade top cascade when={isShareButtonVisible}>
            <Button
              className={classnames(styles['share-button'], { [styles.hidden]: !isShareButtonVisible })}
              onClick={onToggleShareScreen}
            >
              Share results
            </Button>
          </Fade>
        </div>
      </div>
      <div className={styles['list-content']}>
        <QueryResult error={error} loading={loading} data={questions}>
          <ul className={styles['question-list']}>
            {questionList.map((question, index) => (
              index === questionList.length - 1 ? (
                <Waypoint key={question.id} onEnter={onFetchMoreQuestions}>
                  <div className={styles['waypoint-wrapper']}>
                    <QuestionCard questionItem={question} />
                  </div>
                </Waypoint>
              ) : (
                <QuestionCard key={question.id} questionItem={question} />
              )
            ))}
          </ul>
        </QueryResult>
      </div>
      {isShareScreenOpen && (
        <ShareScreenModal onClose={onToggleShareScreen} sharedData={sharedData} />
      )}
    </main>
  )
}

export default QuestionsList
