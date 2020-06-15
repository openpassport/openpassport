import React from 'react'
import { connect } from 'react-redux'

class TabCountryHome extends React.Component {

    render() {
        const item = this.props.details
        return (
            <div key={item.destination.id} className="country-details-drawer" >
                {item.destination.description &&
                    <div className='country-details-drawer-subsection'>
                        <h5>ABOUT</h5>
                        <p>
                            {item.destination.description}
                        </p>
                    </div>
                }
                <div className="country-details-drawer-info">
                    <div className="country-details-drawer-info-item">
                        <div>
                            <img alt='weather' src={require('../assets/images/weather.svg')} width='52px' />
                        </div>
                        <div>
                            <p>Weather</p>
                            <h5>{item.destination.weather.temperature}°C</h5>
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
                        {item.requirement.map((listitem, i) => (
                            <li key={i}>{i + 1}. {listitem}</li>
                        ))}
                    </ul>
                </div>
                <div className='country-details-drawer-subsection'>
                    <h5>Official Links</h5>
                    <li>
                        <a target="_blank" rel="noopener noreferrer" href={item.destination["link"].visa}>Visa</a>
                    </li>
                    <li>
                        <a target="_blank" rel="noopener noreferrer" href={item.destination["link"].tourism}>Tourism</a>
                    </li>
                </div>

            </div>
        )
    }
}


export default connect()(TabCountryHome)