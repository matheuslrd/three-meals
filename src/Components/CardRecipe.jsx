import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CardRecipe({ pathName, id, index, recipeImg, recipeName }) {
  return (
    <Link to={ `${pathName}/${id}` } className="recipe-card">
      <div data-testid={ `${index}-recipe-card` }>
        <img src={ recipeImg } alt="recipe card" data-testid={ `${index}-card-img` } />
        <span data-testid={ `${index}-card-name` }>{ recipeName }</span>
      </div>
    </Link>
  );
}

CardRecipe.propTypes = {
  pathName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  recipeImg: PropTypes.string.isRequired,
  recipeName: PropTypes.string.isRequired,
};

export default CardRecipe;
