import { GET_COUNTRYNAMES } from '../actions/countryName'

export default function countries(state = {}, action) {
    switch (action.type) {
        case GET_COUNTRYNAMES:
            return {
                ...action.countries,
            }
        default: {
            return state

        }

    }
}