import React, { useEffect, useState } from 'react';
// REACT REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../redux/actions/userActions';
// COMPONENTS
import Layout from '../components/Layout';
import SubSectionTitle from '../components/SubSectionTitle';
import Loader from '../components/Loader';
import Breadcrumb from '../components/Breadcrumb';
import UserEditModal from '../components/Modal/UserEditModal';

function ProfilePage({ match, history }) {
  // MODAL HANDLER
  const [showEdit, setShowEdit] = useState(false);
  const showEditHandler = () => setShowEdit(!showEdit);

  // REDUX
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const userProfile = useSelector(state => state.userProfile);
  const { loading, error, user } = userProfile;
  const userProfileUpdate = useSelector(state => state.userProfileUpdate);
  const { success } = userProfileUpdate;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || user.id !== userInfo.id) {
        dispatch(getUserProfile());
      }
    }
    if (success) {
      setShowEdit(false);
    }
  }, [dispatch, history, success, user, userInfo]);

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
              <UserEditModal
                show={showEdit}
                onClose={() => setShowEdit(false)}
                data={user}
              />
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
                    <div className='user__info-edit' onClick={showEditHandler}>
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
