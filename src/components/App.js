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
            <div className="home-section">
              <div className="container">
                {/* <img alt="around the world in a plane" src={require('../assets/images/homepage-graphics.jpg')} height="180px" /> */}
                <div className="dashboard-sidepanel-logo">
                  <img alt='OpenPassport' src={require('../assets/images/op-logo-white.svg')} width='300px' />
                </div>
                <h1>Explore where your passport can take you!</h1>
                {this.props.loading === true
                  ? <div>Loading</div>
                  : <CountryChooser />}
              </div>
              <video autoPlay muted loop className="hero-video" style={{ maxWidth: '100vw' }}>
                <source src={require('../assets/images/hero-bg.mp4')} type="video/mp4" />
                  Your browser does not support HTML5 video.
              </video>
            </div>
            <div className="about-section">
            </div>
          </Route>
          <Route path='/undefined' component={NoMatch} />
          <Route path='/:homeSlug' component={Dashboard} />
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
