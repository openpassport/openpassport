import React from 'react'
import { connect } from 'react-redux'
import { handleDestinationBasicData } from '../actions/shared'
import { Link } from 'react-router-dom'

class CountryDetails extends React.Component {
    componentDidMount() {
        this.props.dispatch(handleDestinationBasicData(356, 462))
    }
    render() {
        const { loading, destinationDetails } = this.props
        if (!loading) {
            return (
                <div className="country-details">
                    <div className="country-details-drawer">
                        <Link to={`/${this.props.match.params.id}`} className='details-close'>
                            <img alt='close' src={require('../assets/images/close.svg')} width="16px" />
                        </Link>
                        {Object.values(destinationDetails).map((item) => (
                            <div key={item.destination.id}>
                                <div className="country-details-drawer-info">
                                    <img alt='flag' src={`https://openpassport.co/static/${item.destination.flag}`} width="52px" style={{ marginRight: "8px" }} />
                                    <h1>{item.destination.name}</h1>

                                </div>
                                <div className='country-details-drawer-subsection'>
                                    <h5>ABOUT</h5>
                                    <p>
                                        Thailand is a Southeast Asian country. It's known for tropical beaches, opulent royal palaces, ancient ruins and ornate temples displaying figures of Buddha.
                                    </p>
                                </div>
                                <div className="country-details-drawer-info">
                                    <div className="country-details-drawer-info-item">
                                        <div>
                                            <img alt='weather' src={require('../assets/images/weather.svg')} width='52px' />
                                        </div>
                                        <div>
                                            <p>Weather</p>
                                            <h5>5°C</h5>
                                        </div>
                                    </div>
                                    <div className="country-details-drawer-info-item">
                                        <div>
                                            <img alt='flight' src={require('../assets/images/flight.svg')} width='52px' />
                                        </div>
                                        <div>
                                            <p>Flight Price</p>
                                            <h5>$740+</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className='country-details-drawer-subsection'>
                                    <h5>VISA REQUIREMENTS</h5>
                                    <ul>
                                        <li>Visa application form</li>
                                        <li>Passport photo</li>
                                        <li>Passport</li>
                                        <li>Hotel bookings</li>
                                        <li>Flight bookings</li>
                                    </ul>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>Loading</div>
            )
        }
    }
}

function mapStateToProps({ sourceCountry, destinationDetails }) {
    return {
        loading: sourceCountry === null,
        destinationDetails
    }
}

export default connect(mapStateToProps)(CountryDetails)