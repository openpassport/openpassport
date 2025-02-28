import React from 'react'
import Dashboard from './Dashboard'
import ErrorPage from './ErrorPage'
import HomePage from './Home'
import AboutOP from './AboutOP'
import AboutPrivacy from './AboutPrivacy'
import AboutTerms from './AboutTerms'
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
          <Route exact path='/about' component={AboutOP} />
          <Route path='/privacy' component={AboutPrivacy} />
          <Route path='/terms' component={AboutTerms} />
          <Route path='/:homeSlug' component={Dashboard} />
          <Route component={ErrorPage} />
        </Switch>
      </BrowserRouter >
    )
  }
}


export default App
