import {
    getAllCountries,
    getPassportDetailsForCountry,
    getDestinationBasic
} from '../utils/api'
import { getCountryNames } from './countryName'
import { getPassportValidCountryList } from './passportValidCountryList'
import { setAuthedUser } from './authedUser'
import { getDestinationDetails } from './destinationDetails'

const AUTHED_ID = 'tylermcginnis'

export function handleInitialData() {
    return (dispatch) => {
        return getAllCountries()
            .then((countries) => {
                dispatch(getCountryNames(countries))
                dispatch(setAuthedUser(AUTHED_ID))
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