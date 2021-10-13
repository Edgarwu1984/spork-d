import React, { useState, useEffect } from 'react';
// REACT REDUX
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteUser,
  getUserDetails,
  updateUser,
} from 'redux/actions/adminActions';
// COMPONENTS
import Layout from 'components/Layout';
import Breadcrumb from 'components/Breadcrumb';
import Loader from 'components/Loader';
import Button from 'components/Button';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function UserEditPage({ match, history }) {
  const userId = match.params.id;
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState();
  const [isActivated, setIsActivated] = useState();

  // REDUX
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdate = useSelector(state => state.userUpdate);
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = userUpdate;
  const userDelete = useSelector(state => state.userDelete);
  const {
    loading: deleteLoading,
    error: deleteError,
    success: deleteSuccess,
  } = userDelete;

  useEffect(() => {
    if (updateSuccess) {
      history.push('/dashboard/users');
      toast.success('User updated.');
    } else if (deleteSuccess) {
      history.push('/dashboard/users');
      toast.success('User deleted.');
    } else {
      if (user.id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setUsername(user.username);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
        setIsActivated(user.isActivated);
      }
    }
  }, [
    dispatch,
    history,
    user.email,
    user.id,
    user.isActivated,
    user.isAdmin,
    user.username,
    userId,
    updateSuccess,
    deleteSuccess,
  ]);

  const updateHandler = e => {
    e.preventDefault();
    if (!username || !email) {
      toast.error('Input filed can not be empty.');
    } else {
      dispatch(
        updateUser({ id: userId, username, email, isAdmin, isActivated })
      );
    }
  };

  const deleteHandler = id => {
    if (window.confirm('Are you sure?')) {
      if (user.id === id) {
        dispatch(deleteUser(id));
      }
    }
  };

  return (
    <Layout pageTitle='- Dashboard'>
      <div className='container'>
        <Breadcrumb match={match} />
        <div className='profile__banner  dashboard__banner'>
          <div className='profile__banner-wrap'>
            <div className='greeting'>
              <h2 className='title'>User Edit</h2>
            </div>
          </div>
        </div>
        <Link className='back__btn' to='/dashboard/users'>
          {'<'} Back
        </Link>
        {loading ? (
          <Loader />
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div className='form-wrap'>
            <form onSubmit={updateHandler}>
              {updateLoading && <Loader />}
              {updateError && <div>{updateError}</div>}
              <div className='form-group'>
                <label className='form-label'>Username</label>
                <input
                  className='form-control'
                  type='text'
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label className='form-label'>Email</label>
                <input
                  className='form-control'
                  type='text'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label className='form-label'>isAdmin</label>
                <input
                  className='form-control'
                  type='checkbox'
                  checked={isAdmin}
                  onChange={e => setIsAdmin(e.target.checked)}
                />
              </div>
              <div className='form-group'>
                <label className='form-label'>isActivated</label>
                <input
                  className='form-control'
                  type='checkbox'
                  checked={isActivated}
                  onChange={e => setIsActivated(e.target.checked)}
                />
              </div>

              <div className='form-group'>
                <input
                  className='btn btn-primary btn-block disabled'
                  type='submit'
                  value='Update'
                />
              </div>
              <div className='form-group'>
                <Button
                  className='btn btn-danger'
                  type='danger-outline btn-block'
                  text='Delete'
                  onClick={() => deleteHandler(userId)}
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default UserEditPage;
