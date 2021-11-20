import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import Button from './Button';

import { GetLocalStorage } from '../Helper/ToLocalStorage';

export default function ButtonsFilter({ setArray, localStorageKey }) {
  const [originalArray, setOriginalArray] = useState([]);

  useEffect(() => {
    const getRecipes = GetLocalStorage(localStorageKey);
    setOriginalArray(getRecipes);
  }, [localStorageKey]);

  function filterByFood() {
    const recipesFilteredByFood = originalArray.filter(({ type }) => type === 'comida');
    setArray(recipesFilteredByFood);
  }

  function filterByDrink() {
    const recipesFilteredByDrink = originalArray.filter(({ type }) => type === 'bebida');
    setArray(recipesFilteredByDrink);
  }

  return (
    <nav className="container-buttons-filter">
      <Button
        className="btn-filter"
        dataTestId="filter-by-all-btn"
        onClick={ () => setArray(originalArray) }
      >
        All
      </Button>

      <Button
        className="btn-filter"
        dataTestId="filter-by-food-btn"
        onClick={ filterByFood }
      >
        Food
      </Button>

      <Button
        className="btn-filter"
        dataTestId="filter-by-drink-btn"
        onClick={ filterByDrink }
      >
        Drinks
      </Button>
    </nav>
  );
}

ButtonsFilter.propTypes = {
  localStorageKey: PropTypes.string.isRequired,
  setArray: PropTypes.func,
};

ButtonsFilter.defaultProps = {
  setArray: () => {},
};
