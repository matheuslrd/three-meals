import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import requestApi from '../Services/requestApi';

export const MyContext = createContext();

const INITIAL_USER = {
  email: '',
};

function MyContextProvider({ children }) {
  const [user, setUser] = useState(INITIAL_USER);
  const [data, setData] = useState([]);
  const [filterUrl, setFilterUrl] = useState('https://www.themealdb.com/api/json/v1/1/search.php?s=');

  useEffect(() => {
    async function settingData() {
      const dataApi = await requestApi(filterUrl);
      setData(dataApi.meals || dataApi.drinks);
    }

    if (filterUrl.length !== 0) {
      settingData();
    }
  }, [filterUrl]);

  const context = {
    data,
    user,
    setUser,
    filterUrl,
    setFilterUrl,
  };

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
