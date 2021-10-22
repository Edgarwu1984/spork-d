import React from 'react';
import PropTypes from 'prop-types';

const AlertMessage = ({ message, variant }) => {
  return <div className={`alert-message ${variant}`}>{message}</div>;
};

AlertMessage.propTypes = {
  message: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};

AlertMessage.defaultProps = {
  message: 'This is Alert Message Box',
  variant: 'info',
};

export default AlertMessage;
