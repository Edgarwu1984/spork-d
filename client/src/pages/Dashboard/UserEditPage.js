import React, { useState, useEffect } from 'react';
// REACT REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from 'redux/actions/adminActions';
// COMPONENTS
import Layout from 'components/Layout';
import Breadcrumb from 'components/Breadcrumb';
import Loader from 'components/Loader';
import Button from 'components/Button';

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

  useEffect(() => {
    if (user.id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setUsername(user.username);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
      setIsActivated(user.isActivated);
    }
  }, [
    dispatch,
    user.email,
    user.id,
    user.isActivated,
    user.isAdmin,
    user.username,
    userId,
  ]);

  const submitHandler = e => {
    e.preventDefault();
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
        <div className='form-wrap'>
          <form onSubmit={submitHandler}>
            {loading && <Loader />}
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
                value={isAdmin}
                onChange={e => setIsAdmin(e.target.checked)}
              />
            </div>
            <div className='form-group'>
              <label className='form-label'>isActivated</label>
              <input
                className='form-control'
                type='checkbox'
                value={isActivated}
                onChange={e => setIsActivated(e.target.checked)}
              />
            </div>

            <div className='form-group'>
              <input
                className='btn btn-primary btn-block'
                type='submit'
                value='Update'
              />
            </div>
            <div className='form-group'>
              <Button
                className='btn btn-danger'
                type='danger-outline btn-block'
                text='Delete'
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default UserEditPage;
