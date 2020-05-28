import React from 'react'
import mapboxgl from 'mapbox-gl'
import { connect } from 'react-redux'

let map = null
mapboxgl.accessToken = 'pk.eyJ1IjoiYXJ1bmRzZ24iLCJhIjoiY2thamE3cnU0MDhwbTJybWlmdHloZmxvdiJ9.K_-a3_f8K5f1780lG7YLWA'

class MapBox extends React.Component {
    componentDidMount() {
        map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.props.sourceCountry.longitude, this.props.sourceCountry.latitude],
            zoom: 3
        })
        map.addControl(new mapboxgl.NavigationControl())
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
        return (
            <div>
                <div ref={el => this.mapContainer = el} className="mapContainer" />
            </div>
        )
    }
}

function mapStateToProps({ sourceCountry, destinationDetails }) {
    return {
        sourceCountry,
        destinationDetails
    }
}

export default connect(mapStateToProps)(MapBox)
