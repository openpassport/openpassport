import React, { Component, Fragment } from "react"
import { connect } from 'react-redux'
import {
    Link,
    Redirect
} from 'react-router-dom'

class AutoComplete extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: "",
            defaultCountry: {}
        }
        this.clickMe = this.clickMe.bind(this)
    }

    onChange = e => {
        const { suggestions } = this.props
        var countries = Object.values(suggestions)

        const userInput = e.currentTarget.value;
        const filteredSuggestions = []
        let i = 0
        countries.forEach((country) => {
            if (country.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1) {
                var obj = {}
                obj["id"] = country.id
                obj["name"] = country.name
                filteredSuggestions.push(obj)
            }
        })

        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            userInput: e.currentTarget.value
        })
    }

    handleOnClick = () => (
        this.setState({
            redirect: true
        })
    )


    clickMe = (e, selectedCountry) => {
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: e.currentTarget.value,
            redirect: true,
            countrySelect: selectedCountry
        })

    }

    onKeyDown = e => {
        const { activeSuggestion, filteredSuggestions } = this.state
        if (e.keyCode === 13) {
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: filteredSuggestions[activeSuggestion].name
            })
        }
        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return
            }

            this.setState({ activeSuggestion: activeSuggestion - 1 })
        }

        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return
            }

            this.setState({ activeSuggestion: activeSuggestion + 1 });
        }
    }


    render() {
        const {
            onChange,
            clickMe,
            onKeyDown,
            state: {
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
                userInput
            }
        } = this
        if (this.state.redirect) {
            return <Redirect push to={`/c/${this.state.countrySelect.id}`} />;
        }
        let suggestionsListComponent;
        const outputLength = Object.keys(filteredSuggestions).length

        if (showSuggestions && userInput) {
            if (outputLength > 0) {
                suggestionsListComponent = (
                    <ul className="suggestions">
                        {filteredSuggestions.map((item, index) => {
                            let className;

                            if (index === activeSuggestion) {
                                className = "suggestion-active";
                            }
                            const selectedCountry = {
                                name: item.name,
                                id: item.id
                            }

                            return (
                                <li
                                    className={className}
                                    key={item.id}
                                    onClick={(e) => this.clickMe(e, selectedCountry)}>
                                    {item.name}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                suggestionsListComponent = (
                    <div className="no-suggestions">
                        <em>No suggestions, you're on your own!</em>
                    </div>
                );
            }
        }

        return (
            <Fragment>
                <input
                    type="text"
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={userInput}
                    placeholder="Select your home country"
                />
                {suggestionsListComponent}
            </Fragment>
        );
    }
}

function mapStateToProps({ countries }) {
    const suggestions = []
    Object.values(countries).forEach(function (item) {
        suggestions.push(item)
    })
    return {
        suggestions
    }
}

export default connect(mapStateToProps)(AutoComplete)