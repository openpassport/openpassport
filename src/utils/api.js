
const headers = {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token 8ad58842993051aa807c8d3c4c6eb9a34a8e394c"
    }
}

export function getPassportDetailsForCountry(home) {
    console.log("12412414124", home)
    return fetch(`https://api.openpassport.co/api/op/countries/${home}/destinations/`, headers)
        .then(data => data.json())
        .then(response => {
            return response
        })
        .catch(function () {
            console.log("error");
        })
}

export function getSourceCountry(home) {
    return fetch(`https://api.openpassport.co/api/op/countries/${home}/`, headers)
        .then(data => data.json())
        .then(response => {
            return response
        })
        .catch(function () {
            console.log('error')
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