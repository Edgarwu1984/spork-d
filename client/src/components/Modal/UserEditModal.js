import React, { useEffect, useState } from 'react';
import Modal from '.';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateUserProfile } from '../../redux/actions/userActions';
import Loader from '../Loader';

const EditWrapper = styled.div`
  .user__photo {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
    img {
      border-radius: 50%;
      height: 5rem;
      width: 5rem;
      margin-bottom: 2rem;
    }
    span {
      text-transform: capitalize;
      font-weight: 600;
      margin-left: 1rem;
    }
  }
`;

function UserEditModal({ show, onClick, onClose, data }) {
  // UPDATE PROFILE FORM
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [photo, setPhoto] = useState('');
  // REDUX
  const dispatch = useDispatch();
  const userProfileUpdate = useSelector(state => state.userProfileUpdate);
  const { loading, error, success } = userProfileUpdate;

  useEffect(() => {
    if (success) {
      toast.success('User profile updated, please login again.');
    } else if (error) {
      toast.error(error);
    }
    if (data) {
      setUsername(data.username);
      setEmail(data.email);
      setPhoto(data.photo);
    }
  }, [data, dispatch, error, success]);

  const submitHandler = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Password does not match.');
    } else {
      dispatch(
        updateUserProfile({
          username: username,
          email: email,
          password: password,
          photo: photo,
        })
      );
    }
  };

  return (
    <Modal show={show} onClick={onClick} onClose={onClose} title='Edit Profile'>
      {data && (
        <EditWrapper>
          <form onSubmit={submitHandler}>
            {loading && <Loader />}
            <div className='user__photo'>
              <img src={data.photo} alt={data.username} />
              <input
                className='form-control'
                type='text'
                defaultValue={data.photo}
                onChange={e => setPhoto(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label className='form-label'>Username</label>
              <input
                className='form-control'
                type='text'
                defaultValue={data.username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label className='form-label'>Email</label>
              <input
                className='form-control'
                type='text'
                defaultValue={data.email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label className='form-label'>Password</label>
              <input
                className='form-control'
                type='password'
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label className='form-label'>Confirm Password</label>
              <input
                className='form-control'
                type='password'
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className='from-group'>
              <input className='btn btn-primary' type='submit' value='Update' />
            </div>
          </form>
        </EditWrapper>
      )}
    </Modal>
  );
}

export default UserEditModal;
