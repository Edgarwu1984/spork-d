import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// REACT REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, updateUserProfile } from 'redux/actions/userActions';
// COMPONENTS
import Layout from 'components/Layout';
import Loader from 'components/Loader';
import Breadcrumb from 'components/Breadcrumb';

function EditProfilePage({ match, history }) {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    photo: '',
  });

  const { username, email, password, confirmPassword, photo } = data;

  // REDUX
  const userProfile = useSelector(state => state.userProfile);
  const { user } = userProfile;
  const dispatch = useDispatch();
  const userProfileUpdate = useSelector(state => state.userProfileUpdate);
  const { loading, error, success } = userProfileUpdate;

  useEffect(() => {
    if (!user.id) {
      dispatch(getUserProfile());
    } else {
      setData({
        username: user.username,
        email: user.email,
        photo: user.photo,
      });
    }

    if (error) {
      toast.error(error);
    } else if (success) {
      toast.success('User updated.');
      history.push('/profile');
    }
  }, [
    dispatch,
    history,
    error,
    success,
    user.email,
    user.password,
    user.username,
    user.photo,
    user.id,
  ]);

  const handleFileChange = e => {
    const file = e.target.files[0];
    setData({
      ...data,
      photo: file,
    });
  };

  const handleTextChange = e =>
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

  const submitHandler = e => {
    e.preventDefault();
    if (confirmPassword !== password) {
      toast.error('Password does not match.');
    } else {
      const updatedUser = {
        id: user.id,
        username: username,
        email: email,
        password: password,
        photo: photo,
      };
      dispatch(updateUserProfile(updatedUser));
    }
  };

  return (
    <Layout pageTitle='- Profile'>
      <div className='container'>
        <Breadcrumb match={match} />
      </div>
      <div className='container'>
        <section>
          <div className='form__wrapper'>
            <form onSubmit={submitHandler}>
              {loading && <Loader />}
              <div className='form-group'>
                <img
                  className='user-image'
                  src={user.photo}
                  alt={user.username}
                />
                <input
                  className='form-control'
                  type='file'
                  // name={fileName}
                  onChange={handleFileChange}
                />
                <small>Image only support "png, jpg, jpeg, gif" format.</small>
              </div>
              <div className='form-group'>
                <label className='form-label'>Username</label>
                <input
                  className='form-control'
                  type='text'
                  name='username'
                  value={username}
                  onChange={handleTextChange}
                />
              </div>
              <div className='form-group'>
                <label className='form-label'>Email</label>
                <input
                  className='form-control'
                  type='text'
                  name='email'
                  value={email}
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
                  name='confirmPassword'
                  onChange={handleTextChange}
                />
              </div>
              <div className='from-group'>
                <input
                  className={
                    loading ||
                    !username ||
                    !email ||
                    !password ||
                    !confirmPassword
                      ? 'btn btn-primary btn-block btn-disabled'
                      : 'btn btn-primary btn-block'
                  }
                  type='submit'
                  value={loading ? 'Updating...' : 'Update'}
                />
              </div>
            </form>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default EditProfilePage;
