import React from 'react'
import { connect } from 'react-redux'
import {
    Route,
    Link
} from 'react-router-dom'
import {
    handleSourceCountryData,
    handleSourceCountry,
    handleResetSourceDes
} from '../actions/shared'
import DestinationDetails from './DestinationDetails'
import MapBox from './MapBox'

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.clickToDrawer = this.clickToDrawer.bind(this)
    }

    clickToDrawer = () => {
        this.props.dispatch(handleResetSourceDes())
    }

    componentDidMount() {
        this.props.dispatch(handleSourceCountryData(this.props.match.params.homeSlug))
        this.props.dispatch(handleSourceCountry(this.props.match.params.homeSlug))
    }

    render() {
        const { loading, sourceCountry, passportValidCountryList } = this.props
        if (!loading) {
            return (
                <div className='dashboard-container'>
                    <div className='dashboard-sidebar'>
                        <div className="dashboard-sidepanel-header">
                            <div className="dashboard-sidepanel-logo">
                                <img alt='Openpassport' src={require('../assets/images/op-logo.svg')} width='175px' />
                            </div>
                            {sourceCountry &&
                                <Link
                                    className="dashboard-sidepanel-country-select-button"
                                    onClick={() => this.clickToDrawer()}
                                    to='/'>
                                    <span className="form-label">Your home country</span>
                                    <span className="form-title">{sourceCountry.name}</span>
                                </Link>
                            }
                        </div>
                        <div className="dashboard-sidepanel-country-list">
                            {Object.values(passportValidCountryList).map((item, i) => (
                                <Link className="dashboard-sidepanel-country-list-item"
                                    key={i}
                                    to={`${this.props.match.url}/${item.destination.slug}`} >
                                    <h3>
                                        {item.destination.name}
                                    </h3>
                                    <p>{item.destination.capital}  </p>
                                </Link>
                            ))
                            }
                        </div>
                    </div>
                    <div className="country-details">
                        <Route path={`${this.props.match.path}/:destinationSlug`} component={DestinationDetails} />
                        <MapBox />
                    </div>
                </div >
            )
        }
        else {
            return (
                <div className='dashboard-loading'>
                    <div>
                        <img alt="loading indicator" src={require('../assets/images/load.svg')} width="60px" height="60px" />
                    Loading
                    </div>
                </div>
            )
        }
    }

}

function mapStateToProps({ sourceCountry, passportValidCountryList }) {
    return {
        loading: (sourceCountry === null) || (Object.keys(sourceCountry).length === 0),
        passportValidCountryList,
        sourceCountry
    }

}

export default connect(mapStateToProps)(Dashboard)