import React from "react";

import EditableTimebox from "./EditableTimebox";
import TimeboxList from "./TimeboxList";
import Header from "./Header";

function AuthenticatedApp(props) {
  return (
    <>
      <Header />
      <TimeboxList />
      <EditableTimebox />
    </>
  );
}

export default AuthenticatedApp;
