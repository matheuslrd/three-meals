import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { ToLocalStorage, GetLocalStorage } from '../Helper/ToLocalStorage';

import Button from './Button';

import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function BtnFavoriteRecipe({ id, url, foodData }) {
  const [iconFavorite, setIconFavorite] = useState(false);

  useEffect(() => {
    function verifyRecipeInFavorites() {
      const favoriteRecipes = GetLocalStorage('favoriteRecipes') || [];
      const inFavoriteOrNot = favoriteRecipes.some((recipe) => recipe.id === id);
      return inFavoriteOrNot;
    }

    setIconFavorite(verifyRecipeInFavorites());
  }, [id]);

  function filterKeysRecipes(recipe) {
    const idRecipe = recipe.idMeal || recipe.idDrink;
    const name = recipe.strMeal || recipe.strDrink;
    const image = recipe.strMealThumb || recipe.strDrinkThumb;
    const { strArea, strCategory } = recipe;

    return {
      id: idRecipe,
      type: url.includes('comidas') ? 'comida' : 'bebida',
      area: strArea || '',
      category: strCategory,
      alcoholicOrNot: url.includes('comidas') ? '' : recipe.strAlcoholic,
      name,
      image,
    };
  }

  function addToFavorite() {
    const favoriteRecipes = GetLocalStorage('favoriteRecipes') || [];
    const newRecipe = filterKeysRecipes(foodData);

    setIconFavorite(!iconFavorite);

    const inFavoriteOrNot = favoriteRecipes.some((recipe) => recipe.id === id);

    if (inFavoriteOrNot) {
      const listFavoritesRemoveRecipe = favoriteRecipes
        .filter((recipe) => recipe.id !== id);

      return ToLocalStorage('favoriteRecipes', listFavoritesRemoveRecipe);
    }

    return ToLocalStorage('favoriteRecipes', [...favoriteRecipes, newRecipe]);
  }

  return (
    <Button
      dataTestId="favorite-btn"
      onClick={ addToFavorite }
      src={ iconFavorite ? blackHeartIcon : whiteHeartIcon }
    >
      <img src={ iconFavorite ? blackHeartIcon : whiteHeartIcon } alt="Favorite Icon" />
    </Button>
  );
}

BtnFavoriteRecipe.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  foodData: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default BtnFavoriteRecipe;
