export const GET_DESTINATIONDETAILS = 'GET_DESTINATIONDETAILS'

export function getDestinationDetails(destinations) {
    return {
        type: GET_DESTINATIONDETAILS,
        destinations
    }
}