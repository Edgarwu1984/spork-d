import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// REACT REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, getUserReviews } from 'redux/actions/userActions';
// COMPONENTS
import Layout from 'components/Layout';
import SubSectionTitle from 'components/SubSectionTitle';
import Loader from 'components/Loader';
import Breadcrumb from 'components/Breadcrumb';
import AlertMessage from 'components/AlertMessage';
import { timeFormatter } from 'utils/timeFormatter';

function ProfilePage({ match, history }) {
  // REDUX
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const userProfile = useSelector(state => state.userProfile);
  const { loading, error, user } = userProfile;
  const userReviews = useSelector(state => state.userReviews);
  const { loading: reviewsloading, error: reviewsError, reviews } = userReviews;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch(getUserReviews());
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
                      src={user ? user.photo : `/images/user_picture.jpg`}
                      alt='user_photo'
                    />
                    <Link to='/profile/edit' className='user__info-edit'>
                      Edit Profile
                    </Link>
                  </div>
                </div>
              </div>
              <SubSectionTitle title='My Reviews' />
              <div>
                {reviewsloading ? (
                  <Loader />
                ) : reviewsError ? (
                  <AlertMessage variant='danger' message={reviewsError} />
                ) : (
                  reviews &&
                  reviews.map(review => (
                    <div key={review.id} className='user__review'>
                      <div className='user__review-rating'>
                        {review.rating.toFixed(1)}
                      </div>
                      <div className='user__review-restaurant__img'>
                        <img
                          src={review.restaurantCoverImage}
                          alt={review.restaurantName}
                        />
                      </div>
                      <div className='user__review-restaurant__info'>
                        <div className='title__info'>
                          <h4 className='title__info-title'>
                            {review.restaurantName}
                          </h4>
                          <small className='title__info-date'>
                            {timeFormatter(review.createdAt)}
                          </small>
                        </div>
                        <p>{review.comment}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )
        )}
      </div>
    </Layout>
  );
}

export default ProfilePage;
