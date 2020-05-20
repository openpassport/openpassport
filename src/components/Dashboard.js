import React from 'react'
import { connect } from 'react-redux'
import {
    Route,
    Link
} from 'react-router-dom'
import { handleSourceCountryData } from '../actions/shared'
import DestinationDetails from './DestinationDetails'

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
                            <div className="dashboard-sidepanel-logo">OpenPassport</div>
                            <Link className="dashboard-sidepanel-country-select-button" to='/'>
                                <span className="form-label">Your home country</span>
                                <span className="form-title">India</span>
                            </Link>
                        </div>
                        <div className="dashboard-sidepanel-country-list">
                            {Object.keys(passportValidCountryList).map((item) => (
                                <Link className="dashboard-sidepanel-country-list-item"
                                    key={passportValidCountryList[item].id}
                                    to={`${this.props.match.url}/${passportValidCountryList[item].id}`}>
                                    <h3>
                                        Country {passportValidCountryList[item].id}
                                    </h3>
                                    <p>Continent</p>
                                </Link>
                            ))
                            }
                        </div>
                    </div>
                    <div className="country-details">
                        <Route path={`${this.props.match.path}/:destinationId`} component={DestinationDetails} />
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
    return {
        loading: passportValidCountryList === null,
        passportValidCountryList,
    }

}

export default connect(mapStateToProps)(Dashboard)