import { GET_PASSPORTVALIDCOUNTRYLIST } from '../actions/passportValidCountryList'

export default function getPassportValidCountryList(state = {}, action) {
    switch (action.type) {
        case GET_PASSPORTVALIDCOUNTRYLIST:
            return {
                ...action.passportValidCountryList,
            }
        default: {
            return state

        }

    }
}