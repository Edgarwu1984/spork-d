import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { listRestaurant } from 'redux/actions/restaurantActions';
// COMPONENTS
import Breadcrumb from 'components/Breadcrumb';
import Layout from 'components/Layout';
import MainSectionTitle from 'components/MainSectionTitle';
import Card from 'components/Card';
import TopRestaurantCard from 'components/TopRestaurantCard';
import SkeletonCard from 'components/SkeletonCard';

function RestaurantsPage({ match }) {
  const dispatch = useDispatch();
  const keyword = useLocation().search.split('=')[1];

  const restaurantList = useSelector(state => state.restaurantList);
  const { loading, error, restaurants } = restaurantList;

  useEffect(() => {
    dispatch(listRestaurant(keyword));
  }, [dispatch, keyword]);

  return (
    <Layout>
      <div className='container'>
        <Breadcrumb match={match} />
      </div>
      <div className='top__restaurant'>
        <div className='container'>
          <div className='top__list'>
            <TopRestaurantCard
              url='restaurants/japanese'
              bgImage='/images/japanese-restaurant.jpg'
              category='Japanese Restaurant'
            />
            <TopRestaurantCard
              url='restaurants/asian'
              bgImage='/images/chinese-restaurant.jpg'
              category='Chinese Restaurant'
            />
            <TopRestaurantCard
              url='restaurants/italian'
              bgImage='/images/italian-restaurant.jpg'
              category='Italian Restaurant'
            />
            <TopRestaurantCard
              url='restaurants/spanish'
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
            <div className='grid col-4'>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : error ? (
            <div>{error.message}</div>
          ) : (
            <div className='grid col-4'>
              {restaurants?.map(restaurant => (
                <Card
                  url={`/restaurants/${restaurant.category}/${restaurant.name}&&${restaurant.id}`}
                  key={restaurant.id}
                  image={restaurant.coverImage}
                  title={restaurant.name}
                  address={`${restaurant.address.suburb},${restaurant.address.state}`}
                  category={restaurant.category}
                  price={restaurant.avgPrice}
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
