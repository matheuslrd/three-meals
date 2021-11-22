import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import copy from 'clipboard-copy';

import { BiArrowBack } from 'react-icons/bi';
import ShareBtn from '../../images/shareIcon.svg';

import BtnFavoriteRecipe from '../Details/components/BtnFavoriteRecipe';
import Button from '../../Components/Button';
import RenderIngredientCheckboxes from './components/RenderIngredientCheckboxes';

import requestApi from '../../Services/requestApi';
import UrlIncludes from '../../Helper/UrlIncludes';
import { ToLocalStorage, GetLocalStorage } from '../../Helper/ToLocalStorage';
import GetObjectToFavorite from '../../Helper/GetObjectToFavorite';

import '../Details/styles/Details.css';

function InProgressRecipe({ match: { url }, history: { goBack } }) {
  const { id } = useParams();
  const [foodData, setFoodData] = useState({});
  const [remainingIngredients, setRemainingIngredients] = useState(['to disable btn']);
  const [shareLink, setShareLink] = useState(false);

  useEffect(() => {
    async function fetchFood() {
      const links = {
        foodLink: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
        drinkLink: `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
      };

      const URL_API = UrlIncludes(url, 'comidas', links.foodLink, links.drinkLink);
      const resolve = await requestApi(URL_API);
      const fetchResult = resolve.meals || resolve.drinks;
      setFoodData(fetchResult[0]);
    }

    fetchFood();
  }, [id, url]);

  function finishRecipe(recipe) {
    const idRecipe = recipe.idMeal || recipe.idDrink;
    const name = recipe.strMeal || recipe.strDrink;
    const image = recipe.strMealThumb || recipe.strDrinkThumb;
    const { strArea, strCategory: category, strAlcoholic,
      strTags } = recipe;

    const getDate = Date();
    const date = new Date(getDate);
    const doneDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    const recipeObject = {
      id: idRecipe,
      type: UrlIncludes(url, 'comidas', 'comida', 'bebida'),
      area: strArea || '',
      category,
      alcoholicOrNot: strAlcoholic || '',
      name,
      image,
      doneDate,
      tags: strTags ? strTags.split(', ') : [],
    };

    const doneRecipes = GetLocalStorage('doneRecipes');
    ToLocalStorage('doneRecipes', [...doneRecipes, recipeObject]);
  }

  function copyLink() {
    const TIMEOUT = 3500;
    const recipeObj = GetObjectToFavorite(foodData, url);

    copy(`http://localhost:3000/${recipeObj.type}s/${recipeObj.id}`);

    setShareLink(true);
    setTimeout(() => setShareLink(false), TIMEOUT);
  }

  return (
    <main className="details">
      <section className="recipe-informations">
        <div className="header-container">
          <img
            className="foodPhoto"
            src={ foodData.strMealThumb || foodData.strDrinkThumb }
            data-testid="recipe-photo"
            alt="food/drinks"
          />
          <Button
            className="back-btn"
            onClick={ () => goBack() }
          >
            <BiArrowBack size="2rem" />
          </Button>
        </div>
        <div className="button-container">
          <header className="header-details">
            <h1 className="recipe-title" data-testid="recipe-title">
              { foodData.strMeal || foodData.strDrink }
            </h1>
          </header>
          <div>
            <Button
              className="share-btn"
              onClick={ copyLink }
              src={ ShareBtn }
              dataTestId="share-btn"
            >
              { shareLink
                ? 'Link copiado!' : <img src={ ShareBtn } alt="Compartilhe!" /> }
            </Button>
            <BtnFavoriteRecipe
              className="favorite-btn"
              id={ id }
              dataTestId="favorite-btn"
              url={ url }
              foodData={ foodData }
            />
          </div>
        </div>
        <div className="is-alcoholic">
          {
            (foodData.strAlcoholic) ? (
              <>
                <p className="category">{ foodData.strCategory }</p>
                <p data-testid="recipe-category">{foodData.strAlcoholic}</p>
              </>
            )
              : (
                <p
                  className="category"
                  data-testid="recipe-category"
                >
                  {foodData.strCategory}
                </p>
              )
          }
        </div>
        <h1 className="title-container">Ingredients:</h1>
        <div className="ingredients">
          <RenderIngredientCheckboxes
            data={ foodData }
            url={ url }
            id={ id }
            setArrayState={ setRemainingIngredients }
          />
        </div>
        <h1 className="title-container">Instructions:</h1>
        <div className="instructions-container">
          <p data-testid="instructions">
            {foodData.strInstructions}
          </p>
        </div>
      </section>

      <footer>
        <Button
          className="finish-btn"
          disabled={ remainingIngredients.length > 0 }
          onClick={ () => finishRecipe(foodData) }
          dataTestId="finish-recipe-btn"
          hasLink="/receitas-feitas"
        >
          Finish Recipe
        </Button>
      </footer>
    </main>
  );
}

InProgressRecipe.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.shape(PropTypes.func).isRequired,
};

export default InProgressRecipe;
