import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { FaTimes } from 'react-icons/fa';

function Searchbar({ show, onClose }) {
  const searchHandler = () => console.log('search');

  return (
    <div className={!show ? 'search' : 'search show'}>
      <button className='search-close__btn' onClick={onClose}>
        <FaTimes />
      </button>
      <h1>Search</h1>
      <div className='searchbar'>
        <input type='text' className='searchbar__input' />
        <button className='searchbar__btn' onClick={searchHandler}>
          <FiSearch />
        </button>
      </div>
    </div>
  );
}

export default Searchbar;
