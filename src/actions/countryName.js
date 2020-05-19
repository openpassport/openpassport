export const GET_COUNTRYNAMES = 'GET_COUNTRYNAMES'

export function getCountryNames(countries) {
    return {
        type: GET_COUNTRYNAMES,
        countries
    }
}