import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function LoginPage({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
  const getCurrentYear = new Date().getFullYear();
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

  const submitHandler = e => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Input filed can not be empty.');
    } else if (!emailFormat) {
      toast.error('Invalid email format.');
    } else {
      history.push('/');
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
