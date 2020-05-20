import React from 'react'
import {
    Link,
} from 'react-router-dom'
import { connect } from 'react-redux'
import { handleDestinationBasicData } from '../actions/shared'

class CountryDetails extends React.Component {
    componentDidMount() {
        this.props.dispatch(handleDestinationBasicData(356, 462))
    }
    render() {
        const { loading, destinationDetails } = this.props

        if (!loading) {
            return (
                <div>
                    {Object.keys(destinationDetails).map((item) => (
                        <li key={destinationDetails[item].id}>
                            {destinationDetails[item].id}
                        </li>
                    ))}
                </div>
            )
        }
        else {
            return (
                <div>Loading</div>
            )
        }
    }
}

function mapStateToProps({ destinationDetails }) {
    console.log("*********", destinationDetails)
    return {
        loading: destinationDetails === null,
        destinationDetails
    }
}

export default connect(mapStateToProps)(CountryDetails)