import React from 'react'

class HomeFooter extends React.Component {
    render() {
        return (
            <div className='static-footer'>
                <img alt="logo+mark" src={require('../assets/images/logo+mark.svg')} height='100px' />
                <div className='static-message-footer'>
                </div>
            </div>
        )
    }
}

export default HomeFooter