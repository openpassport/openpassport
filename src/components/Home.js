import React from 'react'
import HomePassportIndex from './HomePassportIndex'
import HomeVisaOpenness from './HomeVisaOpenness'
import HomeFooter from './HomeFooter'
import HomeCountryChooser from './HomeCountryChooser'


// import {
//     CSSTransition,
//     TransitionGroup
// } from 'react-transition-group'

// <TransitionGroup>
//     <CSSTransition
//         key={location.key}
//         classNames='fade'
//         timeout={300}>
//         <div>
//         </div>
//     </CSSTransition>
// </TransitionGroup>

class Home extends React.Component {
    render() {
        return (
            <div>
                <HomeCountryChooser />
                <HomePassportIndex />
                <HomeVisaOpenness />
                <HomeFooter />
            </div>
        )
    }
}

export default Home