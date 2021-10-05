import React, { useEffect, useState } from 'react';
// REACT REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from 'redux/actions/userActions';
// COMPONENTS
import Layout from 'components/Layout';
import SubSectionTitle from 'components/SubSectionTitle';
import Loader from 'components/Loader';
import Breadcrumb from 'components/Breadcrumb';
import UserEditModal from 'components/Modal/UserEditModal';
import Tabs from 'components/Tabs';

function DashboardPage({ match, history }) {
  // REDUX
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  //   const userProfile = useSelector(state => state.userProfile);
  //   const { loading, error, user } = userProfile;
  //   const userProfileUpdate = useSelector(state => state.userProfileUpdate);
  //   const { success } = userProfileUpdate;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login');
    } else {
      //   if (!user || user.id !== userInfo.id) {
      //     dispatch(getUserProfile());
      //   }
    }
  }, [dispatch, history, userInfo]);

  return (
    <Layout pageTitle='- Dashboard'>
      <div className='container'>
        <Breadcrumb match={match} />
        <div className='profile__banner  dashboard__banner'>
          <div className='profile__banner-wrap'>
            <div className='greeting'>
              <h2 className='title'>Admin Dashboard</h2>
            </div>
          </div>
        </div>
        <div>
          <Tabs>
            <div label='Users'>user</div>
            <div label='Restaurants'>Restaurants</div>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}

export default DashboardPage;
