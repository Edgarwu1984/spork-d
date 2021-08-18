import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listRestaurant } from '../../redux/actions/restaurantActions';
import Breadcrumb from '../../components/Breadcrumb';
import Layout from '../../components/Layout';
import MainSectionTitle from '../../components/MainSectionTitle';
import Loader from '../../components/Loader';
import Card from '../../components/Card';
import TopRestaurantCard from '../../components/TopRestaurantCard';

function RestaurantsPage() {
  const dispatch = useDispatch();

  const restaurantList = useSelector(state => state.restaurantList);
  const { loading, error, restaurants } = restaurantList;

  useEffect(() => {
    dispatch(listRestaurant());
  }, [dispatch]);
  return (
    <Layout>
      <div className='container'>
        <Breadcrumb currentPage='Restaurants' />
      </div>
      <div className='top__restaurant'>
        <div className='container'>
          <div className='top__list'>
            <TopRestaurantCard
              url='/'
              bgImage='/images/japanese-restaurant.jpg'
              category='Japanese Restaurant'
            />
            <TopRestaurantCard
              url='/'
              bgImage='/images/chinese-restaurant.jpg'
              category='Chinese Restaurant'
            />
            <TopRestaurantCard
              url='/'
              bgImage='/images/italian-restaurant.jpg'
              category='Italian Restaurant'
            />
            <TopRestaurantCard
              url='/'
              bgImage='/images/spanish-restaurant.jpg'
              category='Spanish Restaurant'
            />
          </div>
        </div>
      </div>
      <div className='container'>
        <section className='restaurants'>
          <MainSectionTitle title='Restaurants' />
          {loading ? (
            <Loader />
          ) : error ? (
            <div>{error.message}</div>
          ) : (
            <div className='grid'>
              {restaurants.map(restaurant => (
                <Card
                  url={`/restaurants/${restaurant.id}/${restaurant.name}`}
                  key={restaurant.id}
                  image={restaurant.coverImage}
                  title={restaurant.name}
                  address={`${restaurant.address.suburb},${restaurant.address.state}`}
                  category={restaurant.category}
                  value={restaurant.rating}
                  text={restaurant.numReviews}
                />
              ))}
            </div>
          )}
          <div className='center'></div>
        </section>
      </div>
    </Layout>
  );
}

export default RestaurantsPage;
