import React from "react";
import ReactDOM from "react-dom";
import UserGreeting from "./UserGreeting";

function Header({ onLogout }) {
  return (
    <Portal>
      <header className="header">
        <UserGreeting />
        <a onClick={onLogout} className="header__logout-link" href="#">
          Wyloguj się
        </a>
      </header>
    </Portal>
  );
}

class Portal extends React.Component {
  constructor(props) {
    super(props);

    this.container = document.createElement("div");
  }
  componentDidMount() {
    const firstChild = document.body.firstChild;

    document.body.insertBefore(this.container, firstChild);
  }
  componentWillUnmount() {
    document.body.removeChild(this.container);
  }
  render() {
    return ReactDOM.createPortal(this.props.children, this.container);
  }
}

export default Header;
