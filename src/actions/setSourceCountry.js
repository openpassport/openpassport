export const SET_SOURCECOUNTRY = 'SET_SOURCECOUNTRY'

export function setSourceCountry(source) {
    return {
        type: SET_SOURCECOUNTRY,
        source,
    }
}