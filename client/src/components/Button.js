import React from 'react';
import PropTypes from 'prop-types';

function Button({ iconLeft, iconRight, text, styles, disabled, onClick }) {
  return (
    <button
      className={disabled ? `btn ${styles} btn-disabled` : `btn ${styles}`}
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
  styles: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  text: 'Button',
  disabled: false,
};

export default Button;
