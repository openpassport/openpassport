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
import { resetSource } from './resetSource'
import { resetDestination } from './resetDestination'

export function handleInitialData() {
    return (dispatch) => {
        return getAllCountries()
            .then((countries) => {
                dispatch(getCountryNames(countries))
            })
    }
}

export function handleSourceCountry(home) {
    return (dispatch) => {
        return getSourceCountry(home)
            .then((country) => {
                dispatch(setSourceCountry(country))
            })
    }
}

export function handleSourceCountryData(slug) {
    return (dispatch) => {
        return getPassportDetailsForCountry(slug)
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

export function handleResetSourceDes() {
    return (dispatch) => {
        dispatch(resetSource())
        dispatch(resetDestination())
    }
}