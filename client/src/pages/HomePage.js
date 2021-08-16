import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import Hero from '../components/Layout/Hero';
import Button from '../components/Button';
import Card from '../components/Card';
import Loader from '../components/Loader';
import { FiArrowRight, FiSearch, FiStar, FiPhone } from 'react-icons/fi';
import { listRestaurant } from '../redux/actions/restaurantActions';

function HomePage({ history }) {
  const dispatch = useDispatch();

  const restaurantList = useSelector(state => state.restaurantList);
  const { loading, error, restaurants } = restaurantList;

  useEffect(() => {
    dispatch(listRestaurant());
  }, [dispatch]);

  // console.log(restaurants);

  const top5Res = restaurants.filter(res => res.rating > 4.5);

  return (
    <Layout pageTitle=''>
      <Hero>
        <div className='hero-text_content'>
          <h1 className='hero-title'>Find delicious dishes</h1>
          <Button
            text='Go explore'
            styles='uppercase btn-primary btn-lg'
            iconRight={<FiArrowRight />}
            onClick={() => history.push('/restaurants')}
          />
        </div>
      </Hero>
      <div className='container'>
        <section className='feature'>
          <div className='feature-element'>
            <div className='feature-element__icon'>
              <FiSearch />
            </div>
            <h3 className='feature-element__title'>Search Restaurant</h3>
          </div>
          <div className='feature-element'>
            <div className='feature-element__icon'>
              <FiStar />
            </div>
            <h3 className='feature-element__title'>Restaurant Review</h3>
          </div>
          <div className='feature-element'>
            <div className='feature-element__icon'>
              <FiPhone />
            </div>
            <h3 className='feature-element__title'>Booking Table</h3>
          </div>
        </section>

        <section className='top-restaurant'>
          {loading ? (
            <Loader />
          ) : error ? (
            <div>{error.message}</div>
          ) : (
            <div className='grid'>
              {top5Res.map(restaurant => (
                <Card
                  key={restaurant._id}
                  image={restaurant.coverImage}
                  title={restaurant.name}
                  address={restaurant.address}
                  category={restaurant.category}
                  value={restaurant.rating}
                  text={restaurant.numReviews}
                />
              ))}
            </div>
          )}
          <div className='center'>
            <Button text='Find more' styles='uppercase btn-primary' />
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default HomePage;
