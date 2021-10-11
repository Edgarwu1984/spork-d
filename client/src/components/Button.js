import React from 'react';
import PropTypes from 'prop-types';

function Button({ iconLeft, iconRight, text, type, disabled, onClick }) {
  return (
    <button
      className={disabled ? `btn btn-${type} btn-disabled` : `btn btn-${type}`}
      onClick={onClick}
    >
      <span className='btn-icon'>{iconLeft}</span>
      {text} <span className='btn-icon'>{iconRight}</span>
    </button>
  );
}

Button.propTypes = {
  iconLeft: PropTypes.object,
  iconRight: PropTypes.object,
  text: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  text: 'Button',
  type: 'default',
  disabled: false,
};

export default Button;
