import React, { useEffect } from 'react';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { listRestaurantByCategory } from 'redux/actions/restaurantActions';
// COMPONENTS
import Breadcrumb from 'components/Breadcrumb';
import Layout from 'components/Layout';
import MainSectionTitle from 'components/MainSectionTitle';
import Card from 'components/Card';
import Hero from 'components/Layout/Hero';
import SkeletonCard from 'components/SkeletonCard';

function RestaurantCategoryPage({ match }) {
  const category = match.params.category;

  const dispatch = useDispatch();
  const restaurantCategoryList = useSelector(
    state => state.restaurantCategoryList
  );
  const { loading, error, restaurants } = restaurantCategoryList;

  useEffect(() => {
    dispatch(listRestaurantByCategory(category));
  }, [dispatch, category]);
  return (
    <Layout>
      <div className='container'>
        <Breadcrumb match={match} />
      </div>
      <div className='container'>
        <Hero
          height='300px'
          bgImage={
            category === 'japanese'
              ? '/images/japanese-restaurant.jpg'
              : category === 'asian'
              ? '/images/chinese-restaurant.jpg'
              : category === 'spanish'
              ? '/images/spanish-restaurant.jpg'
              : '/images/italian-event.jpg'
          }
        >
          <h2 className='hero-title-small'>Find delicious {category} dishes</h2>
        </Hero>
        <section className='restaurants'>
          <MainSectionTitle title={`Top 5 ${category} restaurants`} />
          {loading ? (
            <div className='grid col-4'>
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

export default RestaurantCategoryPage;
