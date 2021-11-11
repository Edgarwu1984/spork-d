import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
// REACT REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUser } from 'redux/actions/adminActions';
// COMPONENTS
import Layout from 'components/Layout';
import Breadcrumb from 'components/Breadcrumb';
import Loader from 'components/Loader';
import AlertMessage from 'components/AlertMessage';

function UserEditPage({ match, history }) {
  const userId = match.params.id;
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isActivated, setIsActivated] = useState(true);

  // REDUX
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdate = useSelector(state => state.userUpdate);
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = userUpdate;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/404');
    } else {
      if (updateSuccess) {
        history.push('/dashboard/users');
        toast.success('User updated.');
      }

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
    userInfo,
    userInfo.isAdmin,
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
              {updateError && (
                <AlertMessage message={updateError} variant='danger' />
              )}
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
                  className={
                    updateLoading || !email || !username
                      ? 'btn btn-primary btn-block btn-disabled'
                      : 'btn btn-primary btn-block'
                  }
                  type='submit'
                  value='Update'
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
