import React from 'react'
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from 'react-router-dom'

import QuestionsList from '_views/questions-list'
import QuestionDetails from '_views/question-details'
import ServerHealth from '_views/server-health'
import Offline from '_views/offline'
import App from '../App'

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" element={<App />}>
        <Route path="/server-health" element={<ServerHealth />} />
        <Route path="/questions" element={<QuestionsList />} />
        <Route path="/questions/:questionId" element={<QuestionDetails />} />
        <Route path="/offline" element={<Offline />} />
      </Route>

    </Switch>
  </Router>
)

export default Routes
