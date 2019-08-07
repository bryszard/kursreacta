import React from "react";
import jwt from "jsonwebtoken";

import AuthenticationAPI from "../api/FetchAuthenticationApi";
import AutenticationContext from "../contexts/AuthenticationContext";

import ErrorBoundary from "./ErrorBoundary";
import LoginForm from "./LoginForm";
import AuthenticatedApp from "./AuthenticatedApp";

class App extends React.Component {
    state = {
        accessToken: null,
        previousLoginAttemptFailed: false
    }

    isUserLoggedIn() {
        return !!this.state.accessToken;
    }

    getUserEmail() {
        const decodedToken = jwt.decode(this.state.accessToken);
        return decodedToken.email;
    }

    handleLoginAttempt = (credentials) => {
        AuthenticationAPI.login(credentials)
            .then( ({ accessToken }) => {
                this.setState({
                    accessToken,
                    previousLoginAttemptFailed: false
                })
            }).catch( () => {
                this.setState({
                    previousLoginAttemptFailed: true
                })
            })
    }

    handleLogout = () => {
        this.setState({
            accessToken: null,
            previousLoginAttemptFailed: false
        })
    }

    render() {
        return (
            <div className="App">
                <AutenticationContext.Provider
                    value={ {
                        accessToken: this.state.accessToken,
                        onLogout: this.handleLogout,
                        onLoginAttempt: this.handleLoginAttempt
                    } }
                >
                    <ErrorBoundary message="Coś nie działa w całej aplikacji">
                        {
                            this.isUserLoggedIn() ?
                                <AuthenticatedApp /> :
                                <LoginForm
                                    errorMessage={this.state.previousLoginAttemptFailed ? "Nie udało się zalogować" : null}
                                    onLoginAttempt={this.handleLoginAttempt}
                                />
                        }

                    </ErrorBoundary>
                </AutenticationContext.Provider>
            </div>
        )
    }
}

export default App
