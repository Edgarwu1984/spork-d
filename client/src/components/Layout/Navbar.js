import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// REACT REDUX
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/actions/userActions';

// MODULE
import { toast } from 'react-toastify';

// COMPONENTS
import Searchbar from '../../components/Searchbar';

// REACT-ICONS
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';
import { IoMdSunny, IoMdMoon } from 'react-icons/io';
import { FiSearch } from 'react-icons/fi';

function Navbar() {
  const [collapse, setCollapse] = useState(true);
  const [showSearch, setShowSearch] = useState(false);

  const collapseHandler = () => setCollapse(!collapse);
  const showSearchHandler = () => setShowSearch(true);

  // DARK MODE HANDLER
  const root = document.documentElement.classList;
  const defaultTheme = localStorage.getItem('theme');
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    if (!defaultTheme) {
      localStorage.setItem('theme', 'light');
      window.location.reload();
    } else if (defaultTheme === 'light') {
      root.add('light');
      root.remove('dark');
    } else if (defaultTheme === 'dark') {
      root.add('dark');
      root.remove('light');
    }
  }, [root, defaultTheme]);

  const themeToggler = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    if (defaultTheme === 'light') {
      root.remove('light');
      root.add('dark');
      localStorage.setItem('theme', 'dark');
    } else if (defaultTheme === 'dark') {
      root.remove('dark');
      root.add('light');
      localStorage.setItem('theme', 'light');
    }
  };

  // Get UserInfo
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success('Logged out');
  };

  return (
    <nav className='navbar'>
      <Searchbar show={showSearch} onClose={() => setShowSearch(false)} />
      <div className='navbar__menu'>
        <Link to='/' className='navbar__menu-brand'>
          <img className='logo' src='/images/logo.png' alt='logo' />
        </Link>
        <button className='navbar__menu-toggler' onClick={collapseHandler}>
          {collapse ? <FaBars /> : <FaTimes />}
        </button>
      </div>

      <div className={collapse ? 'navbar-nav' : 'navbar-nav collapse'}>
        <ul className='nav__list'>
          <li className='nav__list-item'>
            <Link to='#' onClick={showSearchHandler}>
              <FiSearch className='icon' />
            </Link>
          </li>
          {userInfo ? (
            <li className='nav__list-item'>
              <div className='user'>
                <FaUser /> <span>{userInfo.userData.username}</span>
              </div>
              <ul className='nav__dropdown'>
                <li className='nav__dropdown-item'>
                  <Link to='/profile'>Profile</Link>
                </li>
                <li className='nav__dropdown-item'>
                  <Link to='#' onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              </ul>
            </li>
          ) : (
            <li className='nav__list-item'>
              <Link to='/login' className='user'>
                <FaUser />
                <span>Login</span>
              </Link>
            </li>
          )}

          <li className='dark__mode-toggler'>
            {theme === 'light' ? (
              <button className='dark__mode-btn' onClick={themeToggler}>
                <IoMdSunny className='icon' />
              </button>
            ) : theme === 'dark' ? (
              <button className='dark__mode-btn' onClick={themeToggler}>
                <IoMdMoon className='icon icon-active' />
              </button>
            ) : (
              <button className='dark__mode-btn' onClick={themeToggler}>
                <IoMdSunny className='icon' />
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
