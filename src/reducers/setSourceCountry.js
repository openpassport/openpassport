import { SET_SOURCECOUNTRY } from '../actions/setSourceCountry'

export default function setSourceCountry(state = null, action) {
    switch (action.type) {
        case SET_SOURCECOUNTRY:
            return action.source
        default:
            return state
    }
}