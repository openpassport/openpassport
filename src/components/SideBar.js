import React from 'react'
import {
    Link,
    Redirect
} from 'react-router-dom'

import { setSourceCountry } from '../actions/setSourceCountry'

class SideBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            source: {},
            redirect: false
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick = (e) => {
        this.props.dispatch(setSourceCountry(this.state.source))
        this.setState({
            redirect: true
        })
    }
    render() {
        if (this.state.redirect) {
            return <Redirect push to={`/`} />
        }
        return (
            <div className='dashboard-sidebar'>
                <div className="dashboard-sidepanel-header">
                    <div className="dashboard-sidepanel-logo">
                        <img alt='Openpassport' src={require('../assets/images/op-logo.svg')} width='175px' />
                    </div>
                    {this.props.sourceCountry &&
                        <button onClick={() => this.handleClick}>{this.props.sourceCountry.name}</button>
                        // <Link className="dashboard-sidepanel-country-select-button" to='/'>
                        //     <span className="form-label">Your home country</span>
                        //     <span className="form-title"></span>
                        // </Link>
                    }
                </div>
                <div className="dashboard-sidepanel-country-list">
                    {Object.values(this.props.countryList).map((item, i) => (
                        <Link className="dashboard-sidepanel-country-list-item"
                            key={i}
                            to={`${this.props.match.url}/${item.destination.id}`}>
                            <h3>
                                {item.destination.name}
                            </h3>
                            <p>{item.destination.subregion} {item.destination.capital}  </p>
                        </Link>
                    ))
                    }
                </div>
            </div>
        )
    }
}

export default SideBar