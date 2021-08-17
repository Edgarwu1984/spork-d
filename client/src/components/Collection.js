import React from 'react';
import PropTypes from 'prop-types';

function Collection({ children, bgImage }) {
  return (
    <section
      className='collection'
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className='collection-container'>{children}</div>
    </section>
  );
}

Collection.propTypes = {
  bgImage: PropTypes.string,
};

export default Collection;
