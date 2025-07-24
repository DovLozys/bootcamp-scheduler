import React, { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import menuicon from '../../assets/images/menu-icon.png';
import defaultuser from '../../assets/images/default-user.png';
import logo from '../../assets/images/final-logo.png';

import styles from './Navbar.module.css';

interface NavbarProps {
  onSearch?: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const { isAuthenticated, user, logout } = useAuth();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  const toggleDropdown = (): void => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async (): void => {
    try {
      await logout();
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div>
      <nav className={styles.navBar}>
        <div className={styles.navLeft}>
          <Link to='/host-event' className={styles.navLink}>
            <img src={menuicon} alt='menu-icon' className={styles.menuIcon} />
            <span className={styles.navText}>Host Event</span>
          </Link>
        </div>

        <Link to='/'>
          <div className={styles.logoContainer}>
            <img src={logo} alt='final-logo' className={styles.logo} />
          </div>
        </Link>

        <div className={styles.navCenter}>
          <div className={styles.searchContainer}>
            <input
              type='text'
              placeholder='Search events...'
              value={searchQuery}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
            <svg
              className={styles.searchIcon}
              viewBox='0 0 24 24'
              width='20'
              height='20'
            >
              <path
                fill='currentColor'
                d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'
              />
            </svg>
          </div>
        </div>

        <div className={styles.navRight}>
          <Link to='/events' className={styles.navLink}>
            <span className={styles.navText}>Find Events</span>
          </Link>

          <div className={styles.userMenu}>
            <div className={styles.userInfo}>
              {isAuthenticated && user && (
                <span className={styles.userName}>
                  Hi, {user.name.split(' ')[0]}
                </span>
              )}
              <img
                src={defaultuser}
                alt='user-profile'
                className={`${styles.defaultUser} ${isAuthenticated ? styles.authenticated : ''}`}
                onClick={toggleDropdown}
              />
            </div>
            {isDropdownOpen && (
              <div className={styles.dropdownMenu}>
                {isAuthenticated ? (
                  <>
                    <Link
                      to='/profile'
                      className={styles.dropdownItem}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      to='/my-events'
                      className={styles.dropdownItem}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      My Events
                    </Link>
                    <button
                      className={`${styles.dropdownItem} ${styles.logoutBtn}`}
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to='/login'
                      className={styles.dropdownItem}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to='/register'
                      className={styles.dropdownItem}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
