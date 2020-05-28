import React from 'react'
import mapboxgl from 'mapbox-gl'
import { connect } from 'react-redux'

mapboxgl.accessToken = 'pk.eyJ1IjoiYXJ1bmRzZ24iLCJhIjoiY2thamE3cnU0MDhwbTJybWlmdHloZmxvdiJ9.K_-a3_f8K5f1780lG7YLWA'

let map = null

var size = 200

class MapBox extends React.Component {
    componentDidMount() {
        if (!this.props.loading) {
            map = new mapboxgl.Map({
                container: this.mapContainer,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [0, 42],
                zoom: 1.3
            })
            map.addControl(new mapboxgl.NavigationControl())
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

                    var radius = (size / 4) * 0.2;
                    var outerRadius = (size / 3) * 0.4 * t + radius;
                    var context = this.context;

                    // draw outer circle
                    context.clearRect(0, 0, this.width, this.height);
                    context.beginPath();
                    context.arc(
                        this.width / 2,
                        this.height / 2,
                        outerRadius,
                        0,
                        Math.PI * 2
                    );
                    context.fillStyle = 'rgba(0, 160, 19,' + (1 - t) + ')';
                    context.fill();

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
                    map.triggerRepaint()
                    return true
                }
            }

            var featureCollection = []

            var longLat = [
                {
                    cordinate: [53.515333, 20],
                    text: "India"
                },
                {
                    cordinate: [10, 60],
                    text: "America"
                },
                {
                    cordinate: [-20, -40],
                    text: "Germany"
                },
                {
                    cordinate: [-50, 20],
                    text: "Africa"
                }
            ];

            // for every item object within longLat
            for (var itemIndex in longLat) {
                featureCollection.push({
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": longLat[itemIndex].cordinate
                    },
                    "properties": {
                        //"title": longLat[itemIndex].text
                    }
                });
            }
            map.on('load', function () {
                map.addImage('free-dot', pulsingDot, { pixelRatio: 2 })
                map.addLayer({
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
                });
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if ((this.props.destinationDetails[0] === null) || (Object.keys(this.props.destinationDetails).length === 0)) {
            if (prevProps.sourceCountry.id !== this.props.sourceCountry.id) {
                map.flyTo({
                    center: [this.props.sourceCountry.longitude, this.props.sourceCountry.latitude],
                    essential: true
                })
            }
        }
        else {
            map.flyTo({
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
                    <div ref={el => this.mapContainer = el} className="mapContainer" />
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

function mapStateToProps({ sourceCountry, destinationDetails }) {
    return {
        loading: (sourceCountry === null) || (Object.values(sourceCountry).length === 0),
        sourceCountry,
        destinationDetails
    }
}

export default connect(mapStateToProps)(MapBox)
