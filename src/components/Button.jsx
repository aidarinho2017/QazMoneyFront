import React from "react";
import '../styles/Joke.css';

const Button = (props) => {
    return <button className="button" onClick={props.callApi}>
        Click to generate a joke.
    </button>;
}

// Export Button Component
export default Button;