import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import GetIngredients from '../../../Helper/GetIngredients';
import { GetLocalStorage, ToLocalStorage } from '../../../Helper/ToLocalStorage';
import UrlIncludes from '../../../Helper/UrlIncludes';

function RenderIngredientCheckboxes({ data, url, id, setArrayState }) {
  const ingredientsToRender = GetIngredients(data);

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      const ingredientsArray = GetIngredients(data).reduce((acc, { item }) => {
        if (item !== '' && item !== null) acc.push(item);
        return acc;
      }, []);

      const key = UrlIncludes(url, 'comidas', 'meals', 'cocktails');
      const inProgress = GetLocalStorage('inProgressRecipes');
      const recipeInProgress = inProgress[key][id] || ingredientsArray;

      setArrayState(recipeInProgress);
    }
  }, [data, id, setArrayState, url]);

  function checkIngredients(ingredient) {
    const inProgressRecipes = GetLocalStorage('inProgressRecipes')
      || { cocktails: {}, meals: {} };

    const recipeIsInProgress = inProgressRecipes.cocktails
      ? inProgressRecipes.cocktails[id] || inProgressRecipes.meals[id]
      : inProgressRecipes.meals[id] || inProgressRecipes.cocktails[id];

    if (recipeIsInProgress) {
      return recipeIsInProgress.every((item) => item !== ingredient);
    }
  }

  function addOrRemoveIngredient({ target: { checked } }, ingredient) {
    const ingredientsArray = GetIngredients(data).reduce((acc, { item }) => {
      if (item !== '' && item !== null) acc.push(item);
      return acc;
    }, []);

    const key = UrlIncludes(url, 'comidas', 'meals', 'cocktails');
    const inProgress = GetLocalStorage('inProgressRecipes');
    const newInProgress = inProgress[key][id] || ingredientsArray;

    if (checked) {
      ToLocalStorage('inProgressRecipes', {
        ...inProgress,
        [key]: {
          ...newInProgress,
          [id]: newInProgress.filter((item) => item !== ingredient),
        },
      });

      setArrayState(newInProgress.filter((item) => item !== ingredient));
    } else {
      ToLocalStorage('inProgressRecipes', {
        ...inProgress,
        [key]: {
          ...newInProgress,
          [id]: [...newInProgress, ingredient],
        },
      });

      setArrayState([...newInProgress, ingredient]);
    }
  }

  return ingredientsToRender.map(({ item, measure }, index) => (
    item === '' || !item ? null
      : (
        <label
          key={ index }
          htmlFor={ `${index}checkbox` }
          className={ checkIngredients(item) ? 'dashed-ingredient' : '' }
          data-testid={ `${index}-ingredient-step` }
        >
          <input
            type="checkbox"
            id={ `${index}checkbox` }
            checked={ checkIngredients(item) }
            onChange={ (ev) => addOrRemoveIngredient(ev, item) }
          />
          {`${item}: ${measure || 'to taste'}`}
        </label>)
  ));
}

RenderIngredientCheckboxes.propTypes = PropTypes.shape({
  data: PropTypes.objectOf(PropTypes.any),
  url: PropTypes.string,
  id: PropTypes.string,
  setArrayState: PropTypes.func,
}).isRequired;

export default RenderIngredientCheckboxes;
