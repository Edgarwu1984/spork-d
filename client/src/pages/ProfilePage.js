import React from 'react';
import { Link } from 'react-router-dom';

// REACT REDUX
import { useSelector } from 'react-redux';

// COMPONENTS
import Layout from '../components/Layout';
import SubSectionTitle from '../components/SubSectionTitle';
import Button from '../components/Button';
import Loader from '../components/Loader';

function ProfilePage() {
  const getTime = date => {
    return new Date(date * 1000).toLocaleTimeString();
  };

  // REDUX
  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  return (
    <Layout>
      <div className='container'>
        <ul className='breadcrumb'>
          <li className='breadcrumb__item'>
            <Link to='/'>Home</Link>
          </li>
          <li className='breadcrumb__item'>
            <Link to='/profile'>Profile</Link>
          </li>
        </ul>
        {loading ? (
          <Loader />
        ) : error ? (
          <div>{error}</div>
        ) : (
          <>
            <div className='profile__banner'>
              <div className='profile__banner-wrap'>
                <div className='text-info'>
                  <h2 className='title'>
                    G'day, <span>{userInfo.userData.username}</span>
                  </h2>
                  <div className='date'>
                    Last Login:{' '}
                    <span>{getTime(userInfo.user.lastLoginAt)}</span>
                  </div>
                  <Button text='Edit Profile' styles='btn-primary' />
                </div>
                <img
                  className='image-info'
                  src={userInfo.userData.photo}
                  alt='user_photo'
                />
              </div>
            </div>
            <SubSectionTitle title='My Reviews' />
          </>
        )}
      </div>
    </Layout>
  );
}

export default ProfilePage;
