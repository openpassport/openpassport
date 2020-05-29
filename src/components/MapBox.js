import React from 'react'
import mapboxgl from 'mapbox-gl'
import { connect } from 'react-redux'

mapboxgl.accessToken = 'pk.eyJ1IjoiYXJ1bmRzZ24iLCJhIjoiY2thamE3cnU0MDhwbTJybWlmdHloZmxvdiJ9.K_-a3_f8K5f1780lG7YLWA'

let map = null

var size = 200

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
            this.map.addControl(new mapboxgl.NavigationControl())

        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("longLat", this.props.lngLatFree)
        var pulsingDot = {
            width: size,
            height: size,
            data: new Uint8Array(size * size * 4),

            onAdd: function () {
                var canvas = document.createElement('canvas')
                canvas.width = this.width
                canvas.height = this.height
                this.context = canvas.getContext('2d')
            },

            render: function () {
                var duration = 2000;
                var t = (performance.now() % duration) / duration;

                var radius = (size / 3) * 0.2;
                var context = this.context;

                // draw inner circle
                context.beginPath();
                context.arc(
                    this.width / 2,
                    this.height / 2,
                    radius,
                    0,
                    Math.PI * 2
                );
                context.fillStyle = 'rgba(0, 160, 19, 1)';
                context.strokeStyle = 'white';
                context.lineWidth = 0.2 + 4 * (1 - t);
                context.fill();
                context.stroke();
                this.data = context.getImageData(
                    0,
                    0,
                    this.width,
                    this.height
                ).data

                return true
            }
        }

        var featureCollection = []
        // for every item object within longLat
        for (var itemIndex in this.props.lngLatFree) {
            console.log("hh")
            featureCollection.push({
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": this.props.lngLatFree[itemIndex].coordinate
                },
                "properties": {
                    //"title": longLat[itemIndex].text
                }
            })
        }
        this.map.on('load', function () {
            this.addImage('free-dot', pulsingDot, { pixelRatio: 2 })
            this.addLayer({
                "id": "points",
                "type": "symbol",
                "source": {
                    "type": "geojson",
                    "data": {
                        "type": "FeatureCollection",
                        "features": featureCollection
                    }
                },
                "layout": {
                    "icon-image": "free-dot",
                    "text-field": "{title}",
                    "text-offset": [0, 0.6],
                    "text-anchor": "top"
                }
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
                <div className='map-loading'>
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
