import React from 'react';

function Hero({ children }) {
  return (
    <div className='hero'>
      <div className='hero-wrapper'>{children}</div>
    </div>
  );
}

export default Hero;
