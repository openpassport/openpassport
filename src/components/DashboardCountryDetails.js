import React from 'react'
import { connect } from 'react-redux'
import DestinationDetails from './DestinationDetails'
import {
    Route,
    Link
} from 'react-router-dom'

import MapBox from './MapBox'

const free = "visa-not-required"
const required = "visa-required"
const arrival = "visa-arrival"

class DashboardCountryDetails extends React.Component {

    render() {
        const list = showVisaFree === true
            ? freeList
            : showRequired === true
                ? requiredList
                : arrivalList

        return (
            <div className="country-details">
                desgtination
                {/* <Route path={`${this.props.match.path}/:destinationSlug`} component={DestinationDetails} /> */}
                {/* <MapBox countryList={list} className='mapbox-container' /> */}
                <MapBox countryList={list} className='mapbox-container' />
            </div>
        )
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
        passportValidCountryList
    }

}

export default connect(mapStateToProps)(DashboardCountryDetails)