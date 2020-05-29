import React from 'react'
import mapboxgl from 'mapbox-gl'
import { connect } from 'react-redux'

mapboxgl.accessToken = 'pk.eyJ1IjoiYXJ1bmRzZ24iLCJhIjoiY2thamE3cnU0MDhwbTJybWlmdHloZmxvdiJ9.K_-a3_f8K5f1780lG7YLWA'


class MapBox extends React.Component {
    mapRef = React.createRef()
    map
    componentDidMount() {
        if (!this.props.loading) {
            this.map = new mapboxgl.Map({
                container: this.mapRef.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [0, 42],
                zoom: 1.3
            })

            this.map.on('load', function () {
                this.addControl(new mapboxgl.NavigationControl())
                this.addSource('point', {
                    type: "geojson",
                    data: {
                        "type": "FeatureCollection",
                        "features": [{
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    25,
                                    39
                                ]
                            }
                        }]
                    }
                })
                this.addLayer({
                    "id": "point",
                    "source": "point",
                    "type": "circle",
                    "paint": {
                        "circle-radius": 10,
                        "circle-color": "#00A013"
                    }
                })
            })


        }
    }

    componentDidUpdate(prevProps) {
        //console.log("longLat", this.props.lngLatFree)
        this.map.on('load', function () {
            this.getSource('point').setData({
                "type": "FeatureCollection",
                "features": [{
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [70, 40]
                    }
                }]
            })

        })
        if ((this.props.destinationDetails[0] === null) || (Object.keys(this.props.destinationDetails).length === 0)) {
            if (prevProps.sourceCountry.id !== this.props.sourceCountry.id) {
                this.map.flyTo({
                    center: [this.props.sourceCountry.longitude, this.props.sourceCountry.latitude],
                    essential: true
                })
            }
        }
        else {
            this.map.flyTo({
                center: [this.props.destinationDetails[0].destination.longitude, this.props.destinationDetails[0].destination.latitude],
                zoom: 3,
                essential: true,
                speed: 1.5,
            })
        }
    }

    render() {
        const { loading } = this.props

        if (!loading) {
            return (
                <div>
                    <div ref={this.mapRef} className="mapContainer" />
                </div>
            )
        }
        else {
            return (
                <div className='map-loading' >
                    Loading map
                </div>
            )
        }

    }
}

function mapStateToProps({ sourceCountry, passportValidCountryList, destinationDetails }) {
    const lngLatFree = []
    const lngLatArrival = []
    const lngLatRequired = []
    Object.values(passportValidCountryList).map((item) => {
        const obj = []
        switch (item.visa) {
            case 'visa-not-required':
                obj["coordinate"] = [item.destination.longitude, item.destination.latitude]
                obj["slug"] = item.destination.slug
                obj["name"] = item.destination.name
                return lngLatFree.push(obj)
            case 'visa-required':
                obj["coordinate"] = [item.destination.longitude, item.destination.latitude]
                obj["slug"] = item.destination.slug
                obj["name"] = item.destination.name
                return lngLatRequired.push(obj)
            case 'visa-arrival':
                obj["coordinate"] = [item.destination.longitude, item.destination.latitude]
                obj["slug"] = item.destination.slug
                obj["name"] = item.destination.name
                return lngLatArrival.push(obj)
            default:
                return null
        }
    })
    return {
        loading: (sourceCountry === null) || (Object.values(sourceCountry).length === 0),
        sourceCountry,
        lngLatFree,
        lngLatArrival,
        lngLatRequired,
        destinationDetails
    }
}

export default connect(mapStateToProps)(MapBox)
