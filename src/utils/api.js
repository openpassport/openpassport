
const headers = {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token 1e6bc64496f5ca8c30ac93c0f0e74ee056f54704"
    }
}

export function getPassportDetailsForCountry(homeId) {
    return fetch(`https://api.openpassport.co/api/op/countries/${homeId}/destinations/`, headers)
        .then(data => data.json())
        .then(response => {
            return response
        })
        .catch(function () {
            console.log("error");
        })
}

export function getDestinationBasic(homeId, destinationId) {
    return fetch(`https://api.openpassport.co/api/op/countries/${homeId}/destinations/?country=${destinationId}`, headers)
        .then(data => data.json())
        .then(response => {
            return response
        })
        .catch(function () {
            console.log("error");
        })
}

export function getAllCountries() {
    return fetch("https://openpassport.co/api/op/countries/", headers)
        .then(data => data.json())
        .then(response => {
            return response
        })
}

export function getVisaDetails(sId, dId) {
    return fetch(`https://openpassport.co/api/op/passport/visadetails?source_id=${sId}&destination_id=${dId}`, headers)
        .then(data => data.json())
        .then(response => {
            return response
        })
}