import React from 'react';

import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

function CardRecipe({ className, pathName, id, index, recipeImg, recipeName, testId }) {
  return (
    <Link to={ `${pathName}/${id}` } className={ `recipe-card ${className}` }>
      <div data-testid={ testId }>
        <img src={ recipeImg } alt="recipe card" data-testid={ `${index}-card-img` } />
        <span data-testid={ `${index}-card-name` }>{ recipeName }</span>
      </div>
    </Link>
  );
}

CardRecipe.propTypes = {
  className: PropTypes.string,
  pathName: PropTypes.string,
  id: PropTypes.string,
  index: PropTypes.number,
  testId: PropTypes.string,
  recipeImg: PropTypes.string,
  recipeName: PropTypes.string,
};

CardRecipe.defaultProps = {
  className: null,
  pathName: null,
  id: null,
  index: null,
  testId: null,
  recipeImg: null,
  recipeName: null,
};

export default CardRecipe;
