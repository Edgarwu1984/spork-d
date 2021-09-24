import React from 'react';

const SkeletonCard = () => {
  return (
    <div className='skeleton-card'>
      <div className='skeleton-card__image' />
      <div className='skeleton-card__body'>
        <div className='title' />
        <div className='address' />
        <div className='category' />
        <div className='price' />
        <div className='rating' />
      </div>
    </div>
  );
};

export default SkeletonCard;
