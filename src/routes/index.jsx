import React from 'react'
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from 'react-router-dom'

import QuestionsList from '_views/questions-list'
import QuestionDetails from '_views/question-details'
import App from '../App'

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" element={<App />} />
      <Route path="/questions" element={<QuestionsList />} />
      <Route path="/questions/:questionId" element={<QuestionDetails />} />
    </Switch>
  </Router>
)

export default Routes
