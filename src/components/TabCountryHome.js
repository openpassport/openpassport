import React from 'react'
import { connect } from 'react-redux'
import styles from '../assets/styles/destinationtabs.module.css'

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
                {/* <div className="country-details-drawer-info">
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
                </div> */}
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
                <div className='country-details-drawer-subsection'>
                    <h5>QUICK FACTS</h5>
                    <ul className={styles.quickFactsContainer}>
                        <li>
                            <div>
                                <img alt='capital' src={require('../assets/images/destination-details/capital.svg')} height='24' />
                                <label> Capital</label>
                            </div>
                            <div>
                                <h6>Berlin</h6>
                            </div>
                        </li>
                        <li>
                            <div>
                                <img alt='capital' src={require('../assets/images/destination-details/timezone.svg')} height='24' />
                                <label> Time Zone</label>
                            </div>
                            <div>
                                <h6>GMT -1</h6>
                            </div>
                        </li>
                        <li>
                            <div>
                                <img alt='capital' src={require('../assets/images/destination-details/currency.svg')} height='24' />
                                <label> Currency</label>
                            </div>
                            <div>
                                <h6>Euro (85 INR)</h6>
                            </div>
                        </li>
                        <li>
                            <div>
                                <img alt='capital' src={require('../assets/images/destination-details/language.svg')} height='24' />
                                <label> Official Language</label>
                            </div>
                            <div>
                                <h6>German</h6>
                            </div>
                        </li>

                        <li>
                            <div>
                                <img alt='capital' src={require('../assets/images/destination-details/dialingcode.svg')} height='24' />
                                <label> Dialing Code</label>
                            </div>
                            <div>
                                <h6>+49</h6>
                            </div>
                        </li>

                        <li>
                            <div>
                                <img alt='capital' src={require('../assets/images/destination-details/emergencynumber.svg')} height='24' />
                                <label> Emergency Number</label>
                            </div>
                            <div>
                                <h6>112</h6>
                            </div>
                        </li>

                        <li>
                            <div>
                                <img alt='capital' src={require('../assets/images/destination-details/driving.svg')} height='24' />
                                <label> Driving</label>
                            </div>
                            <div>
                                <h6>On the right side</h6>
                            </div>
                        </li>

                    </ul>
                </div>

            </div>
        )
    }
}


export default connect()(TabCountryHome)