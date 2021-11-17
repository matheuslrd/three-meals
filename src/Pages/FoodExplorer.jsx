import React, { useState } from 'react';

import { Redirect } from 'react-router-dom';
import Footer from '../Components/Footer';
import Button from '../Components/Button';
import Header from '../Components/Header';

import requestApi from '../Services/requestApi';

function FoodExplorer() {
  const [randomRecipe, setRandomRecipe] = useState({});

  const RANDOM_URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
  function fetchRandomRecipe() {
    requestApi(RANDOM_URL)
      .then((result) => setRandomRecipe(result.meals[0]));
  }

  return (
    <main className="recipes-explorer">
      { randomRecipe.idMeal && <Redirect to={ `/comidas/${randomRecipe.idMeal}` } />}
      <Header disabledSearch>
        Explorar Comidas
      </Header>
      <Button
        className="explorer-btn"
        dataTestId="explore-by-ingredient"
        hasLink="/explorar/comidas/ingredientes"
      >
        Por Ingredientes
      </Button>
      <Button
        className="explorer-btn"
        dataTestId="explore-by-area"
        hasLink="/explorar/comidas/area"
      >
        Por Local de Origem
      </Button>
      <Button
        className="explorer-btn"
        dataTestId="explore-surprise"
        onClick={ fetchRandomRecipe }
      >
        Me Surpreenda!
      </Button>
      <Footer />
    </main>
  );
}

export default FoodExplorer;
