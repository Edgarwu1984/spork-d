import React from 'react';
import PropTypes from 'prop-types';

function SubSectionTitle({ title }) {
  return <h3 className='sub-section-title'>{title}</h3>;
}

SubSectionTitle.propTypes = {
  bgImage: PropTypes.string,
};

SubSectionTitle.defaultProps = {
  title: 'title',
};

export default SubSectionTitle;
