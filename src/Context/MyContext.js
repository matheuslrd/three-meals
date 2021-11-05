import React, { createContext } from 'react';
import PropTypes from 'prop-types';

export const MyContext = createContext();

function MyContextProvider({ children }) {
  const context = {};

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
