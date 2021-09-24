import React, { useState } from 'react';
import { useHistory } from 'react-router';
// REACT-ICONS
import { FiSearch } from 'react-icons/fi';
import { FaTimes } from 'react-icons/fa';

function Searchbar({ show, onClose }) {
  const history = useHistory();
  const [queryText, setQueryText] = useState('');

  const searchHandler = e => {
    e.preventDefault();
    if (queryText.trim()) {
      history.push(`/restaurants?search=${queryText}`);
    }
    onClose();
    setQueryText('');
  };

  return (
    <div className={!show ? 'search' : 'search show'}>
      <button className='search-close__btn' onClick={onClose}>
        <FaTimes />
      </button>
      <form className='search-form' onSubmit={searchHandler}>
        <h1>Search</h1>
        <div className='searchbar'>
          <input
            type='text'
            className='searchbar__input'
            value={queryText}
            onChange={e => setQueryText(e.target.value)}
          />
          <button className='searchbar__btn' type='submit'>
            <FiSearch />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Searchbar;
