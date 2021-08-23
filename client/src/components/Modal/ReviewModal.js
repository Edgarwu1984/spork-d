import React from 'react';
import Modal from './';
import styled from 'styled-components';

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
function ReviewModal({ show, onClick, onClose, data }) {
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
            <img src={data.userData.photo} alt={data.userData.username} />
            <span>{data.userData.username}</span>
          </div>
          <form>
            <div className='form-group'>
              <label htmlFor='name' className='form-label'>
                Rating
              </label>
              <input type='number' max={5} />
            </div>
            <div className='form-group'>
              <textarea
                className='form-control'
                placeholder='comment..'
                cols='30'
                rows='10'
              />
            </div>
            <div className='from-group'>
              <input className='btn btn-primary' type='button' value='Submit' />
            </div>
          </form>
        </ReviewWrapper>
      )}
    </Modal>
  );
}

export default ReviewModal;
