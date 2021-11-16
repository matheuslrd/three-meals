import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';

import Carousel from '../Components/Carousel';
import Button from '../Components/Button';
import VideoIframe from '../Components/VideoIframe';
import BtnFavoriteRecipe from '../Components/BtnFavoriteRecipe';

import '../Styles/Details.css';

import requestApi from '../Services/requestApi';
import { ToLocalStorage, GetLocalStorage } from '../Helper/ToLocalStorage';
// 178319 bebida
// 52977 comida

function Details({ match: { url } }) {
  const { id } = useParams();
  const [foodData, setFoodData] = useState([]);

  async function fetchFood() {
    const links = {
      foodLink: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      drinkLink: `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
    };

    const URL_API = url.includes('comidas') ? links.foodLink : links.drinkLink;
    const resolve = await requestApi(URL_API);
    const fetchResult = resolve.meals || resolve.drinks;
    setFoodData(fetchResult[0]);
  }

  useEffect(() => {
    fetchFood();
  }, []);

  function getIngredients() {
    const keysFoodData = Object.keys(foodData);
    const keysIngredients = keysFoodData.filter((key) => key.includes('strIngredient'));
    const keysMeasureData = Object.keys(foodData);
    const keysMeasures = keysMeasureData.filter((key) => key.includes('strMeasure'));
    return keysIngredients
      .map((ingredient, index) => {
        const item = foodData[ingredient];
        const measure = foodData[keysMeasures[index]];
        return {
          item, measure,
        };
      });
  }

  function filterIngredients() {
    const ingredientsArray = getIngredients();

    return ingredientsArray.map(({ item, measure }, index) => (
      item === '' || !item ? null
        : (
          <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {`${item}: ${measure || 'to taste'}`}
          </li>)
    ));
  }

  useEffect(() => {
    filterIngredients();
  }, [foodData]);

  function startRecipe() {
    const storage = GetLocalStorage('inProgressRecipes');
    // { cocktails: {idDrink: [ingredients]}, meals: {} }

    const urlCondition = url.includes('comidas');
    const ingreditsArray = getIngredients().reduce((acc, { item }) => {
      if (item !== '' && item !== null) acc.push(item);
      return acc;
    }, []);

    const recipeObject = urlCondition
      ? { ...storage, meals: { ...storage.meals, [id]: ingreditsArray } }
      : { ...storage, cocktails: { ...storage.cocktails, [id]: ingreditsArray } };

    ToLocalStorage('inProgressRecipes', recipeObject);
  }

  function verifyProgress() {
    const doneRecipe = GetLocalStorage('doneRecipes');
    const inProgress = GetLocalStorage('inProgressRecipes').cocktails[id]
      || GetLocalStorage('inProgressRecipes').meals[id];

    const btnContinueRecipe = (
      <Button
        className="footer-details"
      >
        Continuar Receita
      </Button>
    );

    const btnStartRecipe = (
      <Button
        className="footer-details"
        dataTestId="start-recipe-btn"
        onClick={ startRecipe }
      >
        Start Recipe
      </Button>
    );

    if (!doneRecipe.some((recipe) => recipe.id.toString() === id)) {
      return inProgress ? btnContinueRecipe : btnStartRecipe;
    }

    return null;
  }

  return (
    <main className="Details">
      { console.log(getIngredients()) }
      <section className="recipe-informations">
        <header className="header-details">
          <img
            className="foodPhoto"
            src={ foodData.strMealThumb || foodData.strDrinkThumb }
            data-testid="recipe-photo"
            alt="food/drinks"
          />
          <h1 data-testid="recipe-title">
            { foodData.strMeal || foodData.strDrink }
          </h1>
        </header>

        <div className="share-and-favorite">
          <Button dataTestId="share-btn">
            Share
          </Button>
          <BtnFavoriteRecipe
            id={ id }
            url={ url }
            foodData={ foodData }
          />
        </div>

        <div className="is-alcoholic">
          {
            (foodData.strAlcoholic) ? (
              <>
                <p>{ foodData.strCategory }</p>
                <p data-testid="recipe-category">{foodData.strAlcoholic}</p>
              </>
            )
              : <p data-testid="recipe-category">{foodData.strCategory}</p>
          }
        </div>

        <ol>
          { filterIngredients() }
        </ol>

        <p data-testid="instructions">
          Instructions:
          {foodData.strInstructions}
        </p>
      </section>

      <VideoIframe data={ foodData } />
      <Carousel url={ url } />
      <footer>
        {verifyProgress()}
      </footer>
    </main>
  );
}

Details.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
    includes: PropTypes.func,
  }).isRequired,
};

export default Details;
