import React, { useEffect, useState } from 'react';
// REACT REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from 'redux/actions/userActions';
// COMPONENTS
import Layout from 'components/Layout';
import SubSectionTitle from 'components/SubSectionTitle';
import Loader from 'components/Loader';
import Breadcrumb from 'components/Breadcrumb';

function ProfilePage({ match, history }) {
  // REDUX
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const userProfile = useSelector(state => state.userProfile);
  const { loading, error, user } = userProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || user.id !== userInfo.id) {
        dispatch(getUserProfile());
      }
    }
  }, [dispatch, history, user, userInfo]);

  return (
    <Layout pageTitle='- Profile'>
      <div className='container'>
        <Breadcrumb match={match} />
        {loading ? (
          <Loader />
        ) : error ? (
          <div>{error}</div>
        ) : (
          user && (
            <>
              <div className='profile__banner'>
                <div className='profile__banner-wrap'>
                  <div className='greeting'>
                    <h2 className='title'>
                      G'day, <span>{user.username}</span>
                    </h2>
                  </div>
                  <div className='user__info'>
                    <img
                      className='user__info-image'
                      src={user.photo}
                      alt='user_photo'
                    />
                    <div
                      className='user__info-edit'
                      onClick={() => history.push(`/profile/edit`)}
                    >
                      Edit Profile
                    </div>
                  </div>
                </div>
              </div>
              <SubSectionTitle title='My Reviews' />
            </>
          )
        )}
      </div>
    </Layout>
  );
}

export default ProfilePage;
