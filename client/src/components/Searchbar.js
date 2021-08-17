import React from 'react';
import { FiSearch } from 'react-icons/fi';

function Searchbar() {
  return (
    <div className='searchbar'>
      <input type='text' name='' id='' className='searchbar-input' />
      <button className='searchbar-btn'>
        <FiSearch />
      </button>
    </div>
  );
}

export default Searchbar;
