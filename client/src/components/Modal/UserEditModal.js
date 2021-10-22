import React, { useEffect, useState } from 'react';
import Modal from '.';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateUserProfile } from 'redux/actions/userActions';
import Loader from '../Loader';
import AlertMessage from 'components/AlertMessage';

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
  // const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [photo, setPhoto] = useState('');
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    photo: '',
  });

  const [fileName, setFileName] = useState('Choose File');

  const { username, email, password, photo } = user;
  // REDUX
  const dispatch = useDispatch();
  const userProfileUpdate = useSelector(state => state.userProfileUpdate);
  const { loading, error, success } = userProfileUpdate;

  useEffect(() => {
    if (success) {
      toast.success('User profile updated, please login again.');
    }
    // if (!data.id) {
    //   setUser({
    //     username: data.username,
    //     email: data.email,
    //     photo: data.photo,
    //   });
    //   //   // setUsername(data.username);
    //   //   // setEmail(data.email);
    //   //   // setPhoto(data.photo);
    // }
  }, [data, dispatch, error, success]);

  const handleTextChange = e =>
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

  const handleFileChange = e => {
    const file = e.target.files[0];
    setUser({
      ...user,
      photo: file,
    });
    setFileName(e.target.files[0].name);
  };

  const submitHandler = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Password does not match.');
    } else {
      dispatch(updateUserProfile(user));
    }
    // console.log({ id: data.id, ...user });
  };

  // console.log(user);

  return (
    <Modal show={show} onClick={onClick} onClose={onClose} title='Edit Profile'>
      {data && (
        <EditWrapper>
          <form onSubmit={submitHandler}>
            {loading && <Loader />}
            {error && <AlertMessage message={error} variant='danger' />}
            <div className='user__photo'>
              <img src={data.photo} alt={data.username} />
              <input
                className='form-control'
                type='file'
                onChange={handleFileChange}
              />
            </div>
            <div className='form-group'>
              <label className='form-label'>Username</label>
              <input
                className='form-control'
                type='text'
                name='username'
                defaultValue={username}
                onChange={handleTextChange}
              />
            </div>
            <div className='form-group'>
              <label className='form-label'>Email</label>
              <input
                className='form-control'
                type='text'
                name='email'
                defaultValue={email}
                onChange={handleTextChange}
              />
            </div>
            <div className='form-group'>
              <label className='form-label'>Password</label>
              <input
                className='form-control'
                type='password'
                name='password'
                onChange={handleTextChange}
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
