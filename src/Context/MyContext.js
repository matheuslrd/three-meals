import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import requestApi from '../Services/requestApi';

export const MyContext = createContext();

const INITIAL_USER = {
  email: '',
};

const INITIAL_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const MEAL_CATEGORY_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const DRINK_CATEGORY_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

function MyContextProvider({ children }) {
  const [user, setUser] = useState(INITIAL_USER);
  const [data, setData] = useState([]);
  const [filterUrl, setFilterUrl] = useState(INITIAL_URL);
  const [mealCategories, setMealCategories] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);

  useEffect(() => {
    async function settingData() {
      const dataApi = await requestApi(filterUrl);
      const dataCondition = dataApi.meals || dataApi.drinks;
      if (!dataCondition) {
        return global.alert(
          'Sinto muito, não encontramos nenhuma receita para esses filtros.',
        );
      }
      return setData(dataCondition);
    }

    settingData();
  }, [filterUrl]);

  useEffect(() => {
    function getCategories() {
      requestApi(MEAL_CATEGORY_URL)
        .then((result) => setMealCategories(result.meals
          .map(({ strCategory }) => strCategory)));
      requestApi(DRINK_CATEGORY_URL)
        .then((result) => setDrinkCategories(result.drinks
          .map(({ strCategory }) => strCategory)));
    }
    getCategories();
  }, []);

  const context = {
    data,
    user,
    setUser,
    filterUrl,
    setFilterUrl,
    mealCategories,
    drinkCategories,
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
