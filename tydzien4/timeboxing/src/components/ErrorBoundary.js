import React from 'react';
import ErrorMessage from './ErrorMessage';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
    state = {
        hasError: false
    }

    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }

    componentDidCatch(error, info) {
      // You can also log the error to an error reporting service
      console.log("Błąd!", error, info);
    }

    render() {
        const { message, children } = this.props;

        return (
            <ErrorMessage
                hasError={this.state.hasError}
                message={message}
                children={children}
            />
        )
    }
}

ErrorBoundary.propTypes = {
  message: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired
}

export default ErrorBoundary;
