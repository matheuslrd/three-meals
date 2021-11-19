import React from 'react';

import PropTypes from 'prop-types';

import Button from '../../../Components/Button';

import blackHeartIcon from '../../../images/blackHeartIcon.svg';
import shareIcon from '../../../images/shareIcon.svg';

import { ToLocalStorage, GetLocalStorage } from '../../../Helper/ToLocalStorage';

export default function CardRecipeFavorite({ recipe, index, setFavoritesRecipes }) {
  const { image, category, name, id, area, type, alcoholicOrNot } = recipe;

  function removeFavorite() {
    const favoriteRecipes = GetLocalStorage('favoriteRecipes') || [];

    const listFavoritesRemoveRecipe = favoriteRecipes
      .filter((recipeItem) => recipeItem.id !== id);

    ToLocalStorage('favoriteRecipes', listFavoritesRemoveRecipe);
    setFavoritesRecipes(listFavoritesRemoveRecipe);
  }

  const categoryAndArea = (
    <p data-testid={ `${index}-horizontal-top-text` }>
      { `${area} - ${category}` }
    </p>
  );

  const alcoholic = (
    <p data-testid={ `${index}-horizontal-top-text` }>
      { alcoholicOrNot }
    </p>
  );

  return (
    <div className="recipe-favorite">
      <section className="container-img">
        <img
          alt={ `Foto ${name}` }
          className="img-recipe-favorite"
          data-testid={ `${index}-horizontal-image` }
          src={ image }
        />
      </section>

      <section className="recipe-infos">
        <h2 data-testid={ `${index}-horizontal-name` }>
          { name }
        </h2>
        <div className="category-or-alcoholic">
          { type === 'comida' ? categoryAndArea : alcoholic }
        </div>
        <div className="btns-favorite-share">
          <Button
            dataTestId={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
          >
            <img src={ shareIcon } alt="share" />
          </Button>

          <Button
            dataTestId={ `${index}-horizontal-favorite-btn` }
            src={ blackHeartIcon }
            onClick={ removeFavorite }
          >
            <img src={ blackHeartIcon } alt="favorite" />
          </Button>
        </div>
      </section>
    </div>
  );
}

CardRecipeFavorite.propTypes = {
  recipe: PropTypes.shape({
    alcoholicOrNot: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  setFavoritesRecipes: PropTypes.func.isRequired,
};
