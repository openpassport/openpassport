import React from 'react'
import HomeCountryChooser from './HomeCountryChooser'
import Dashboard from './Dashboard'
import HomePassportIndex from './HomePassportIndex'
import HomeVisaOpenness from './HomeVisaOpenness'
import HomeFooter from './HomeFooter'

import {
  BrowserRouter,
  Route,
  Switch,
  Link
} from 'react-router-dom'

import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group'


const NoMatch = ({ location }) => console.log(location) || (
  <div className='error-page' >
    <h3>
      Error 404 <hr />
      <code>{location.pathname} doesn't exist</code>
    </h3>
    <Link to='/'> Go Home </Link>
  </div>
)

const Home = () => {
  return (
    <div>
      <HomeCountryChooser />
      <HomePassportIndex />
      <HomeVisaOpenness />
      <HomeFooter />
    </div>
  )
}

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/undefined' component={NoMatch} />
          <Route path='/:homeSlug' component={Dashboard} />
          <Route component={NoMatch} />
        </Switch>
      </BrowserRouter >
    )
  }
}


export default App
