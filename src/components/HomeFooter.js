import React from 'react'
import {
    Link
} from 'react-router-dom'

class HomeFooter extends React.Component {
    render() {
        return (
            <div className='static-footer'>
                <img alt="logo+mark" src={require('../assets/images/logo+mark.svg')} height='100px' />
                <div className='static-message-footer'>
                    <div className='container'>
                        <ul className='link-group'>
                            <Link className='link-item'
                                to='/about'>About</Link>
                            <Link className='link-item'
                                to='/privacy'>Privacy</Link>
                            <Link className='link-item'
                                to='/terms'>Terms</Link>
                        </ul>
                        <ul className='logo'>
                            <p>© OpenPassport 2020</p>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeFooter