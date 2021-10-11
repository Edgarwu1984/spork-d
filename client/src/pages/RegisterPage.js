import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from 'redux/actions/userActions';
// COMPONENTS
import Loader from 'components/Loader';
// UTILITIES
import LoadTheme from 'utils/themeLoader';

function RegisterPage({ history, location }) {
  const getCurrentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // REDUX
  const dispatch = useDispatch();
  const userRegister = useSelector(state => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  // LOAD THEME
  LoadTheme();

  // LOGIN CHECK
  useEffect(() => {
    if (userInfo) {
      history.push('/');
      toast.success("Welcome to Spork'S");
    } else if (error) {
      toast.error(error);
    }
  }, [history, userInfo, error]);

  // LOGIN FORM HANDLER
  const submitHandler = e => {
    e.preventDefault();
    if (!email || !password || !confirmPassword || !username) {
      toast.error('Input filed can not be empty.');
    } else if (password !== confirmPassword) {
      toast.error('Password does not match.');
    } else {
      dispatch(registerUser(email, password, username));
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
              <input
                type='submit'
                className='btn btn-primary btn-block'
                value='Register'
              />
            </div>
            <div className='form-group'>
              <Link
                to='/'
                type='submit'
                className='btn btn-primary-outline btn-block'
              >
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
