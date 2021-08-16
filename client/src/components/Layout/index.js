import React from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';
import Navbar from './Navbar';

function Layout({ pageTitle, children }) {
  document.title = `Spork's Restaurant ${pageTitle}`;
  return (
    <>
      <Navbar />
      <div className='content-wrapper'>{children}</div>
      <Footer />
    </>
  );
}

Layout.propTypes = {
  pageTitle: PropTypes.string,
};

Layout.defaultProps = {
  pageTitle: '',
};

export default Layout;
