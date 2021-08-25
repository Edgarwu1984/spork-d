import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/actions/userActions';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

function RegisterPage({ history, location }) {
  const getCurrentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [photo, setPhoto] = useState('');

  // EMAIL FORMAT VALIDATOR
  const emailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);

  // REDIRECT DIRECTORY
  const redirect = location.search ? location.search.split('=')[1] : '/';

  // REDUX
  const dispatch = useDispatch();
  const userRegister = useSelector(state => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  // LOAD THEME
  useEffect(() => {
    const root = document.documentElement.classList;
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
      root.add('light');
      root.remove('dark');
    } else if (currentTheme === 'dark') {
      root.add('dark');
      root.remove('light');
    }
  }, []);

  // LOGIN CHECK
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
      toast.success("Welcome to Spork'S");
    } else if (error) {
      toast.error(error);
    }
  }, [history, userInfo, redirect, error]);

  // LOGIN FORM HANDLER
  const submitHandler = e => {
    e.preventDefault();
    if (!email || !password || !confirmPassword || !username || !photo) {
      toast.error('Input filed can not be empty.');
    } else if (!emailFormat) {
      toast.error('Invalid email format.');
    } else if (password !== confirmPassword) {
      toast.error('Password does not match.');
    } else {
      dispatch(registerUser(email, password, username, photo));
    }
  };

  return (
    <div
      className='login-page'
      style={{ backgroundImage: "url('/images/hero-image-1.jpg')" }}
    >
      <div className='login'>
        <div className='site-brand'>
          <img className='site-logo' src='/images/logo.png' alt='logo' />
        </div>
        <div className='form__wrapper'>
          <h3 className='form-title'>Sign Up</h3>
          <form onSubmit={submitHandler}>
            {loading && <Loader />}
            <div className='form-group'>
              <label htmlFor='name' className='form-label'>
                Username
              </label>
              <input
                type='text'
                className='form-control'
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='name' className='form-label'>
                Email
              </label>
              <input
                type='text'
                className='form-control'
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='description' className='form-label'>
                Password
              </label>
              <input
                type='password'
                className='form-control'
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='description' className='form-label'>
                Confirm Password
              </label>
              <input
                type='password'
                className='form-control'
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='description' className='form-label'>
                Photo
              </label>
              <select
                className='form-control option-form'
                onChange={e => setPhoto(e.target.value)}
              >
                <option value='' hidden>
                  Select Your Photo
                </option>
                <option value='https://randomuser.me/api/portraits/men/36.jpg'>
                  Photo 1
                </option>
                <option value='https://randomuser.me/api/portraits/men/32.jpg'>
                  Photo 2
                </option>
                <option value='https://randomuser.me/api/portraits/men/34.jpg'>
                  Photo 3
                </option>
                <option value='https://randomuser.me/api/portraits/men/31.jpg'>
                  Photo 4
                </option>
                <option value='https://randomuser.me/api/portraits/men/21.jpg'>
                  Photo 5
                </option>
                <option value='https://randomuser.me/api/portraits/men/16.jpg'>
                  Photo 6
                </option>
              </select>
            </div>
            <div className='form-group'>
              <input
                type='submit'
                className='btn btn-primary'
                value='Register'
              />
              <Link to='/' type='submit' className='btn btn-outline'>
                Back
              </Link>
            </div>
            <div className='form-group'>
              Already have account?
              <Link className='form-link' to='/login'>
                Login
              </Link>
            </div>
            <div className='site-copyright'>
              &copy; {getCurrentYear} Spork's Restaurant Review.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
