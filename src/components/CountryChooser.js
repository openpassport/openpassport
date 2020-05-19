import React from 'react'
import AutoComplete from "./AutoComplete";

class CountryChooser extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ul>
                <AutoComplete
                />
            </ul>
        )
    }
}



export default CountryChooser;
