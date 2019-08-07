const ErrorMessage = ({hasError, message, children}) => {
    return hasError ? message : children;
}

export default ErrorMessage;
