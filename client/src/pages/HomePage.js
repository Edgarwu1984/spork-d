import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listRestaurant } from '../redux/actions/restaurantActions';
import Layout from '../components/Layout';
import Hero from '../components/Layout/Hero';
import Button from '../components/Button';
import Card from '../components/Card';
import Loader from '../components/Loader';
import { FiArrowRight, FiSearch, FiStar, FiPhone } from 'react-icons/fi';
import Collection from '../components/Collection';
import MainSectionTitle from '../components/MainSectionTitle';

function HomePage({ history }) {
  const dispatch = useDispatch();

  const restaurantList = useSelector(state => state.restaurantList);
  const { loading, error, restaurants } = restaurantList;

  useEffect(() => {
    dispatch(listRestaurant());
  }, [dispatch]);

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
          <MainSectionTitle title='Popular Restaurant' />
          {loading ? (
            <Loader />
          ) : error ? (
            <div>{error}</div>
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
          <div className='center'>
            <Button
              text='Find more'
              styles='uppercase btn-outline'
              onClick={() => history.push('/restaurants')}
            />
          </div>
        </section>

        <Collection bgImage='/images/sushi-event.jpg'>
          <div className='collection__content'>
            <h2 className='collection__content-title'>
              Sushi Week Get 20% off
            </h2>
            <Button
              text='Explore'
              styles='uppercase btn-primary'
              onClick={() => history.push('/restaurants')}
            />
          </div>
        </Collection>

        <div
          className='collection__layout-col2'
          style={{ marginBottom: '4rem' }}
        >
          <Collection bgImage='/images/spanish-event.jpg'>
            <div className='collection__content'>
              <h2 className='collection__content-title'>Spanish Collection</h2>
              <Button
                text='Explore'
                styles='uppercase btn-primary'
                onClick={() => history.push('/restaurants')}
              />
            </div>
          </Collection>
          <Collection bgImage='/images/italian-event.jpg'>
            <div className='collection__content'>
              <h2 className='collection__content-title'>Italian Collection</h2>
              <Button
                text='Explore'
                styles='uppercase btn-primary'
                onClick={() => history.push('/restaurants')}
              />
            </div>
          </Collection>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
