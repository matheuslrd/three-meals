import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import BtnFavoriteRecipe from '../Components/BtnFavoriteRecipe';
import Button from '../Components/Button';

import requestApi from '../Services/requestApi';
import UrlIncludes from '../Helper/UrlIncludes';
import RenderIngredientCheckboxes from '../Components/RenderIngredientCheckboxes';

function InProgressRecipe({ match: { url } }) {
  const { id } = useParams();
  const [foodData, setFoodData] = useState({});
  const [remainingIngredients, setRemainingIngredients] = useState(['to disable btn']);

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

  return (
    <main className="details">
      <section className="recipe-informations">
        <header className="header-details">
          <Button hasLink={ UrlIncludes(url, 'comidas', '/comidas', '/bebidas') }>
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
          <RenderIngredientCheckboxes
            data={ foodData }
            url={ url }
            id={ id }
            setArrayState={ setRemainingIngredients }
          />
        </ol>

        <p data-testid="instructions">
          Instructions:
          {foodData.strInstructions}
        </p>
      </section>

      <footer>
        <Button
          disabled={ remainingIngredients.length > 0 }
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
};

export default InProgressRecipe;
