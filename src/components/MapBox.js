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
        console.log("here", this.props.countryList)
        if (!this.props.loading) {
            this.map = new mapboxgl.Map({
                container: this.mapRef.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [0, 42],
                zoom: 1.3
            })

            var featureCollection = []
            const lngLat = []
            Object.values(this.props.countryList).map((item) => {
                const obj = []
                obj["coordinate"] = [item.longitude, item.latitude]
                obj["slug"] = item.slug
                obj["name"] = item.name
                lngLat.push(obj)
            })
            for (var itemIndex in lngLat) {
                featureCollection.push({
                    "type": "geojson",
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
                        "circle-radius": 10,
                        "circle-color": "#00A013"
                    }
                })
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (Object.keys(this.props.countryList).length !== Object.keys(prevProps.countryList).length) {
            var featureCollection = []
            const lngLat = []
            Object.values(this.props.countryList).map((item) => {
                const obj = []
                obj["coordinate"] = [item.longitude, item.latitude]
                obj["slug"] = item.slug
                obj["name"] = item.name
                lngLat.push(obj)
            })
            for (var itemIndex in lngLat) {
                featureCollection.push({
                    "type": "geojson",
                    "geometry": {
                        "type": "Point",
                        "coordinates": lngLat[itemIndex].coordinate
                    }
                })
            }
            if (this.map.getSource('point') !== undefined) {
                this.map.getSource('point').setData({
                    "type": "FeatureCollection",
                    "features": featureCollection
                })
            }
        }

        if ((this.props.destinationDetails[0] === null) || (Object.keys(this.props.destinationDetails).length === 0)) {
            if (prevProps.sourceCountry.id !== this.props.sourceCountry.id) {
                this.map.flyTo({
                    center: [this.props.sourceCountry.longitude, this.props.sourceCountry.latitude],
                    essential: true,
                })
            }
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

function mapStateToProps({ sourceCountry, destinationDetails }) {
    return {
        loading: (sourceCountry === null) || (Object.values(sourceCountry).length === 0),
        sourceCountry,
        destinationDetails
    }
}

export default connect(mapStateToProps)(MapBox)
