import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';

import Button from '../../../Components/Button';

import { ToLocalStorage, GetLocalStorage } from '../../../Helper/ToLocalStorage';

import blackHeartIcon from '../../../images/blackHeartIcon.svg';
import shareIcon from '../../../images/shareIcon.svg';

export default function BtnsFavoriteAndShare({ index, id, setFavoritesRecipes, type }) {
  const [shareLink, setShareLink] = useState(false);

  function removeFavorite() {
    const favoriteRecipes = GetLocalStorage('favoriteRecipes') || [];

    const listFavoritesRemoveRecipe = favoriteRecipes
      .filter((recipeItem) => recipeItem.id !== id);

    ToLocalStorage('favoriteRecipes', listFavoritesRemoveRecipe);
    setFavoritesRecipes(listFavoritesRemoveRecipe);
  }

  function copyLink() {
    const TIMEOUT = 2000;

    copy(`http://localhost:3000/${type}s/${id}`);

    setShareLink(true);
    setTimeout(() => setShareLink(false), TIMEOUT);
  }

  const shareImage = (<img src={ shareIcon } alt="share" />);

  return (
    <>
      <Button
        dataTestId={ `${index}-horizontal-share-btn` }
        src={ shareIcon }
        onClick={ copyLink }
      >
        { shareLink ? 'Link copiado!' : shareImage }
      </Button>

      <Button
        dataTestId={ `${index}-horizontal-favorite-btn` }
        src={ blackHeartIcon }
        onClick={ removeFavorite }
      >
        <img src={ blackHeartIcon } alt="favorite" />
      </Button>
    </>
  );
}

BtnsFavoriteAndShare.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  setFavoritesRecipes: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};
