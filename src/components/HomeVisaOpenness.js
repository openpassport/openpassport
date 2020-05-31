import React from 'react'

class HomeVisaOpenness extends React.Component {
    render() {
        return (
            <div className='visa-openness-section'>
                <div className='container'>
                    <div>
                        <h3>Visa openness when travelling to a country:</h3>
                        <div className='visa-openness-country'>
                            <div className='visa-openness-countryselect-button'>United States</div>
                            <div className='visa-openness-score-group'>
                                <div>
                                    <span className='visa-openness-score-large'>2.1</span>
                                    <span className='visa-openness-score-outof'>/10</span>
                                </div>
                                <h5>
                                    Visa openness score
                      </h5>
                            </div>
                            <div className='visa-openness-country-stats'>
                                <ul>
                                    <li>No Visa (157)</li>
                                    <li>Visa on arrival (321)</li>
                                    <li>Visa required (124)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div><img className='openness-dummy-image' alt="flag" src={require('../assets/dummy-assets/worldmap.png')} /></div>
                </div>
            </div>
        )
    }
}

export default HomeVisaOpenness