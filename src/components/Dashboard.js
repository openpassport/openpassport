import React from 'react'
import { connect } from 'react-redux'
import {
    Route,
    Link
} from 'react-router-dom'
import { handleSourceCountryData } from '../actions/shared'
import DestinationDetails from './DestinationDetails'
import Globe from './Globe'

class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(handleSourceCountryData(this.props.match.params.id))
    }

    render() {
        const { loading, passportValidCountryList } = this.props
        if (!loading) {
            return (
                <div className='dashboard-container'>
                    <div className='dashboard-sidebar'>
                        <div className="dashboard-sidepanel-header">
                            <div className="dashboard-sidepanel-logo">
                                <img alt='Openpassport' src={require('../assets/images/op-logo.svg')} width='175px' />
                            </div>
                            <Link className="dashboard-sidepanel-country-select-button" to='/'>
                                <span className="form-label">Your home country</span>
                                <span className="form-title">India</span>
                            </Link>
                        </div>
                        <div className="dashboard-sidepanel-country-list">
                            {Object.values(passportValidCountryList).map((item, i) => (
                                <Link className="dashboard-sidepanel-country-list-item"
                                    key={i}
                                    to={`${this.props.match.url}/${item.destination.id}`}>
                                    <h3>
                                        {item.destination.name}
                                    </h3>
                                    <p>{item.destination.subregion} {item.destination.capital}  </p>
                                </Link>
                            ))
                            }
                        </div>
                    </div>
                    <div className="country-details">
                        <Route path={`${this.props.match.path}/:destinationId`} component={DestinationDetails} />
                        <Globe />
                    </div>
                </div >
            )
        }
        else {
            return (
                <div> Loading</div>
            )
        }
    }

}

function mapStateToProps({ passportValidCountryList }) {
    console.log("destination from source***********", passportValidCountryList)
    return {
        loading: passportValidCountryList === null,
        passportValidCountryList,
    }

}

export default connect(mapStateToProps)(Dashboard)