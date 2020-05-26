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
              <video autoPlay muted loop className="hero-video">
                <source src={require('../assets/images/hero-bg.mp4')} type="video/mp4" />
                  Your browser does not support HTML5 video.
              </video>
            </div>
            <div className="home-passport-section">
              <div className="container">
                <div>
                  <h2 className="home-section-title-black">Passport Power Rank</h2>
                  <p className="home-section-titledescription-black">The Passport Power Rank is a measure that tracks the ability of the holder of the passport to travel visa-free. </p>
                </div>
                <ul className="home-passport-section-countrylist">
                  <li className="home-passport-section-countrylist-item">
                    <div>
                      <span><img src={require('../assets/dummy-assets/flag-1.svg')} width="48" /></span>
                      <span className="home-passport-section-country-name">United Arab Emirates</span>
                    </div>
                    <div className="home-passport-section-countrylist-progresscount green">
                      +3
                    </div>
                  </li>

                  <li className="home-passport-section-countrylist-item">
                    <div>
                      <span><img src={require('../assets/dummy-assets/flag-2.svg')} width="48" /></span>
                      <span className="home-passport-section-country-name">Finland</span>
                    </div>
                    <div className="home-passport-section-countrylist-progresscount green">
                      +3
                    </div>
                  </li>

                  <li className="home-passport-section-countrylist-item">
                    <div>
                      <span><img src={require('../assets/dummy-assets/flag-3.svg')} width="48" /></span>
                      <span className="home-passport-section-country-name">Luxembourg</span>
                    </div>
                    <div className="home-passport-section-countrylist-progresscount red">
                      -2
                    </div>
                  </li>

                  <li className="home-passport-section-countrylist-item">
                    <div>
                      <span><img src={require('../assets/dummy-assets/flag-4.svg')} width="48" /></span>
                      <span className="home-passport-section-country-name">Germany</span>
                    </div>
                    <div className="home-passport-section-countrylist-progresscount green">
                      +3
                    </div>
                  </li>

                  <li className="home-passport-section-countrylist-item">
                    <div>
                      <span><img src={require('../assets/dummy-assets/flag-6.svg')} width="48" /></span>
                      <span className="home-passport-section-country-name">Denmark</span>
                    </div>
                    <div className="home-passport-section-countrylist-progresscount green">
                      +1
                    </div>
                  </li>

                  <li className="home-passport-section-countrylist-item">
                    <div>
                      <span><img src={require('../assets/dummy-assets/flag-7.svg')} width="48" /></span>
                      <span className="home-passport-section-country-name">Netherlands</span>
                    </div>
                    <div className="home-passport-section-countrylist-progresscount red">
                      -2
                    </div>
                  </li>

                  <li className="home-passport-section-countrylist-item">
                    <div>
                      <span><img src={require('../assets/dummy-assets/flag-3.svg')} width="48" /></span>
                      <span className="home-passport-section-country-name">Austria</span>
                    </div>
                    <div className="home-passport-section-countrylist-progresscount green">
                      +3
                    </div>
                  </li>

                  <li className="home-passport-section-countrylist-item">
                    <div>
                      <span><img src={require('../assets/dummy-assets/flag-5.svg')} width="48" /></span>
                      <span className="home-passport-section-country-name">Spain</span>
                    </div>
                    <div className="home-passport-section-countrylist-progresscount green">
                      +3
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className='visa-openness-section'>
              <div className='container'>
                <div>
                  <h3>Visa Openness when travelling to a country:</h3>
                  <div className='visa-openness-country'>
                    <div className='visa-openness-countryselect-button'>United States</div>
                  </div>
                </div>
                <div><img src={require('../assets/dummy-assets/worldmap.png')} height='370' /></div>
              </div>
            </div>
          </Route>
          <Route path='/undefined' component={NoMatch} />
          <Route path='/:homeSlug' component={Dashboard} />
          <Route component={NoMatch} />
        </Switch>
      </BrowserRouter >
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
  }
}

export default connect(mapStateToProps)(App);
