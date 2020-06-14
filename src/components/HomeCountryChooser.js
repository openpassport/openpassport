import React from 'react'
import AutoComplete from "./AutoComplete"
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'

class HomeCountryChooser extends React.Component {

    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        return (
            <div className="home-section">
                <div className="container">
                    <div className="home-logo">
                        <img alt='OpenPassport' src={require('../assets/images/op-logo-white.svg')} />
                    </div>
                    <h1>Explore where your passport can take you!</h1>
                    <AutoComplete
                    />
                </div>
                <div className="hero-video">
                    <video autoPlay muted loop poster={require('../assets/images/hero-poster.jpg')} >
                        <source src={require('../assets/images/hero-bg.mp4')} type="video/mp4" />
                    Your browser does not support HTML5 video.
                        </video>
                </div>
            </div>
        )
    }
}



export default connect()(HomeCountryChooser);
