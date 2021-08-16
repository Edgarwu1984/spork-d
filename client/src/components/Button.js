import React from 'react';
import PropTypes from 'prop-types';

function Button({ iconLeft, iconRight, text, styles, onClick }) {
  return (
    <button className={`btn ${styles}`} onClick={onClick}>
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
};

Button.defaultProps = {
  text: 'Button',
};

export default Button;
