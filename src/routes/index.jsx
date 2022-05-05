import React from 'react'
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from 'react-router-dom'

import QuestionsList from '_views/questions-list'
import App from '../App'

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" element={<App />} />
      <Route path="/questions" element={<QuestionsList />} />
    </Switch>
  </Router>
)

export default Routes
