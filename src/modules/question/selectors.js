import { createSelector } from 'reselect'

export const getQuestionsList = (state) => state.question.questions

export const getQuestionsSelector = (state) => state.question

export const questionsList = createSelector(getQuestionsList, (list) => Object.values(list))
