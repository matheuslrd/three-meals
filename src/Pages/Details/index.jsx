import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import copy from 'clipboard-copy';
import { BiArrowBack } from 'react-icons/bi';

import ShareBtn from '../../images/shareIcon.svg';

import Carousel from './components/Carousel';
import BtnFavoriteRecipe from './components/BtnFavoriteRecipe';
import Button from '../../Components/Button';
import VideoIframe from './components/VideoIframe';
import BtnInitOrContinueRecipe from './components/BtnInitOrContinueRecipe';

import './styles/Details.css';

import requestApi from '../../Services/requestApi';
import GetIngredients from '../../Helper/GetIngredients';

function Details({ match: { url }, history: { goBack } }) {
  const { id } = useParams();
  const [foodData, setFoodData] = useState({});
  const [shareLink, setShareLink] = useState(false);

  useEffect(() => {
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

    fetchFood();
  }, [id, url]);

  function filterIngredients() {
    const ingredientsArray = GetIngredients(foodData);

    return ingredientsArray.map(({ item, measure }, index) => (
      item === '' || !item ? null
        : (
          <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {`${item}: ${measure || 'to taste'}`}
          </li>)
    ));
  }

  function copyLink() {
    const TIMEOUT = 3500;

    copy(`http://localhost:3000${url}`);

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
              dataTestId="share-btn"
              src={ ShareBtn }
            >
              { shareLink
                ? 'Link copiado!' : <img src={ ShareBtn } alt="Compartilhe!" /> }
            </Button>
            <BtnFavoriteRecipe
              className="favorite-btn"
              id={ id }
              url={ url }
              foodData={ foodData }
              dataTestId="favorite-btn"
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
          <ul className="ingredients-li">
            { filterIngredients() }
          </ul>
        </div>
        <h1 className="title-container">Instructions:</h1>
        <div className="instructions-container">
          <p data-testid="instructions">
            {foodData.strInstructions}
          </p>
        </div>
      </section>
      <div className="video-frame">
        <VideoIframe data={ foodData } />
      </div>
      <Carousel url={ url } />
      <footer>
        <BtnInitOrContinueRecipe
          id={ id }
          url={ url }
          ingredients={ GetIngredients(foodData) }
        />
      </footer>
    </main>
  );
}

Details.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Details;
