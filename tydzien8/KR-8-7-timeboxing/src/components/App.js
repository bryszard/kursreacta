import React, { useState } from "react";

import ErrorBoundary from "./ErrorBoundary";
import LoginForm from "./LoginForm";
import AuthenticationContext from "../contexts/AuthenticationContext";
import AuthenticationAPI from "../api/FetchAuthenticationApi";

const AuthenticatedApp = React.lazy(() => import("./AuthenticatedApp"));

function App() {
  const [accessToken, setAccessToken] = useState();
  const [previousLoginAttemptFailed, setPreviousLoginAttemptFailed] = useState(
    false
  );

  function isUserLoggedIn() {
    return !!accessToken;
  }

  function handleLoginAttempt(credentials) {
    AuthenticationAPI.login(credentials)
      .then(({ accessToken }) => {
        setAccessToken(accessToken);
        setPreviousLoginAttemptFailed(false);
      })
      .catch(() => {
        setPreviousLoginAttemptFailed(true);
      });
  }

  function handleLogout() {
    setAccessToken(null);
    setPreviousLoginAttemptFailed(false);
  }

  return (
    <div className="App">
      <ErrorBoundary message="Coś nie działa w całej aplikacji">
        {isUserLoggedIn() ? (
          <AuthenticationContext.Provider value={{ accessToken }}>
            {
              <React.Suspense fallback={"... Loading"}>
                <AuthenticatedApp onLogout={handleLogout} />
              </React.Suspense>
            }
          </AuthenticationContext.Provider>
        ) : (
          <LoginForm
            errorMessage={
              previousLoginAttemptFailed ? "Nie udało się zalogować" : null
            }
            onLoginAttempt={handleLoginAttempt}
          />
        )}
      </ErrorBoundary>
    </div>
  );
}

export default App;
