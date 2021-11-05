import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const MyContext = createContext();

const INITIAL_USER = { email: '' };

function MyContextProvider({ children }) {
  const [user, setUser] = useState(INITIAL_USER);

  const context = { user, setUser };

  return (
    <MyContext.Provider value={ context }>
      { children }
    </MyContext.Provider>
  );
}

MyContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyContextProvider;
