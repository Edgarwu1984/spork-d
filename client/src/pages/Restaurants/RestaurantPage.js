import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// REACT REDUX
import { useDispatch, useSelector } from 'react-redux';
import {
  getRestaurantDetails,
  listRestaurantReviews,
} from '../../redux/actions/restaurantActions';

// COMPONENTS
import Layout from '../../components/Layout';
import SubSectionTitle from '../../components/SubSectionTitle';
import Rating from '../../components/Rating';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import ReviewModal from '../../components/Modal/ReviewModal';
import MenuModal from '../../components/Modal/MenuModal';

// REACT-ICONS
import { BiRestaurant, BiTime } from 'react-icons/bi';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { FiPhone } from 'react-icons/fi';
import MapModal from '../../components/Modal/MapModal';
import { timeFormatter } from '../../utils/timeFormatter';

function RestaurantPage({ match, history }) {
  // RESTAURANT ID
  const restaurantId = match.params.id;

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

  useEffect(() => {
    dispatch(getRestaurantDetails(restaurantId));
    dispatch(listRestaurantReviews(restaurantId));
  }, [dispatch, restaurantId]);

  return (
    <Layout>
      {restaurantLoading ? (
        <Loader />
      ) : restaurantError ? (
        <div>{restaurantError}</div>
      ) : (
        <div className='container'>
          <ul className='breadcrumb'>
            <li className='breadcrumb__item'>
              <Link to='/'>Home</Link>
            </li>
            <li className='breadcrumb__item'>
              <Link to='/restaurants'>Restaurants</Link>
            </li>
            <li className='breadcrumb__item'>
              <Link to='/restaurants'>{match.params.name}</Link>
            </li>
          </ul>
          <div className='restaurant__card'>
            <img
              className='restaurant__card-image'
              src={restaurant.coverImage}
              alt={restaurant.name}
            />
            <div className='restaurant__card-content'>
              <div className='restaurant__rating'>{restaurant.rating}</div>
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
                    />
                  )}

                  <Button
                    text='Add Review'
                    styles='btn-primary'
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
                  <Button text='Get Direction' onClick={showMapMenuHandler} />
                </li>
              </ul>
            </div>
          </div>

          <div>
            <SubSectionTitle title='About this place' />
            <p>{restaurant.description}</p>
          </div>
          <div>
            <SubSectionTitle title='More Info' />
            <ul>
              {restaurant.info &&
                restaurant.info.map((i, index) => <li key={index}>{i}</li>)}
            </ul>
          </div>
          <div>
            <SubSectionTitle title='Reviews' />
            {reviewsLoading ? (
              <Loader />
            ) : reviewsError ? (
              <div>{reviewsError}</div>
            ) : reviews.length === 0 ? (
              <p>No review.</p>
            ) : (
              reviews.map(review => (
                <div className='review' key={review.id}>
                  <div className='review__rating'>{review.rating}</div>
                  <div className='review__author'>
                    <img
                      className='review__author-photo'
                      src={review.author.photo && review.author.photo}
                      alt='user_photo'
                    />{' '}
                    <div>
                      <div className='review__author-username'>
                        {review.author.username && review.author.username}
                      </div>
                      <small>{timeFormatter(review.reviewedAt.seconds)}</small>
                    </div>
                  </div>
                  <p className='review__comment'>{review.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}

export default RestaurantPage;
