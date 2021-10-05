import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
// REACT REDUX
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/actions/userActions';
// MODULE
import { toast } from 'react-toastify';
// COMPONENTS
import Searchbar from '../../components/Searchbar';
// UTILITIES
import LoadTheme from '../../utils/themeLoader';
// REACT-ICONS
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';
import { IoMdSunny, IoMdMoon } from 'react-icons/io';
import { FiSearch } from 'react-icons/fi';
import { BiLogOut } from 'react-icons/bi';

function Navbar() {
  // Get UserInfo
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const history = useHistory();
  const [collapse, setCollapse] = useState(true);
  const [showSearch, setShowSearch] = useState(false);

  const collapseHandler = () => setCollapse(!collapse);
  const showSearchHandler = () => setShowSearch(true);

  // DARK MODE HANDLER
  LoadTheme();
  const defaultTheme = localStorage.getItem('theme');
  const [theme, setTheme] = useState(defaultTheme);

  const themeToggler = () => {
    const root = document.documentElement.classList;
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

  const handleLogout = () => {
    dispatch(logoutUser());
    history.push('/');
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
          {userInfo && userInfo ? (
            <li className='nav__list-item'>
              <div className='user'>
                <FaUser /> <span>{userInfo.username}</span>
              </div>
              <ul className='nav__dropdown'>
                {userInfo?.isAdmin && (
                  <>
                    <li className='nav__dropdown-admin'>Logged in as Admin</li>
                    <li className='nav__dropdown-item'>
                      <Link to='/dashboard'>Dashboard</Link>
                    </li>
                  </>
                )}
                <li className='nav__dropdown-item'>
                  <Link to='/profile'>Profile</Link>
                </li>
                <li className='nav__dropdown-item'>
                  <Link to='#' onClick={handleLogout}>
                    <BiLogOut />
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
