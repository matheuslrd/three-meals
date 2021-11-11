import React, { useEffect, useState, useContext } from 'react';

import CardRecipe from './CardRecipe';

import { MyContext } from '../Context/MyContext';

import requestApi from '../Services/requestApi';

function Carousel() {
  const [recommendedData, setRecommendedData] = useState([]);

  const { filterUrl } = useContext(MyContext);

  async function requestRecommendedRecipes() {
    const url = filterUrl.includes('meal')
      ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
      : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

    const resolve = await requestApi(url);
    setRecommendedData(resolve.meals || resolve.drinks);
  }

  useEffect(() => {
    requestRecommendedRecipes();
  }, []);

  function showRecommendedCards() {
    const numMaxRecommendedRecipes = 6;
    const pathName = filterUrl.includes('meal')
      ? '/bebidas'
      : '/comidas';

    return (
      recommendedData.slice(0, numMaxRecommendedRecipes)
        .map((recipe, index) => (
          <CardRecipe
            className="recipe-card-recommended"
            key={ index }
            testId={ `${index}-recomendation-card` }
            id={ recipe.idMeal || recipe.idDrink }
            pathName={ pathName }
            recipeImg={ recipe.strMealThumb || recipe.strDrinkThumb }
            recipeName={ recipe.strMeal || recipe.strDrink }
          />
        ))
    );
  }

  return (
    <div className="carousel-container">
      <h2> Recomendadas </h2>
      <div className="container-cards">
        { recommendedData.length > 0 ? showRecommendedCards() : '...loading' }
      </div>
    </div>
  );
}

export default Carousel;
