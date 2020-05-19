import { GET_DESTINATIONDETAILS } from '../actions/destinationDetails'

export default function getDestinationDetails(state = {}, action) {
    switch (action.type) {
        case GET_DESTINATIONDETAILS:
            return {
                ...state,
                ...action.destinationDetails
            }
        default:
            return state

    }
}