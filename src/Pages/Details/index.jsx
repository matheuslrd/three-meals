import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import copy from 'clipboard-copy';

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
        <header className="header-details">
          <Button
            onClick={ () => goBack() }
          >
            ↶
          </Button>
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
          <Button
            onClick={ copyLink }
            dataTestId="share-btn"
            src={ ShareBtn }
          >
            { shareLink
              ? 'Link copiado!' : <img src={ ShareBtn } alt="Compartilhe!" /> }
          </Button>
          <BtnFavoriteRecipe
            id={ id }
            url={ url }
            foodData={ foodData }
            dataTestId="favorite-btn"
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
