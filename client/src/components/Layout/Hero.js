import React from 'react';
import PropTypes from 'prop-types';

function Hero({ bgImage, height, children }) {
  return (
    <div
      className='hero'
      style={{ backgroundImage: `url(${bgImage})`, height: `${height}` }}
    >
      <div className='hero-wrapper'>{children}</div>
    </div>
  );
}

Hero.defaultProps = {
  bgImage: '/images/hero-image-1.jpg',
  height: '500px',
};

Hero.propTypes = {
  bgImage: PropTypes.string,
  height: PropTypes.string,
};

export default Hero;
