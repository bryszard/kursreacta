import React from 'react';

const ProgressBar = (props) => {
    const width = Math.max((props.remaining / props.total) * 100, 0)

    return (
        <div className="ProgressBar">
            <div style={{ width: `${width}%` }}></div>
        </div>
    );
}

ProgressBar.propTypes = {
  remaining: function(props, propName, componentName) {
    const prop = props[propName];

    if (typeof(prop) !== 'number') {
      return new Error(`Invalid prop '${propName}': ${prop}. Has to be a number.`);
    }

    if (typeof(props.total) && props.total < prop) {
      return new Error('Given remaining time cannot be greater than total time.');
    }
  },
  total: function(props, propName, componentName) {
    const prop = props[propName];

    if (typeof(prop) !== 'number' || prop < 0) {
      return new Error(`Invalid prop '${propName}': ${prop}. Has to be a number greater than or equal to 0.`);
    }
  }
}

export default ProgressBar;
