export const GET_DESTINATIONDETAILS = 'GET_DESTINATIONDETAILS'

export function getDestinationDetails(destinationDetails) {
    return {
        type: GET_DESTINATIONDETAILS,
        destinationDetails
    }
}