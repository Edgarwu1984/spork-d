import React, { useEffect, useState } from 'react';
// REACT REDUX
import { useDispatch, useSelector } from 'react-redux';
import {
  getRestaurantDetails,
  listRestaurantReviews,
} from 'redux/actions/restaurantActions';
// COMPONENTS
import Layout from 'components/Layout';
import SubSectionTitle from 'components/SubSectionTitle';
import Rating from 'components/Rating';
import Button from 'components/Button';
import Loader from 'components/Loader';
import ReviewModal from 'components/Modal/ReviewModal';
import MenuModal from 'components/Modal/MenuModal';
import MapModal from 'components/Modal/MapModal';
import Breadcrumb from 'components/Breadcrumb';
// UTILITIES
import { timeFormatter } from 'utils/timeFormatter';
// REACT-ICONS
import { BiRestaurant, BiTime } from 'react-icons/bi';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { FiPhone } from 'react-icons/fi';

function RestaurantPage({ match, history }) {
  // RESTAURANT ID
  const restaurantId = match.params.id;
  const restaurantCategory = match.params.category;

  // MODAL HANDLER
  const [showReview, setShowReview] = useState(false);
  const showReviewHandler = () => setShowReview(!showReview);
  const [showMenu, setShowMenu] = useState(false);
  const showMenuHandler = () => setShowMenu(!showMenu);
  const [showMapMenu, setShowMapMenu] = useState(false);
  const showMapMenuHandler = () => setShowMapMenu(!showMapMenu);

  // REDUX
  const dispatch = useDispatch();
  const restaurantDetails = useSelector(state => state.restaurantDetails);
  const {
    loading: restaurantLoading,
    error: restaurantError,
    restaurant,
  } = restaurantDetails;

  const restaurantReviews = useSelector(state => state.restaurantReviews);
  const {
    loading: reviewsLoading,
    error: reviewsError,
    reviews,
  } = restaurantReviews;

  const userLogin = useSelector(state => state.userLogin);
  const {
    loading: userInfoLoading,
    error: userInfoError,
    userInfo,
  } = userLogin;

  const restaurantReviewCreate = useSelector(
    state => state.restaurantReviewCreate
  );
  const { success } = restaurantReviewCreate;

  useEffect(() => {
    if (success || restaurantId || restaurantCategory) {
      setShowReview(false);
      dispatch(getRestaurantDetails(restaurantCategory, restaurantId));
      dispatch(listRestaurantReviews(restaurantCategory, restaurantId));
    }
  }, [dispatch, restaurantCategory, restaurantId, success]);

  const hasReviewed = reviews?.some(review => review.user?.id === userInfo?.id);

  return (
    <Layout>
      {restaurantLoading ? (
        <Loader />
      ) : restaurantError ? (
        <div>{restaurantError}</div>
      ) : (
        restaurant && (
          <div className='container'>
            <div className='container'>
              <Breadcrumb match={match} />
            </div>
            <div className='restaurant__card'>
              <img
                className='restaurant__card-image'
                src={restaurant.coverImage}
                alt={restaurant.name}
              />
              <div className='restaurant__card-content'>
                <div className='restaurant__rating'>
                  {restaurant.rating?.toFixed(1)}
                </div>
                <ul className='restaurant__card-list'>
                  <li>
                    <h3>{restaurant.name}</h3>
                  </li>
                  <li>
                    <Rating
                      value={restaurant.rating}
                      text={restaurant.numReviews}
                    />
                  </li>
                  <li>
                    <BiRestaurant className='list__icon' />
                    {restaurant.category}
                  </li>
                  <li>
                    <HiOutlineLocationMarker className='list__icon' />
                    {restaurant.address &&
                      `${restaurant.address.street}, ${restaurant.address.suburb}, ${restaurant.address.state} ${restaurant.address.postcode}`}
                  </li>
                  <li>
                    <FiPhone className='list__icon' />
                    {`+61 ${restaurant.phoneNumber}`}
                  </li>
                  <li>
                    <BiTime className='list__icon' />
                    Open Hour
                  </li>
                </ul>
                <ul className='restaurant__card-button'>
                  <li>
                    {userInfoLoading ? (
                      <Loader />
                    ) : userInfoError ? (
                      <div>{userInfoError}</div>
                    ) : (
                      <ReviewModal
                        show={showReview}
                        onClose={() => setShowReview(false)}
                        data={userInfo}
                        category={restaurantCategory}
                        id={restaurantId}
                      />
                    )}

                    <Button
                      text={hasReviewed ? 'Reviewed' : 'Add Review'}
                      type='primary'
                      disabled={hasReviewed ? true : false}
                      onClick={
                        userInfo
                          ? showReviewHandler
                          : () => history.push('/login')
                      }
                    />
                  </li>
                  <li>
                    <MenuModal
                      data={restaurant.menu}
                      show={showMenu}
                      onClose={() => setShowMenu(false)}
                    />
                    <Button text='Menu' onClick={showMenuHandler} />
                  </li>
                  <li>
                    <MapModal
                      restaurant={restaurant}
                      show={showMapMenu}
                      onClose={() => setShowMapMenu(false)}
                    />
                    <Button
                      type='default'
                      text='Get Direction'
                      onClick={showMapMenuHandler}
                    />
                  </li>
                </ul>
              </div>
            </div>

            <section>
              <SubSectionTitle title='About this place' />
              <p>{restaurant.description}</p>
            </section>
            <section>
              <SubSectionTitle title='More Info' />
              <div className='grid col-2 more__info'>
                {restaurant.info &&
                  restaurant.info.map((i, index) => <li key={index}>{i}</li>)}
              </div>
            </section>
            <section>
              <SubSectionTitle title='Reviews' />
              {reviewsLoading ? (
                <Loader />
              ) : reviewsError ? (
                <div>{reviewsError}</div>
              ) : !reviews ? (
                <p>No review.</p>
              ) : (
                reviews.map(review => (
                  <div className='review' key={review.id}>
                    <div className='review__rating'>
                      {review.rating.toFixed(1)}
                    </div>
                    <div className='review__author'>
                      <img
                        className='review__author-photo'
                        src={review.user?.photo}
                        alt='user_photo'
                      />{' '}
                      <div>
                        <div className='review__author-username'>
                          {review.user?.username}
                        </div>
                        <small>{timeFormatter(review.createdAt)}</small>
                      </div>
                    </div>
                    <p className='review__comment'>{review.comment}</p>
                  </div>
                ))
              )}
            </section>
          </div>
        )
      )}
    </Layout>
  );
}

export default RestaurantPage;
