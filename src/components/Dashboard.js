import React from 'react'
import { connect } from 'react-redux'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl'
import {
    Route,
    Link
} from 'react-router-dom'
import {
    handleSourceCountryData,
    handleSourceCountry
} from '../actions/shared'
import DestinationDetails from './DestinationDetails'

const Map = ReactMapboxGl({
    accessToken: 'pk.eyJ1IjoiYXJ1bmRzZ24iLCJhIjoiY2thamE3cnU0MDhwbTJybWlmdHloZmxvdiJ9.K_-a3_f8K5f1780lG7YLWA',
    logoPosition: "top-right",
    attributionControl: false
})

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sourceCountry: {}
        }
    }
    componentDidMount() {
        this.props.dispatch(handleSourceCountryData(this.props.match.params.id))
        this.props.dispatch(handleSourceCountry(this.props.match.params.id))
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
                                <Link className="dashboard-sidepanel-country-select-button" to='/'>
                                    <span className="form-label">Your home country</span>
                                    <span className="form-title">{sourceCountry.name}</span>
                                </Link>
                            }
                        </div>
                        <div className="dashboard-sidepanel-country-list">
                            {Object.values(passportValidCountryList).map((item, i) => (
                                <Link className="dashboard-sidepanel-country-list-item"
                                    key={i}
                                    to={`${this.props.match.url}/${item.destination.id}`}>
                                    <h3>
                                        {item.destination.name}
                                    </h3>
                                    <p>{item.destination.subregion} ▫ {item.destination.capital}  </p>
                                </Link>
                            ))
                            }
                        </div>
                    </div>
                    <div className="country-details">
                        <Route path={`${this.props.match.path}/:destinationId`} component={DestinationDetails} />
                        <Map
                            style="mapbox://styles/mapbox/streets-v11"
                            containerStyle={{
                                height: '100vh',
                            }}
                            center={[this.props.sourceCountry.longitude, this.props.sourceCountry.latitude]}
                            zoom={[4]}
                            movingMethod="flyTo"
                        >
                        </Map>
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

function mapStateToProps({ sourceCountry, passportValidCountryList }) {
    return {
        loading: sourceCountry === null,
        passportValidCountryList,
        sourceCountry
    }

}

export default connect(mapStateToProps)(Dashboard)