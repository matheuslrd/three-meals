import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

import { ToLocalStorage, GetLocalStorage } from '../Helper/ToLocalStorage';

function BtnInitOrContinueRecipe({ id, url, ingredients }) {
  function startRecipe() {
    const storage = GetLocalStorage('inProgressRecipes');

    const ingredientsArray = ingredients.reduce((acc, { item }) => {
      if (item !== '' && item !== null) acc.push(item);
      return acc;
    }, []);

    const recipeObject = url.includes('comidas')
      ? { ...storage, meals: { ...storage.meals, [id]: ingredientsArray } }
      : { ...storage, cocktails: { ...storage.cocktails, [id]: ingredientsArray } };

    ToLocalStorage('inProgressRecipes', recipeObject);
  }

  function conditionalButton() {
    const doneRecipes = GetLocalStorage('doneRecipes') || [];
    const recipeIsDone = doneRecipes
      .every((recipe) => recipe.id.toString() !== id);

    const inProgressRecipes = GetLocalStorage('inProgressRecipes')
      || { cocktails: {}, meals: {} };
    const recipeIsInProgress = inProgressRecipes.cocktails
      ? inProgressRecipes.cocktails[id] || inProgressRecipes.meals[id]
      : inProgressRecipes.meals[id] || inProgressRecipes.cocktails[id];

    if (recipeIsDone) {
      return recipeIsInProgress
        ? (
          <Button
            className="footer-details"
            dataTestId="start-recipe-btn"
          >
            Continuar Receita
          </Button>)
        : (
          <Button
            className="footer-details"
            dataTestId="start-recipe-btn"
            onClick={ startRecipe }
          >
            Start Recipe
          </Button>);
    }

    return null;
  }

  return conditionalButton();
}

BtnInitOrContinueRecipe.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default BtnInitOrContinueRecipe;
