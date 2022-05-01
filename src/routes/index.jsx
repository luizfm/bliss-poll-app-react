import React from 'react'
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from 'react-router-dom'

import List from '_views/list'
import App from '../App'

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" element={<App />} />
      <Route path="/list" element={<List />} />
    </Switch>
  </Router>
)

export default Routes
