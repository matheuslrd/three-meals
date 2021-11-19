import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import Button from './Button';

import { GetLocalStorage } from '../Helper/ToLocalStorage';

export default function ButtonsFilter({ setArray, keyLocalStorage }) {
  const [originalArray, setOriginalArray] = useState([]);

  useEffect(() => {
    setOriginalArray(GetLocalStorage(keyLocalStorage));
  }, []);

  function filterByFood() {
    const recipesFilteredByFood = originalArray.filter(({ type }) => type === 'comida');
    setArray(recipesFilteredByFood);
  }

  function filterByDrink() {
    const recipesFilteredByDrink = originalArray.filter(({ type }) => type === 'bebida');
    setArray(recipesFilteredByDrink);
  }

  return (
    <div className="container-buttons-filter">
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
    </div>
  );
}

ButtonsFilter.propTypes = {
  keyLocalStorage: PropTypes.string.isRequired,
  setArray: PropTypes.func,
};

ButtonsFilter.defaultProps = {
  setArray: () => {},
};
