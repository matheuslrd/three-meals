import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';

import ShareBtn from '../../../images/shareIcon.svg';

import Button from '../../../Components/Button';
import BtnFavoriteRecipe from '../../Details/components/BtnFavoriteRecipe';

function DoneRecipeCard({ recipeData, index }) {
  const { id, image, area, category, name,
    doneDate, tags, type, alcoholicOrNot } = recipeData;

  const [shareLink, setShareLink] = useState(false);

  function copyLink() {
    const TIMEOUT = 3500;

    copy(`http://localhost:3000/${type}s/${id}`);

    setShareLink(true);
    setTimeout(() => setShareLink(false), TIMEOUT);
  }

  return (
    <div className="done-recipe-card">
      <Link to={ `/${type}s/${id}` }>
        <img
          src={ image }
          alt="done recipe"
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <div>
        <p data-testid={ `${index}-horizontal-top-text` }>
          { type === 'comida'
            ? `${area} - ${category}` : `${category} - ${alcoholicOrNot}` }
        </p>
        <Link to={ `/${type}s/${id}` }>
          <h4 data-testid={ `${index}-horizontal-name` }>{ name }</h4>
        </Link>
        <p data-testid={ `${index}-horizontal-done-date` }>
          { `Done at: ${doneDate}` }
        </p>
        <Button
          dataTestId={ `${index}-horizontal-share-btn` }
          src={ ShareBtn }
          onClick={ copyLink }
        >
          { shareLink ? 'Link copiado!' : <img src={ ShareBtn } alt="compartilhe!" /> }
        </Button>
        <BtnFavoriteRecipe
          id={ id }
          dataTestId=""
          url={ type }
          foodData={ recipeData }
        />
        { tags.slice(0, 2).map((tag) => (
          <span key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
            { tag }
          </span>
        )) }
      </div>
    </div>
  );
}

DoneRecipeCard.propTypes = {
  recipeData: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};

export default DoneRecipeCard;
