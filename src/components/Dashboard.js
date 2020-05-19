import React from 'react'
import { connect } from 'react-redux'
import {
    Route,
    Link
} from 'react-router-dom'
import { handleSourceCountryData } from '../actions/shared'
import DestinationDetails from './DestinationDetails'

class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(handleSourceCountryData(this.props.match.params.id))
    }

    render() {
        const { loading, passportValidCountryList } = this.props
        if (!loading) {
            return (
                <div className='container'>
                    <h1>Country List</h1>
                    <ul>
                        {Object.keys(passportValidCountryList).map((item) => (
                            <li key={passportValidCountryList[item].id}>
                                <Link to={`${this.props.match.url}/${passportValidCountryList[item].id}`} >{passportValidCountryList[item].id}</Link>
                            </li>
                        ))
                        }
                    </ul>
                    <Route path={`${this.props.match.path}/:destinationId`} component={DestinationDetails} />
                </div >
            )
        }
        else {
            return (
                <div> Loading</div>
            )
        }
    }

}

function mapStateToProps({ passportValidCountryList }) {
    return {
        loading: passportValidCountryList === null,
        passportValidCountryList,
    }

}

export default connect(mapStateToProps)(Dashboard)