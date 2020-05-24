import React from 'react'
import mapboxgl from 'mapbox-gl'

let map = null
mapboxgl.accessToken = 'pk.eyJ1IjoiYXJ1bmRzZ24iLCJhIjoiY2thamE3cnU0MDhwbTJybWlmdHloZmxvdiJ9.K_-a3_f8K5f1780lG7YLWA'

class MapBox extends React.Component {
    componentDidMount() {
        map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.props.sourceCountry.longitude, this.props.sourceCountry.latitude],
            zoom: 4
        })
        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            })
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.sourceCountry.id !== this.props.sourceCountry.id) {
            console.log("ghjh *********PROPS CHANGEDD***********")
            map.flyTo({
                center: [this.props.sourceCountry.longitude, this.props.sourceCountry.latitude],
                essential: true
            });
        }
    }

    render() {
        return (
            <div>
                <div ref={el => this.mapContainer = el} className="mapContainer" />
            </div>
        )
    }
}

export default MapBox
