import React from 'react';
import PropTypes from 'prop-types';

function MainSectionTitle({ title }) {
  return <h3 className='main-section-title'>{title}</h3>;
}

MainSectionTitle.propTypes = {
  bgImage: PropTypes.string,
};

MainSectionTitle.defaultProps = {
  title: 'title',
};

export default MainSectionTitle;
