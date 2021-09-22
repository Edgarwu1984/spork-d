import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../redux/actions/userActions';
import Loader from '../components/Loader';
import LoadTheme from '../utils/themeLoader';

function LoginPage({ history }) {
  const getCurrentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // REDUX
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userLogin;

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
    if (!email || !password) {
      toast.error('Input filed can not be empty.');
    } else {
      dispatch(loginUser(email, password));
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
          <h3 className='form-title'>Login</h3>
          <form onSubmit={submitHandler}>
            {loading && <Loader />}
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
              <input type='submit' className='btn btn-primary' value='Login' />
              <Link to='/' type='submit' className='btn btn-outline'>
                Back
              </Link>
            </div>
            <div className='form-group'>
              Don't have account?
              <Link className='form-link' to='/register'>
                Sign up
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

export default LoginPage;
