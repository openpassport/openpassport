export const GET_PASSPORTVALIDCOUNTRYLIST = 'GET_PASSPORTVALIDCOUNTRYLIST'

export function getPassportValidCountryList(passportValidCountryList) {
    return {
        type: GET_PASSPORTVALIDCOUNTRYLIST,
        passportValidCountryList,
    }
}