import React, { useState, useEffect } from 'react';
// REACT REDUX
import { useDispatch, useSelector } from 'react-redux';

// COMPONENTS
import Layout from 'components/Layout';
import Breadcrumb from 'components/Breadcrumb';
import Loader from 'components/Loader';
import Button from 'components/Button';
import { Link } from 'react-router-dom';
import AlertMessage from 'components/AlertMessage';

function RestaurantCreatePage({ match, history }) {
  const [data, setData] = useState({
    category: '',
    name: '',
    description: '',
    address: {
      street: '',
      suburb: '',
      postcode: '',
      state: '',
    },
    openHour: '',
    phoneNumber: '',
    avgPrice: 0,
    geolocation: [0, 0],
    info: [''],
    coverImage: '',
  });

  const {
    category,
    name,
    description,
    address,
    openHour,
    phoneNumber,
    avgPrice,
  } = data;

  const { street, suburb, postcode, state } = address;

  const handleTextChange = level => e => {
    const { name, value } = e.target;
    // (a) Updating Root Level of the State Object
    if (!level) {
      setData({
        ...data,
        [name]: value,
      });
    } else {
      setData({
        ...data,
        [level]: {
          ...data[level],
          [name]: value,
        },
      });
    }
  };

  // REDUX
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const submitHandler = e => {
    e.preventDefault();
    console.log(data);
  };

  console.log(category);

  return (
    <Layout pageTitle='- Dashboard'>
      <div className='container'>
        <Breadcrumb match={match} />
        <div className='profile__banner  dashboard__banner'>
          <div className='profile__banner-wrap'>
            <div className='greeting'>
              <h2 className='title'>New Restaurant</h2>
            </div>
          </div>
        </div>
        <Link className='back__btn' to='/dashboard/restaurants'>
          {'<'} Back
        </Link>
        <div className='form-wrap'>
          <form onSubmit={submitHandler}>
            {/* {updateError && (
              <AlertMessage message={updateError} variant='danger' />
            )} */}
            <div className='form-group'>
              <label className='form-label'>Category</label>
              <select
                value={category}
                name='category'
                className='form-control'
                onChange={handleTextChange()}
              >
                <option value='Japanese'>Japanese</option>
                <option value='Asian'>Asian</option>
                <option value='Spanish'>Spanish</option>
                <option value='Italian'>Italian</option>
              </select>
            </div>
            <div className='form-group'>
              <label className='form-label'>Name</label>
              <input
                className='form-control'
                type='text'
                name='name'
                value={name}
                onChange={handleTextChange()}
              />
            </div>
            <div className='form-group'>
              <label className='form-label'>Description</label>
              <textarea
                className='form-control'
                rows='5'
                type='text'
                name='description'
                value={description}
                onChange={handleTextChange()}
              />
            </div>
            <div className='form-group'>
              <label className='form-label'>Street</label>
              <input
                className='form-control'
                type='text'
                name='street'
                value={street}
                onChange={handleTextChange('address')}
              />
            </div>
            <div className='grid col-3'>
              <div className='form-group'>
                <label className='form-label'>Suburb</label>
                <select
                  value={suburb}
                  name='suburb'
                  className='form-control'
                  onChange={handleTextChange('address')}
                >
                  <option value='Melbourne CBD'>Melbourne CBD</option>
                  <option value='Blackburn'>Blackburn</option>
                  <option value='Doncaster'>Doncaster</option>
                  <option value='Boxhill'>Boxhill</option>
                </select>
              </div>
              <div className='form-group'>
                <label className='form-label'>Postcode</label>
                <input
                  className='form-control'
                  type='number'
                  name='postcode'
                  value={postcode}
                  onChange={handleTextChange('address')}
                />
              </div>
              <div className='form-group'>
                <label className='form-label'>State</label>
                <select
                  value={state}
                  name='state'
                  className='form-control'
                  onChange={handleTextChange('address')}
                >
                  <option value='VIC'>VIC</option>
                  <option value='NSW'>NSW</option>
                  <option value='ACT'>ACT</option>
                  <option value='WA'>WA</option>
                  <option value='SA'>SA</option>
                </select>
              </div>
            </div>
            <div className='form-group'>
              <label className='form-label'>Open Hour</label>
              <textarea
                className='form-control'
                rows='3'
                type='text'
                name='openHour'
                value={openHour}
                onChange={handleTextChange()}
              />
            </div>
            <div className='grid col-2'>
              <div className='form-group'>
                <label className='form-label'>Phone Number</label>
                <input
                  className='form-control'
                  type='number'
                  name='phoneNumber'
                  value={phoneNumber}
                  onChange={handleTextChange()}
                />
              </div>
              <div className='form-group'>
                <label className='form-label'>Avg Price</label>
                <input
                  className='form-control'
                  type='number'
                  name='avgPrice'
                  value={avgPrice}
                  onChange={handleTextChange()}
                />
              </div>
            </div>
            <div className='form-group'>
              <label className='form-label'>Information</label>
              <input
                className='form-control'
                type='number'
                name='avgPrice'
                value={avgPrice}
                onChange={handleTextChange()}
              />
            </div>

            <div className='form-group'>
              <input
                className='btn btn-primary btn-block'
                // className={
                //   updateLoading || !email || !username
                //     ? 'btn btn-primary btn-block btn-disabled'
                //     : 'btn btn-primary btn-block'
                // }
                type='submit'
                value='Create'
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default RestaurantCreatePage;
