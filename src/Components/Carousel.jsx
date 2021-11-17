import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import CardRecipe from './CardRecipe';

import requestApi from '../Services/requestApi';

function Carousel({ url }) {
  const [recommendedData, setRecommendedData] = useState([]);

  useEffect(() => {
    async function requestRecommendedRecipes() {
      const URL_API = url.includes('comidas')
        ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
        : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

      const resolve = await requestApi(URL_API);
      setRecommendedData(resolve.meals || resolve.drinks);
    }

    requestRecommendedRecipes();
  }, [url]);

  function showRecommendedCards() {
    const numMaxRecommendedRecipes = 6;
    const pathName = url.includes('comidas')
      ? '/bebidas'
      : '/comidas';

    return (
      recommendedData.slice(0, numMaxRecommendedRecipes)
        .map((recipe, index) => (
          <CardRecipe
            className="recipe-card-recommended"
            id={ recipe.idMeal || recipe.idDrink }
            key={ index }
            pathName={ pathName }
            recipeImg={ recipe.strMealThumb || recipe.strDrinkThumb }
            recipeName={ recipe.strMeal || recipe.strDrink }
            testId={ `${index}-recomendation-card` }
            testIdTitle={ `${index}-recomendation-title` }
            testIdImg={ `${index}-card-img` }
          />
        ))
    );
  }

  return (
    <div className="carousel-container">
      <h2 data-testid="0-recomendation-title">
        Recomendadas
      </h2>
      <div className="container-cards">
        { recommendedData.length > 0 ? showRecommendedCards() : '...loading' }
      </div>
    </div>
  );
}

Carousel.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Carousel;
