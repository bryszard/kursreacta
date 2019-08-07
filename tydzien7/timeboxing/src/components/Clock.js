import React from 'react';
import PropTypes from 'prop-types';

import { extractTimeFromMilliseconds } from '../lib/time.js';

const Clock = ({ remainingTime, text }) => {
    const limitRemainingTime = (remainingTime) => {
        const maxTime = (24 * 60 * 60 * 1000) - 1

        return Math.min(Math.max(remainingTime, 0), maxTime);
    }

    const remaining = limitRemainingTime(remainingTime)
    const { hours, minutes, seconds, milliseconds } = extractTimeFromMilliseconds(remaining);

    return (
        <h2>{ `${text}${hours}:${minutes}:${seconds}:${milliseconds}` }</h2>
    )
}

// function NonNegativeNumberType(props, propName, componentName) {
//   if (props[propName] < 0) {
//     return new Error(`Invalid group '${propName}' issued to component '${componentName}'. It has to be greater or equal to 0.`)
//   }
// }

Clock.defaultProps = {
  text: ''
}

Clock.propTypes = {
  remainingTime: PropTypes.number.isRequired,
  text: PropTypes.string
}

export default Clock;
