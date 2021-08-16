import React from 'react';
import PropTypes from 'prop-types';
import Rating from './Rating';
import { Link } from 'react-router-dom';

function Card({ url, image, title, address, category, value, text }) {
  return (
    <div className='card'>
      <img className='card-image' src={image} alt={title} />
      <div className='card-body'>
        <Link className='card-body__title' to={url}>
          {title}
        </Link>
        <div className='card-body__address'>{address}</div>
        <div className='card-body__category'>{category}</div>
        <Rating value={value} text={text} />
      </div>
    </div>
  );
}

Card.propTypes = {
  url: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  address: PropTypes.string,
  category: PropTypes.string,
};

Card.defaultProps = {
  url: '#',
  image: '/images/image_placeholder.jpg',
  title: 'Card Title',
  address: 'restaurant address',
  category: 'category',
};

export default Card;
