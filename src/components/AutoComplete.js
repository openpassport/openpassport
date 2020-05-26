import React, { Component, Fragment } from "react"
import { connect } from 'react-redux'
import {
    Redirect
} from 'react-router-dom'

class AutoComplete extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: ""
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
    }

    componentDidMount() {
        this.sourceInput.focus()
    }

    onChange = e => {
        const { suggestions } = this.props
        var countries = Object.values(suggestions)

        const userInput = e.currentTarget.value;
        const filteredSuggestions = []
        countries.forEach((country) => {
            if (country.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1) {
                var obj = {}
                obj["slug"] = country.slug
                obj["name"] = country.name
                obj["flag"] = country.flag
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

    handleClick = (e, selectedCountry) => {
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: e.currentTarget.value,
            redirect: true,
            countrySelect: selectedCountry
        })

    }

    handleKeyDown = e => {
        const { activeSuggestion, filteredSuggestions } = this.state
        if (e.keyCode === 13) {
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: filteredSuggestions[activeSuggestion].name,
                redirect: true,
                countrySelect: filteredSuggestions[activeSuggestion]
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
            state: {
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
                userInput
            }
        } = this
        if (this.state.redirect) {
            return <Redirect to={`/${this.state.countrySelect.slug}`} />
        }
        let suggestionsListComponent
        const outputLength = Object.keys(filteredSuggestions).length

        if (showSuggestions && userInput) {
            if (outputLength > 0) {
                suggestionsListComponent = (
                    <ul className="suggestions">
                        {filteredSuggestions.map((item, index) => {
                            let className

                            if (index === activeSuggestion) {
                                className = "suggestion-active"
                            }

                            const selectedCountry = {
                                name: item.name,
                                slug: item.slug,
                                flag: item.flag
                            }
                            return (
                                <li
                                    className={className}
                                    key={item.slug}
                                    onClick={(e) => this.handleClick(e, selectedCountry)}>
                                    <img alt='flag' src={`https://openpassport.co/static/${item.flag}`} width="24px" style={{ marginRight: "8px" }} />
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
                    ref={(input) => { this.sourceInput = input }}
                    type="text"
                    onChange={onChange}
                    onKeyDown={(e) => this.handleKeyDown(e)}
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