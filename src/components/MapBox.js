import React from 'react'
import mapboxgl from 'mapbox-gl'
import { connect } from 'react-redux'

mapboxgl.accessToken = 'pk.eyJ1IjoiYXJ1bmRzZ24iLCJhIjoiY2thamE3cnU0MDhwbTJybWlmdHloZmxvdiJ9.K_-a3_f8K5f1780lG7YLWA'


class MapBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            initialData: this.props.countryList
        }
    }
    mapRef = React.createRef()
    map
    componentDidMount() {
        if (!this.props.loading) {
            this.map = new mapboxgl.Map({
                container: this.mapRef.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [12, 42],
                zoom: 1.5,
                maxBounds: [[-180, -85], [180, 85]]
            })

            var featureCollection = []
            const lngLat = []
            Object.values(this.state.initialData).map((item) => {
                const obj = []
                obj["coordinate"] = [item.longitude, item.latitude]
                obj["slug"] = item.slug
                obj["name"] = item.name
                obj["visatype"] = item.visatype
                return lngLat.push(obj)
            })

            for (var itemIndex in lngLat) {
                featureCollection.push({
                    "type": "geojson",
                    "properties": {
                        'visatype': lngLat[itemIndex].visatype
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": lngLat[itemIndex].coordinate
                    }
                })
            }
            this.map.on('load', function () {
                this.addControl(new mapboxgl.NavigationControl())
                this.addSource('point', {
                    type: "geojson",
                    data: {
                        "type": "FeatureCollection",
                        "features": featureCollection
                    }
                })
                this.addLayer({
                    "id": "location",
                    "source": "point",
                    "type": "circle",
                    "paint": {
                        "circle-radius": {
                            'base': 8,
                            'stops': [
                                [1.5, 10],
                                [2, 10]
                            ]
                        },
                        "circle-color": [
                            'match',
                            ['get', 'visatype'],
                            'visa-not-required',
                            '#00A013',
                            'visa-arrival',
                            '#D78100',
                            'visa-required',
                            '#D93E69',
                            '#00A013'
                        ],
                        'circle-opacity': 0.6
                    },
                })
            })
        }
    }

    componentDidUpdate(prevProps) {

        console.log("asfaffaf12409090914", this.props.countryList)
        if (Object.keys(this.props.countryList).length !== Object.keys(prevProps.countryList).length) {
            var featureCollection = []
            const lngLat = []
            Object.values(this.props.countryList).map((item) => {
                const obj = []
                obj["coordinate"] = [item.longitude, item.latitude]
                obj["slug"] = item.slug
                obj["name"] = item.name
                obj["visatype"] = item.visatype
                return lngLat.push(obj)
            })
            for (var itemIndex in lngLat) {
                featureCollection.push({
                    "type": "geojson",
                    "properties": {
                        'visatype': lngLat[itemIndex].visatype
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": lngLat[itemIndex].coordinate
                    }
                })
            }

            this.map.on('load', function (e) {
                if (this.getSource('point') !== undefined) {
                    this.getSource('point').setData({
                        "type": "FeatureCollection",
                        "features": featureCollection
                    })
                }
            })
            //for all cases
            if (this.map.getSource('point') !== undefined) {
                this.map.getSource('point').setData({
                    "type": "FeatureCollection",
                    "features": featureCollection
                })
            }
        }

        /*Logic for map */
        if ((this.props.destinationDetails[0] === null) || (Object.keys(this.props.destinationDetails).length === 0)) {
            this.map.flyTo({
                center: [12, 42],
                essential: true,
                zoom: 1.5
            })
        }
        else {
            this.map.flyTo({
                center: [this.props.destinationDetails[0].destination.longitude, this.props.destinationDetails[0].destination.latitude],
                zoom: 4.5,
                essential: true,
                speed: 1.5,
            })
        }
    }

    render() {
        const { loading } = this.props

        if (!loading) {
            return (
                <div ref={this.mapRef} className="mapbox-container" />
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

function mapStateToProps({ destinationDetails }) {
    return {
        loading: destinationDetails === null,
        destinationDetails
    }
}

export default connect(mapStateToProps)(MapBox)
