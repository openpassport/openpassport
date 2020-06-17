import React from 'react'
import { connect } from 'react-redux'
import {
    Route,
    Link
} from 'react-router-dom'
import {
    handleSourceCountryData,
    handleSourceCountry,
    handleResetSourceDes,
    handleInitialData
} from '../actions/shared'
import DestinationDetails from './DestinationDetails'
import MapBox from './MapBox'
import styles from '../assets/styles/dashboard.module.css'

const free = "visa-not-required"
const required = "visa-required"
const arrival = "visa-arrival"

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showVisaFree: true,
            showArrival: false,
            showRequired: false,
            list: []
        }
        this.props.dispatch(handleSourceCountryData(this.props.match.params.homeSlug))
        this.props.dispatch(handleSourceCountry(this.props.match.params.homeSlug))
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.props.dispatch(handleInitialData())
    }

    showArrival = () => {
        this.setState(() => ({
            showArrival: true,
            showVisaFree: false,
            showRequired: false
        }))
    }

    showVisaFree = () => {
        this.setState(() => ({
            showArrival: false,
            showVisaFree: true,
            showRequired: false
        }))
    }

    showRequired = () => {
        this.setState(() => ({
            showArrival: false,
            showVisaFree: false,
            showRequired: true
        }))
    }

    clickToReset = () => {
        this.props.dispatch(handleResetSourceDes())
    }

    render() {
        console.log("from url", this.props.match.params.homeSlug)
        const { showArrival, showRequired, showVisaFree } = this.state
        const { loading, sourceCountry, requiredList, freeList, arrivalList, stateSlugs } = this.props
        const list = showVisaFree === true
            ? freeList
            : showRequired === true
                ? requiredList
                : arrivalList
        const valid = stateSlugs.filter((item) => item === this.props.match.params.homeSlug ? true : false)
        console.log("$$$$%%%", valid)

        if (!loading) {
            if (valid.length > 0) {
                return (
                    <div className={styles.dashboardContainer}>
                        <div className={styles.dashboardSidebar}>
                            <div>
                                <div className={styles.logoContainer}>
                                    <div className={styles.dashboardSidepanelLogo}>
                                        <img alt='Openpassport' src={require('../assets/images/op-logo.svg')} width='175px' />
                                    </div>
                                    {sourceCountry &&
                                        <Link
                                            className={styles.dashboardSidepanelCountrySelectButton}
                                            onClick={() => this.clickToReset()}
                                            to='/'>
                                            <span className={styles.formLabel}>Your home country</span>
                                            <span className={styles.formTitle}>{sourceCountry.name}</span>
                                        </Link>
                                    }
                                </div>
                                <div className={styles.dashboardSidepanelTabGroup}>
                                    <li
                                        style={{
                                            background: showVisaFree === true ? '#00A013' : 'rgb(0, 160, 19, 0.1)',
                                            color: showVisaFree === true ? 'white' : '#001B03'
                                        }}
                                        onClick={this.showVisaFree}>
                                        Visa free
                                    </li>
                                    <li
                                        style={{
                                            background: showArrival === true ? '#DEAF09' : 'rgb(0, 160, 19, 0.1)',
                                            color: showArrival === true ? 'white' : '#001B03'
                                        }}
                                        onClick={this.showArrival}>
                                        Visa on arrival
                                </li>
                                    <li
                                        style={{
                                            background: showRequired === true ? '#D93E69' : 'rgb(0, 160, 19, 0.1)',
                                            color: showRequired === true ? 'white' : '#001B03'
                                        }}
                                        onClick={this.showRequired}>
                                        Visa required
                                </li>
                                </div>
                            </div>
                            <div className={styles.dashboardSidepanelCountryList}>
                                {list.map((item, i) => (
                                    <Link className={styles.dashboardSidepanelCountryListItem}
                                        key={i}
                                        to={`${this.props.match.url}/${item.slug}`} >
                                        <h3>
                                            {item.name}
                                        </h3>
                                        <p>{item.capital}  </p>
                                    </Link>
                                ))
                                }
                            </div>
                        </div>

                        <div className={styles.countryDetails}>
                            <Route path={`${this.props.match.path}/:destinationSlug`} component={DestinationDetails} />
                            <MapBox countryList={list} links={this.props.match.url} />
                        </div>

                    </div >
                )
            }
            else {
                return (
                    <p>Page does not exist. Invalid country</p>
                )
            }
        }
        else {
            return (
                <div className='dashboard-loading'>
                    <div className="loading-text">
                        <img alt="loading indicator" src={require('../assets/images/load.svg')} width="60px" height="60px" />
                        <div>Loading</div>
                    </div>
                </div>
            )
        }
    }

}

function mapStateToProps({ sourceCountry, passportValidCountryList, countries }) {
    const tmp = Object.values(passportValidCountryList)
    const arrivalList = []
    const freeList = []
    const requiredList = []
    const stateSlugs = []
    const tmp2 = Object.values(countries)
    tmp2.map((item) => {
        stateSlugs.push(item.slug)
    })

    tmp.map((item) => {
        switch (item.visa) {
            case arrival:
                item.destination['visatype'] = 'visa-arrival'
                arrivalList.push(item.destination)
                return arrivalList
            case free:
                item.destination['visatype'] = 'visa-not-required'
                freeList.push(item.destination)
                return freeList
            case required:
                item.destination['visatype'] = 'visa-required'
                requiredList.push(item.destination)
                return requiredList
            default:
                return null
        }
    })

    return {
        loading: (sourceCountry === null) || (Object.keys(sourceCountry).length === 0),
        arrivalList,
        freeList,
        requiredList,
        sourceCountry,
        passportValidCountryList,
        stateSlugs
    }

}

export default connect(mapStateToProps)(Dashboard)