import React from "react";
import jwt from "jsonwebtoken";

import AutenticationContext from "../contexts/AuthenticationContext";

function UserGreeting(props) {
  return (
    <AutenticationContext.Consumer>
      {
        ({ accessToken }) => `Witaj ${getUserEmail(accessToken)}`
      }
    </AutenticationContext.Consumer>
  );
}

export default UserGreeting;

function getUserEmail(accessToken) {
  const decodedToken = jwt.decode(accessToken);
  return decodedToken.email;
}
