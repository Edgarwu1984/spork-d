import React, { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
// COMPONENTS
import Modal from './';
import Loader from '../Loader';
// REACT REDUX
import { useDispatch, useSelector } from 'react-redux';
import { createRestaurantReview } from '../../redux/actions/restaurantActions';

const ReviewWrapper = styled.div`
  .user__photo {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    img {
      border-radius: 50%;
      height: 4rem;
      width: 4rem;
    }
    span {
      text-transform: capitalize;
      font-weight: 600;
      margin-left: 1rem;
    }
  }
`;
function ReviewModal({ show, onClick, onClose, data, category, id }) {
  const [rating, setRating] = useState();
  const [comment, setComment] = useState();
  // REDUX
  const dispatch = useDispatch();
  const restaurantReviewCreate = useSelector(
    state => state.restaurantReviewCreate
  );
  const { loading, error } = restaurantReviewCreate;

  const submitHandler = e => {
    e.preventDefault();

    if (!rating || !comment) {
      toast.error('Input field can not be empty.');
    } else {
      dispatch(
        createRestaurantReview(category, id, {
          rating: Number(rating),
          comment: comment,
        })
      );
    }
  };

  return (
    <Modal
      show={show}
      onClick={onClick}
      onClose={onClose}
      title='Add Your Review'
    >
      {data && (
        <ReviewWrapper>
          <div className='user__photo'>
            <img src={data.photo} alt={data.username} />
            <span>{data.username}</span>
          </div>
          <form onSubmit={submitHandler}>
            {loading ? <Loader /> : error ? <div>{error}</div> : null}
            <div className='form-group'>
              <label className='form-label'>Rating</label>
              <input
                className='form-control'
                type='number'
                step='0.1'
                onChange={e => setRating(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label className='form-label'>Comment</label>
              <textarea
                className='form-control'
                cols='30'
                rows='10'
                onChange={e => setComment(e.target.value)}
              />
            </div>
            <div className='from-group'>
              <input className='btn btn-primary' type='submit' value='Submit' />
            </div>
          </form>
        </ReviewWrapper>
      )}
    </Modal>
  );
}

export default ReviewModal;
