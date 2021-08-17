import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';
import { IoMdSunny, IoMdMoon } from 'react-icons/io';

function Navbar() {
  const [collapse, setCollapse] = useState(true);

  const collapseHandler = () => setCollapse(!collapse);

  const handleClose = () => setCollapse(true);

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

  return (
    <nav className='navbar'>
      <div className='navbar__menu'>
        <Link to='/' className='navbar__menu-brand'>
          <img className='logo' src='/images/logo.png' alt='logo' />
        </Link>

        <button className='navbar__menu-toggler' onClick={collapseHandler}>
          {collapse ? <FaBars /> : <FaTimes />}
        </button>
      </div>

      <div className={collapse ? 'navbar-nav' : 'navbar-nav collapse'}>
        <ul className='nav-list'>
          <li className='nav-list-item'></li>
        </ul>
        <ul className='nav-list'>
          <li className='nav-list-item'>
            <Link to='/login' className='' onClick={handleClose}>
              <FaUser /> Login
            </Link>
          </li>
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
