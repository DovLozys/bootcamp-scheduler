import React, { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';

import menuicon from './menu-icon.png';
import defaultuser from './default-user.png';
import logo from './final-logo.png';

import './Navbar.css';

interface NavbarProps {
  onSearch?: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isAuthenticated] = useState<boolean>(false); // This would come from auth context

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

  return (
    <div>
      <nav className="nav-bar">
        <div className="nav-left">
          <Link to="/host-event" className="nav-link">
            <img src={menuicon} alt="menu-icon" className="menu-icon" />
            <span className="nav-text">Host Event</span>
          </Link>
        </div>

        <Link to="/">
          <div className="logo-container">
            <img src={logo} alt="final-logo" className="logo" />
          </div>
        </Link>

        <div className="nav-center">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
            <svg className="search-icon" viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </div>
        </div>

        <div className="nav-right">
          <Link to="/events" className="nav-link">
            <span className="nav-text">Find Events</span>
          </Link>

          <div className="user-menu">
            <img
              src={defaultuser}
              alt="user-profile"
              className={`default-user ${isAuthenticated ? 'authenticated' : ''}`}
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <div className="dropdown-menu">
                {isAuthenticated ? (
                  <>
                    <Link to="/profile" className="dropdown-item">My Profile</Link>
                    <Link to="/my-events" className="dropdown-item">My Events</Link>
                    <Link to="/settings" className="dropdown-item">Settings</Link>
                    <button className="dropdown-item logout-btn">Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="dropdown-item">Login</Link>
                    <Link to="/signup" className="dropdown-item">Sign Up</Link>
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
