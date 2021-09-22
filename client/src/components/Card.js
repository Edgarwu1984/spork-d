import React from 'react';
import PropTypes from 'prop-types';
import Rating from './Rating';
import { Link } from 'react-router-dom';

function Card({ url, image, title, address, category, price, value, text }) {
  return (
    <Link to={url} className='card'>
      <div className='card__image-container'>
        <div className='card-rating'>{value.toFixed(1)}</div>
        <img className='card-image' src={image} alt={title} />
      </div>
      <div className='card__container'>
        <div className='card__body'>
          <div className='card__body-title'>{title}</div>
          <div className='card__body-address'>{address}</div>
          <div className='card__body-category'>{category}</div>
          <div className='card__body-price'>
            {`$${price.toFixed(2)} for two`}
            {/* {price >= 90
              ? '$$$$'
              : price >= 70
              ? '$$$'
              : price <= 40
              ? '$$'
              : '$'} */}
          </div>
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
  price: PropTypes.number,
};

Card.defaultProps = {
  url: '#',
  image: '/images/image_placeholder.jpg',
  title: 'Card Title',
  address: 'restaurant address',
  category: 'category',
  price: 10,
};

export default Card;
