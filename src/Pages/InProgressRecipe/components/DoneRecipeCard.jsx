import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../Components/Button';
import BtnFavoriteRecipe from '../../Details/components/BtnFavoriteRecipe';

function DoneRecipeCard({ recipeData, index }) {
  const { id, image, category, name, doneDate, tags, type } = recipeData;
  return (
    <div key={ id } className="done-recipe-card">
      <img
        src={ image }
        alt="done recipe"
        data-testid={ `${index}-horizontal-image` }
      />
      <div>
        <p data-testid={ `${index}-horizontal-top-text` }>{ category }</p>
        <h4 data-testid={ `${index}-horizontal-name` }>{ name }</h4>
        <p data-testid={ `${index}-horizontal-done-date` }>
          { `Done at: ${doneDate}` }
        </p>
        <p data-testid={ `${index}-horizontal-tag` }>{ tags }</p>
        <Button dataTestId={ `${index}-horizontal-share-btn` }>
          Share
        </Button>
        <BtnFavoriteRecipe
          id={ id }
          dataTestId=""
          url={ type }
          foodData={ recipe }
        />
      </div>
    </div>
  );
}

DoneRecipeCard.propTypes = {
  recipeData: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};

export default DoneRecipeCard;
