import { combineReducers } from 'redux'
import countries from './countries'
import authedUser from './authedUser'
import passportValidCountryList from './passportValidCountryList'
import destinationDetails from './destinationDetails'

export default combineReducers({
    authedUser,
    countries,
    passportValidCountryList,
    destinationDetails
})