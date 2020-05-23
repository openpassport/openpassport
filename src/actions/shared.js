import {
    getAllCountries,
    getPassportDetailsForCountry,
    getDestinationBasic,
    getSourceCountry
} from '../utils/api'
import { getCountryNames } from './countryName'
import { getPassportValidCountryList } from './passportValidCountryList'
import { setSourceCountry } from './setSourceCountry'
import { getDestinationDetails } from './destinationDetails'


export function handleInitialData() {
    return (dispatch) => {
        return getAllCountries()
            .then((countries) => {
                dispatch(getCountryNames(countries))
            })
    }
}

export function handleSourceCountry(homeId) {
    return (dispatch) => {
        return getSourceCountry(homeId)
            .then((country) => {
                dispatch(setSourceCountry(country))
            })
    }
}

export function handleSourceCountryData(id) {
    return (dispatch) => {
        return getPassportDetailsForCountry(id)
            .then((countries) => {
                dispatch(getPassportValidCountryList(countries))
            })
    }
}

export function handleDestinationBasicData(homeId, destinationId) {
    return (dispatch) => {
        return getDestinationBasic(homeId, destinationId)
            .then((destination) => {
                dispatch(getDestinationDetails(destination))
            })
    }
}