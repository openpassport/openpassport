import React from 'react'
import { connect } from 'react-redux'
import {
    Route,
    Link
} from 'react-router-dom'
import {
    handleSourceCountryData,
    handleSourceCountry,
    handleResetSourceDes
} from '../actions/shared'
import DestinationDetails from './DestinationDetails'
import MapBox from './MapBox'

const free = "visa-not-required"
const required = "visa-required"
const arrival = "visa-arrival"

class Dashboard extends React.Component {
    state = {
        showVisaFree: true,
        showArrival: false,
        showRequired: false,
        list: []
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

    constructor(props) {
        super(props)
        this.clickToReset = this.clickToReset.bind(this)
        this.props.dispatch(handleSourceCountryData(this.props.match.params.homeSlug))
        this.props.dispatch(handleSourceCountry(this.props.match.params.homeSlug))
    }

    clickToReset = () => {
        this.props.dispatch(handleResetSourceDes())
    }

    componentDidMount() {
        console.log("mounted", this.props)
    }

    render() {
        const { showArrival, showRequired, showVisaFree } = this.state
        const { loading, sourceCountry, requiredList, freeList, arrivalList } = this.props
        const list = showVisaFree === true
            ? freeList
            : showRequired === true
                ? requiredList
                : arrivalList

        if (!loading) {
            return (
                <div className='dashboard-container'>
                    <div className='dashboard-sidebar'>
                        <div className="dashboard-sidepanel-header">
                            <div className="dashboard-sidepanel-logo">
                                <img alt='Openpassport' src={require('../assets/images/op-logo.svg')} width='175px' />
                            </div>
                            {sourceCountry &&
                                <Link
                                    className="dashboard-sidepanel-country-select-button"
                                    onClick={() => this.clickToReset()}
                                    to='/'>
                                    <span className="form-label">Your home country</span>
                                    <span className="form-title">{sourceCountry.name}</span>
                                </Link>
                            }
                        </div>
                        <div className='dashboard-sidepanel-tab-group'>
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

                        <div className="dashboard-sidepanel-country-list">
                            {list.map((item, i) => (
                                <Link className="dashboard-sidepanel-country-list-item"
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
                    <div className="country-details">
                        <Route path={`${this.props.match.path}/:destinationSlug`} component={DestinationDetails} />
                        <MapBox countryList={list} />
                    </div>
                </div >
            )
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

function mapStateToProps({ sourceCountry, passportValidCountryList }) {
    const tmp = Object.values(passportValidCountryList)
    const arrivalList = []
    const freeList = []
    const requiredList = []

    tmp.map((item) => {
        switch (item.visa) {
            case arrival:
                arrivalList.push(item.destination)
                return arrivalList
            case free:
                freeList.push(item.destination)
                return freeList
            case required:
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
        passportValidCountryList
    }

}

export default connect(mapStateToProps)(Dashboard)