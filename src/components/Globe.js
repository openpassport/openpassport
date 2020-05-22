import React from 'react'
import { Map, TileLayer } from 'react-leaflet'

class Globe extends React.Component {
    constructor() {
        super();
        this.state = {
            lat: 25.505,
            lng: 50.09,
            zoom: 2,
        };
    }

    render() {
        const position = [this.state.lat, this.state.lng];
        return (
            <Map className='map' center={position} zoom={this.state.zoom}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
            </Map>
        );
    }
}

export default Globe