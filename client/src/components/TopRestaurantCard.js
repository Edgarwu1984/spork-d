import React from 'react';
import { Link } from 'react-router-dom';

function TopRestaurantCard({ url, bgImage, category }) {
  return (
    <Link
      className='top__list-item'
      to={url}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <h3 className='top-text'>Top 5</h3>
      <p className='category-text'>{category}</p>
    </Link>
  );
}

export default TopRestaurantCard;
