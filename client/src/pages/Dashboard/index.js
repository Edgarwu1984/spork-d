import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// REACT REDUX
import { useDispatch, useSelector } from 'react-redux';
// COMPONENTS
import Layout from 'components/Layout';
import Breadcrumb from 'components/Breadcrumb';
// REACT ICONS
import { FaUserFriends } from 'react-icons/fa';
import { MdRestaurant } from 'react-icons/md';

function DashboardPage({ match, history }) {
  // REDUX
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login');
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
        <div className='option__group'>
          <Link className='option' to='/dashboard/users'>
            <FaUserFriends /> Users
          </Link>
          <Link className='option' to='/dashboard/restaurants'>
            <MdRestaurant /> Restaurants
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default DashboardPage;
