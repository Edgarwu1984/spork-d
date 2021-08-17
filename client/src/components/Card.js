import React from 'react';
import PropTypes from 'prop-types';
import Rating from './Rating';
import { Link } from 'react-router-dom';

function Card({ url, image, title, address, category, value, text }) {
  return (
    <Link to={url} className='card'>
      <div className='card__image-container'>
        <div className='card-rating'>{value}</div>
        <img className='card-image' src={image} alt={title} />
      </div>
      <div className='card__container'>
        <div className='card__body'>
          <div className='card__body-title'>{title}</div>
          <div className='card__body-address'>{address}</div>
          <div className='card__body-category'>{category}</div>
        </div>
        <Rating value={value} text={text} />
      </div>
    </Link>
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
