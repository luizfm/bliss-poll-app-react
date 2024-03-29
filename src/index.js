import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import Routes from '_routes/'
import configureStore from '_store/configureStore'

const root = () => {
  const store = configureStore({})

  render(
    <Provider store={store}>
      <Routes />
    </Provider>,
    document.getElementById('root')
  )
}

root()
