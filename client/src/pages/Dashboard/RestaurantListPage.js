import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// REACT REDUX
import { useDispatch, useSelector } from 'react-redux';
import { listRestaurant } from 'redux/actions/restaurantActions';
// COMPONENTS
import Loader from 'components/Loader';
import Layout from 'components/Layout';
import Breadcrumb from 'components/Breadcrumb';

const RestaurantListPage = ({ match }) => {
  const dispatch = useDispatch();
  const restaurantList = useSelector(state => state.restaurantList);
  const { loading, error, restaurants } = restaurantList;

  useEffect(() => {
    dispatch(listRestaurant());
  }, [dispatch]);

  return (
    <Layout pageTitle='- Dashboard'>
      <div className='container'>
        <Breadcrumb match={match} />
        <div className='profile__banner  dashboard__banner'>
          <div className='profile__banner-wrap'>
            <div className='greeting'>
              <h2 className='title'>Restaurant List</h2>
            </div>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : error ? (
          <div>{error}</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Name</th>
                <th>Rating</th>
                <th>Suburb</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {restaurants &&
                restaurants.map(restaurant => (
                  <tr key={restaurant.id}>
                    <td data-label='Category'>{restaurant.category}</td>
                    <td data-label='Name'>{restaurant.name}</td>
                    <td data-label='Rating'>{restaurant.rating.toFixed(1)}</td>
                    <td data-label='Suburb'>{restaurant.address?.suburb}</td>
                    <td>
                      <Link
                        to={`/dashboard/restaurants/${restaurant.id}/edit`}
                        className='btn btn-default-outline'
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default RestaurantListPage;
