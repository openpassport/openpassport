
const headers = {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token 8ad58842993051aa807c8d3c4c6eb9a34a8e394c"
    }
}

export function getPassportDetailsForCountry(home) {
    var lowercase_home = home.toLowerCase()
    return fetch(`https://api.openpassport.co/api/op/countries/${lowercase_home}/destinations/`, headers)
        .then(data => data.json())
        .then(response => {
            return response
        })
        .catch(function () {
            console.log("error");
        })
}

export function getSourceCountry(home) {
    var lowercase_home = home.toLowerCase()
    return fetch(`https://api.openpassport.co/api/op/countries/${lowercase_home}/`, headers)
        .then(data => data.json())
        .then(response => {
            return response
        })
        .catch(function () {
            console.log('error')
        })
}

export function getDestinationBasic(homeId, destinationId) {
    var lowercase_home = homeId.toLowerCase()
    var lowercase_destination = destinationId.toLowerCase()
    return fetch(`https://api.openpassport.co/api/op/countries/${lowercase_home}/destinations/?country=${lowercase_destination}`, headers)
        .then(data => data.json())
        .then(response => {
            return response
        })
        .catch(function () {
            console.log("error");
        })
}

export function getAllCountries() {
    return fetch("https://api.openpassport.co/api/op/countries/", headers)
        .then(data => data.json())
        .then(response => {
            return response
        })
}

export function getVisaDetails(sId, dId) {
    return fetch(`https://api.openpassport.co/api/op/passport/visadetails?source_id=${sId}&destination_id=${dId}`, headers)
        .then(data => data.json())
        .then(response => {
            return response
        })
}
