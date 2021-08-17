import React from 'react';
import { Link } from 'react-router-dom';

function Breadcrumb({ currentPage }) {
  return (
    <ul className='breadcrumb'>
      <li className='breadcrumb__item'>
        <Link to='/'>Home</Link>
      </li>

      <li className='breadcrumb__item'>
        <Link to='/restaurants'>{currentPage}</Link>
      </li>
    </ul>
  );
}

export default Breadcrumb;
