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
  pathName: PropTypes.string,
  id: PropTypes.string,
  index: PropTypes.number,
  recipeImg: PropTypes.string,
  recipeName: PropTypes.string,
};

CardRecipe.defaultProps = {
  pathName: null,
  id: null,
  index: null,
  recipeImg: null,
  recipeName: null,
};

export default CardRecipe;
