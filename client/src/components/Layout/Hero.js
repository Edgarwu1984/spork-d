import React from 'react';
import PropTypes from 'prop-types';

function Hero({ bgImage, children }) {
  return (
    <div className='hero' style={{ backgroundImage: `url(${bgImage})` }}>
      <div className='hero-wrapper'>{children}</div>
    </div>
  );
}

Hero.defaultProps = {
  bgImage: '/images/hero-image-1.jpg',
};

Hero.propTypes = {
  bgImage: PropTypes.string,
};

export default Hero;
