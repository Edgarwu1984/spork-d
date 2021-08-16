import React from 'react';

function Footer() {
  const getCurrentYear = new Date().getFullYear();
  return (
    <footer>
      <div className='container'>
        <div className='footer-content'>
          &copy; {getCurrentYear} Spork's Restaurant Review.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
