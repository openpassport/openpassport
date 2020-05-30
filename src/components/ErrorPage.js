import React from 'react'
import {
    handleResetDestination
} from '../actions/shared'
import { connect } from 'react-redux'

import {
    Link
} from 'react-router-dom'

class ErrorPage extends React.Component {
    clickToReset = () => {
        this.props.dispatch(handleResetDestination())
    }
    render() {
        return (
            <div className='error-page'>
                Errror<br /><br />
                <Link to='/' onClick={this.clickToReset}> Go Home </Link>
            </div>
        )
    }
}

export default connect()(ErrorPage)