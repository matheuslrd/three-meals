import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import Button from './Button';
import SearchBar from './SearchBar';

import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

import '../Styles/Header.css';

function Header({ children, disabledSearch }) {
  const [redirectProfile, setRedirectProfile] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const btnSearch = () => (
    <Button
      className="search-container"
      dataTestId="search-top-btn"
      display={ disabledSearch }
      src={ searchIcon }
      onClick={ () => setShowSearchBar(!showSearchBar) }
    >
      <img src={ searchIcon } alt="Profile Icon" />
    </Button>
  );

  return (
    <header className="header">
      { redirectProfile && <Redirect to="/perfil" /> }

      <div className="header-content">
        <Button
          className="profile-container"
          dataTestId="profile-top-btn"
          onClick={ () => setRedirectProfile(true) }
          src={ profileIcon }
        >
          <img src={ profileIcon } alt="Profile Icon" />
        </Button>
        <h1 className="title-page" data-testid="page-title">
          { children }
        </h1>
      </div>
      { !disabledSearch && btnSearch() }

      { showSearchBar && <SearchBar textFilterPage={ children } /> }
    </header>
  );
}

Header.propTypes = {
  children: PropTypes.string.isRequired,
  disabledSearch: PropTypes.bool,
};

Header.defaultProps = {
  disabledSearch: false,
};

export default Header;
