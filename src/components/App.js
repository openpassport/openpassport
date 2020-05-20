import React from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import CountryChooser from './CountryChooser'
import Dashboard from './Dashboard'
import {
  BrowserRouter,
  Route,
  Switch,
  Link
} from 'react-router-dom'


const NoMatch = ({ location }) => console.log(location) || (
  <div className='error-page' >
    <h3>
      Error 404 <hr />
      <code>{location.pathname} doesn't exist</code>
    </h3>
    <Link to='/'> Go Home </Link>
  </div>
)

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <div className="container">
              <div className="home-page">
                <img alt="around the world in a plane" src={require('../assets/images/homepage-graphics.jpg')} height="200px" />
                <h1>Explore where your passport take you!</h1>
                {this.props.loading === true
                  ? <div>Loading</div>
                  : <CountryChooser />}
              </div>
            </div>
          </Route>
          <Route path='/c/:id' component={Dashboard} />
          <Route component={NoMatch} />
        </Switch>
      </BrowserRouter>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
  }
}

export default connect(mapStateToProps)(App);
