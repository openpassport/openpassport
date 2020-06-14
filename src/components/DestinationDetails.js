import React from 'react'
import { connect } from 'react-redux'
import {
    handleDestinationBasicData,
    handleResetDestination
} from '../actions/shared'
import { Link } from 'react-router-dom'
import TabCountryHome from './TabCountryHome'
import TabBTV from './TabBTV'
import TabDestinations from './TabDestinations'
import styles from '../assets/styles/dashboard.module.css'


class CountryDetails extends React.Component {
    state = {
        showAbout: true,
        showBTV: false,
        showDestinations: false
    }

    showBTVTab = () => {
        this.setState({
            showAbout: false,
            showBTV: true,
            showDestinations: false
        })
    }

    showAboutTab = () => {
        this.setState({
            showAbout: true,
            showBTV: false,
            showDestinations: false
        })
    }

    showDestinationsTab = () => {
        this.setState({
            showAbout: false,
            showBTV: false,
            showDestinations: true
        })
    }

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
        const { showAbout, showBTV, showDestinations } = this.state
        if (!loading) {
            const item = destinationDetails[0]
            return (
                <div>
                    <div className={styles.destinationDetailsHeader}>
                        <div className={styles.titleRow}>
                            <div className={styles.destinationTitle}>
                                <img alt='flag' src={`https://api.openpassport.co/static/${item.destination.flag}`} height="24px" style={{ marginRight: "8px" }} />
                                <h1>{item.destination.name}</h1>
                            </div>
                            <div>
                                Last updated on 16june
                                <button>Report Error</button>
                            </div>

                            <Link to={`/${this.props.match.params.homeSlug}`} className='details-close' onClick={this.clickToReset}>
                                <img alt='close' src={require('../assets/images/close.svg')} width="16px" />
                            </Link>
                        </div>
                        <div className={styles.destinationHeaderTabGroup}>
                            <li style={{
                                color: showAbout === true ? '#00A013' : '#001B03'
                            }} onClick={this.showAboutTab}>About</li>
                            <li style={{
                                color: showBTV === true ? '#00A013' : '#001B03'
                            }} onClick={this.showBTVTab}>Best time to visit</li>
                            <li style={{
                                color: showDestinations === true ? '#00A013' : '#001B03'
                            }} onClick={this.showDestinationsTab}>Travel destinations</li>
                        </div>
                    </div>
                    {showAbout && <TabCountryHome details={item} />}
                    {showBTV && <TabBTV details={item} />}
                    {showDestinations && <TabDestinations details={item} />}

                </div>
            )
        }
        else {
            return (
                <div className="country-details-drawer">
                    <div className='loading-container'>
                        <img alt="loading indicator" src={require('../assets/images/load.svg')} width="60px" height="60px" />
                            Loading
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