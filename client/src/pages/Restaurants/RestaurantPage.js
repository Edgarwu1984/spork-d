import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantDetails } from '../../redux/actions/restaurantActions';
import Layout from '../../components/Layout';
import SubSectionTitle from '../../components/SubSectionTitle';
import Rating from '../../components/Rating';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import { BiRestaurant, BiTime } from 'react-icons/bi';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { FiPhone } from 'react-icons/fi';

function RestaurantPage({ match }) {
  const restaurantId = match.params.id;

  const dispatch = useDispatch();

  const restaurantDetails = useSelector(state => state.restaurantDetails);
  const { loading, error, restaurant } = restaurantDetails;

  useEffect(() => {
    dispatch(getRestaurantDetails(restaurantId));
  }, [dispatch, restaurantId]);

  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : error ? (
        <div>{error}</div>
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
                  <Button text='Add Review' styles='btn-primary' />
                </li>
                <li>
                  <Button text='Menu' />
                </li>
                <li>
                  <Button text='Get Direction' />
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
            {restaurant.reviews ? (
              restaurant.reviews.map(review => (
                <li key={review._id}>{review.comment}</li>
              ))
            ) : (
              <p>No review.</p>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}

export default RestaurantPage;
