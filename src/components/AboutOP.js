import React from 'react'
import HomeFooter from './HomeFooter'
import {
    Link
} from 'react-router-dom'

class AboutOP extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    render() {
        return (
            <div className='about-op'>
                <div className='container'>
                    <div className='about-navbar'>
                        <Link to='/'>
                            <img alt='logo+mark' src={require('../assets/images/logo+mark.svg')} />
                        </Link>
                    </div>
                    <div className='about-op-content'>
                        <div>
                            <h1>Helping you travel the world</h1>
                            <p>OpenPassport aims to make it effortless to find your next travel destination and sustainable experiences leveraging on data. We dream for a world without boundaries, where the opportunities are endless and we believe that to achieve this we should start by enabling free movement of people across the world.</p>
                        </div>
                        <div>
                            <h3>Team</h3>
                            <div className='about-op-team-container'>
                                <div>
                                    <img alt='arun' src={require('../assets/images/arunraj.png')} />
                                    <h4>Arunraj Damodaran</h4>
                                    <p>Design & UI Engineering</p>
                                </div>
                                <div>
                                    <img alt='nithin' src={require('../assets/images/nithink.png')} />
                                    <h4>Nithin K Vijayan</h4>
                                    <p>Data & Engineering</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <HomeFooter />
            </div>
        )
    }
}

export default AboutOP