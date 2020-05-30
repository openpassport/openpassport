import React from 'react'
import Dashboard from './Dashboard'
import ErrorPage from './ErrorPage'
import HomePage from './Home'

import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/undefined' component={ErrorPage} />
          <Route path='/:homeSlug' component={Dashboard} />
          <Route component={ErrorPage} />
        </Switch>
      </BrowserRouter >
    )
  }
}


export default App
