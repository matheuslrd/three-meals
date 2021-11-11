/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router';

import Carousel from '../Components/Carousel';
import Button from '../Components/Button';
import VideoIframe from '../Components/VideoIframe';

// import { MyContext } from '../Context/MyContext';

import '../Styles/Details.css';

import requestApi from '../Services/requestApi';

// 178319 bebida
// 52977 comida

function Details({ match: { url } }) {
  console.log(url);
  // const { filterUrl } = useContext(MyContext);
  const { id } = useParams();
  const [foodData, setFoodData] = useState([]);

  async function fetchFood() {
    const URL_API = url.includes('comidas')
      ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const resolve = await requestApi(URL_API);
    const fetchResult = resolve.meals || resolve.drinks;
    setFoodData(fetchResult[0]);
  }

  useEffect(() => {
    fetchFood();
  }, []);

  function filterIngredients() {
    const keysFoodData = Object.keys(foodData);
    const keysIngredients = keysFoodData.filter((key) => key.includes('strIngredient'));
    const keysMeasureData = Object.keys(foodData);
    const keysMeasures = keysMeasureData.filter((key) => key.includes('strMeasure'));

    return keysIngredients.map((ingredient, index) => (
      foodData[ingredient] === '' || !foodData[ingredient] ? null
        : (
          <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {`${foodData[ingredient]}: ${foodData[keysMeasures[index]] || 'to taste'}`}
          </li>)
    ));
  }

  useEffect(() => {
    filterIngredients();
  }, [foodData]);

  return (
    <main className="Details">
      <img
        className="foodPhoto"
        src={ foodData.strMealThumb || foodData.strDrinkThumb }
        data-testid="recipe-photo"
        alt="food/drinks"
      />
      <h1 data-testid="recipe-title">
        { foodData.strMeal || foodData.strDrink }
      </h1>
      <Button dataTestId="share-btn">
        Share
      </Button>
      <Button dataTestId="favorite-btn">
        Favorite
      </Button>
      { foodData.strAlcoholic ? (
        <>
          <p>{ foodData.strCategory }</p>
          <p data-testid="recipe-category">{foodData.strAlcoholic}</p>
        </>
      )
        : <p data-testid="recipe-category">{foodData.strCategory}</p> }
      <ol>
        { filterIngredients() }
      </ol>
      <p data-testid="instructions">
        Instructions:
        {foodData.strInstructions}
      </p>
      <VideoIframe data={ foodData } />
      <Carousel />
      <Button dataTestId="start-recipe-btn">Start Recipe</Button>
    </main>
  );
}

export default Details;
