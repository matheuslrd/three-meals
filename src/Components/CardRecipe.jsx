import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CardRecipe(props) {
  const { id, testId, pathName, className,
    recipeImg, recipeName, testIdImg, testIdTitle } = props;

  return (
    <Link to={ `${pathName}/${id}` }>
      <div data-testid={ testId } className={ `recipe-card ${className}` }>
        <img
          alt="recipe card"
          className="img-recipe"
          data-testid={ testIdImg }
          src={ recipeImg }
        />
        <span className="title-recipe" data-testid={ testIdTitle }>
          { recipeName }
        </span>
      </div>
    </Link>
  );
}

CardRecipe.propTypes = {
  className: PropTypes.string,
  pathName: PropTypes.string.isRequired,
  id: PropTypes.string,
  testId: PropTypes.string,
  testIdImg: PropTypes.string,
  testIdTitle: PropTypes.string,
  recipeImg: PropTypes.string,
  recipeName: PropTypes.string,
};

CardRecipe.defaultProps = {
  className: '',
  id: '',
  testIdTitle: null,
  testIdImg: null,
  testId: null,
  recipeImg: null,
  recipeName: '',
};

export default CardRecipe;
