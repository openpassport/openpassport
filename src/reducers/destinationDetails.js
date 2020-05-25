import { GET_DESTINATIONDETAILS } from '../actions/destinationDetails'
import { RESET_DESTINATION } from '../actions/resetDestination'

export default function getDestinationDetails(state = {}, action) {
    switch (action.type) {
        case GET_DESTINATIONDETAILS:
            return {
                ...action.destinations
            }
        case RESET_DESTINATION:
            return {}
        default:
            return state

    }
}