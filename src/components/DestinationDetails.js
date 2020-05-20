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
        console.log("destination etais", destinationDetails)

        if (!loading) {
            console.log("test", this.props.match)
            return (
                <div className="country-details">
                    <div className="country-details-drawer">
                        <Link to={`/c/${this.props.match.params.id}`} className='details-close'>
                            <img src={require('../assets/images/close.svg')} width="16px" />
                        </Link>
                        <h1>Country {this.props.match.params.destinationId}</h1>
                        {Object.keys(destinationDetails).map((item) => (
                            <div key={destinationDetails[item].id}>
                                <li>
                                    {destinationDetails[item].id}
                                </li>
                                <div className="country-details-drawer-info">
                                    <div className="country-details-drawer-info-item">
                                        <p>Max stay</p>
                                        <h5>15 Days</h5>
                                    </div>
                                    <div className="country-details-drawer-info-item">
                                        <p>Weather</p>
                                        <h5>5°C</h5>
                                    </div>
                                    <div className="country-details-drawer-info-item">
                                        <p>Flight Price</p>
                                        <h5>$740+</h5>
                                    </div>
                                </div>
                                {destinationDetails[item].details}
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

function mapStateToProps({ destinationDetails }) {
    return {
        loading: destinationDetails === null,
        destinationDetails
    }
}

export default connect(mapStateToProps)(CountryDetails)