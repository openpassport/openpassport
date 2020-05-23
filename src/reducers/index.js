import { combineReducers } from 'redux'
import countries from './countries'
import sourceCountry from './setSourceCountry'
import passportValidCountryList from './passportValidCountryList'
import destinationDetails from './destinationDetails'

export default combineReducers({
    sourceCountry,
    countries,
    passportValidCountryList,
    destinationDetails
})