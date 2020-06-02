import React from 'react'

class HomePassportIndex extends React.Component {
    render() {
        return (
            <div className="home-passport-section">
                <div className="container">
                    <div>
                        <h2 className="home-section-title-black">The Openpassport Index</h2>
                        <p className="home-section-titledescription-black">The Open Passport Index is a measure that tracks the ability of the holder of the passport to travel visa-free. </p>
                    </div>
                    <ul className="home-passport-section-countrylist">
                        <li className="home-passport-section-countrylist-item">
                            <div>
                                <span><img alt="flag" src={require('../assets/dummy-assets/flag-1.svg')} /></span>
                                <span className="home-passport-section-country-name">United Arab Emirates</span>
                            </div>
                            <div className="home-passport-section-countrylist-progresscount green">
                                +3
                    </div>
                        </li>

                        <li className="home-passport-section-countrylist-item">
                            <div>
                                <span><img alt="flag" src={require('../assets/dummy-assets/flag-2.svg')} /></span>
                                <span className="home-passport-section-country-name">Finland</span>
                            </div>
                            <div className="home-passport-section-countrylist-progresscount green">
                                +3
                    </div>
                        </li>

                        <li className="home-passport-section-countrylist-item">
                            <div>
                                <span><img alt="flag" src={require('../assets/dummy-assets/flag-3.svg')} /></span>
                                <span className="home-passport-section-country-name">Luxembourg</span>
                            </div>
                            <div className="home-passport-section-countrylist-progresscount red">
                                -2
                    </div>
                        </li>

                        <li className="home-passport-section-countrylist-item">
                            <div>
                                <span><img alt="flag" src={require('../assets/dummy-assets/flag-4.svg')} /></span>
                                <span className="home-passport-section-country-name">Germany</span>
                            </div>
                            <div className="home-passport-section-countrylist-progresscount green">
                                +3
                    </div>
                        </li>

                        <li className="home-passport-section-countrylist-item">
                            <div>
                                <span><img alt="flag" src={require('../assets/dummy-assets/flag-6.svg')} /></span>
                                <span className="home-passport-section-country-name">Denmark</span>
                            </div>
                            <div className="home-passport-section-countrylist-progresscount green">
                                +1
                    </div>
                        </li>

                        <li className="home-passport-section-countrylist-item">
                            <div>
                                <span><img alt="flag" src={require('../assets/dummy-assets/flag-7.svg')} /></span>
                                <span className="home-passport-section-country-name">Netherlands</span>
                            </div>
                            <div className="home-passport-section-countrylist-progresscount red">
                                -2
                    </div>
                        </li>

                        <li className="home-passport-section-countrylist-item">
                            <div>
                                <span><img alt="flag" src={require('../assets/dummy-assets/flag-3.svg')} /></span>
                                <span className="home-passport-section-country-name">Austria</span>
                            </div>
                            <div className="home-passport-section-countrylist-progresscount green">
                                +3
                    </div>
                        </li>

                        <li className="home-passport-section-countrylist-item">
                            <div>
                                <span><img alt="flag" src={require('../assets/dummy-assets/flag-5.svg')} /></span>
                                <span className="home-passport-section-country-name">Spain</span>
                            </div>
                            <div className="home-passport-section-countrylist-progresscount green">
                                +3
                    </div>
                        </li>
                    </ul>
                </div>
            </div>

        )
    }
}

export default HomePassportIndex