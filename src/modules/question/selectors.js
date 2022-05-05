import { createSelector } from 'reselect'

export const getQuestionsList = (state) => state.question.questions

export const getQuestionsSelector = (state) => state.question

export const getQuestionByIdSelector = (state, questionId) => state.question.questions[questionId]

export const questionsList = createSelector(getQuestionsList, (list) => Object.values(list))
