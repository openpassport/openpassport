import React from 'react'
import { connect } from 'react-redux'
import {
    handleDestinationBasicData,
    handleResetDestination
} from '../actions/shared'
import { Link } from 'react-router-dom'

class CountryDetails extends React.Component {
    clickToReset = () => {
        this.props.dispatch(handleResetDestination())
    }
    componentDidMount() {
        this.props.dispatch(handleDestinationBasicData(this.props.match.params.homeSlug, this.props.match.params.destinationSlug))
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.destinationSlug !== this.props.match.params.destinationSlug) {
            this.props.dispatch(handleDestinationBasicData(this.props.match.params.homeSlug, this.props.match.params.destinationSlug))
        }
    }

    render() {
        const { loading, destinationDetails } = this.props
        if (!loading) {
            return (
                <div className="country-details-drawer">
                    <Link to={`/${this.props.match.params.homeSlug}`} className='details-close' onClick={this.clickToReset}>
                        <img alt='close' src={require('../assets/images/close.svg')} width="16px" />
                    </Link>
                    {Object.values(destinationDetails).map((item) => (
                        <div key={item.destination.id}>
                            <div className="country-details-drawer-info">
                                <img alt='flag' src={`https://openpassport.co/static/${item.destination.flag}`} height="24px" style={{ marginRight: "8px" }} />
                                <h1>{item.destination.name}</h1>
                            </div>
                            <div>
                                <a target="_blank" rel="noopener noreferrer" href={item.destination["link"].visa}>Visa</a>
                                <a target="_blank" rel="noopener noreferrer" href={item.destination["link"].tourism}>Tourism</a>
                            </div>
                            {item.destination.description &&
                                <div className='country-details-drawer-subsection'>
                                    <h5>ABOUT</h5>
                                    <p>
                                        {item.destination.description}
                                    </p>
                                </div>
                            }
                            {/* <div className="country-details-drawer-info">
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
                                </div> */}
                            <div className='country-details-drawer-subsection'>
                                <h5>VISA REQUIREMENTS</h5>
                                {/* <ul>
                                        {item.requirement.map((listitem, i) => (
                                            <li key={i}>{listitem}</li>
                                        ))}
                                        <li>Visa application form</li>
                                    </ul> */}
                            </div>

                        </div>
                    ))}
                </div>
            )
        }
        else {
            return (
                <div className="country-details">
                    <div className="country-details-drawer">
                        <div className='loading-container'>

                            <img alt="loading indicator" src={require('../assets/images/load.svg')} width="60px" height="60px" />
                        Loading

                        </div>

                    </div>
                </div>
            )
        }
    }
}

function mapStateToProps({ destinationDetails }) {
    return {
        loading: (destinationDetails === null) || (Object.keys(destinationDetails).length === 0),
        destinationDetails
    }
}

export default connect(mapStateToProps)(CountryDetails)