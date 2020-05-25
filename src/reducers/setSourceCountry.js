import { SET_SOURCECOUNTRY } from '../actions/setSourceCountry'
import { RESET_SOURCE } from '../actions/resetSource'

export default function setSourceCountry(state = null, action) {
    switch (action.type) {
        case SET_SOURCECOUNTRY:
            return {
                ...action.source
            }
        case RESET_SOURCE:
            return {}
        default:
            return state
    }
}