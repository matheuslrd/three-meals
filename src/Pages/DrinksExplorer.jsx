import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import Header from '../Components/Header';
import Button from '../Components/Button';
import Footer from '../Components/Footer';

import requestApi from '../Services/requestApi';

function DrinksExplorer() {
  const [randomRecipe, setRandomRecipe] = useState({});

  const RANDOM_URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  function fetchRandomRecipe() {
    requestApi(RANDOM_URL)
      .then((result) => setRandomRecipe(result.drinks[0]));
  }

  return (
    <main className="recipes-explorer">
      { randomRecipe.idDrink && <Redirect to={ `/bebidas/${randomRecipe.idDrink}` } />}
      <Header
        disabledSearch
      >
        Explorar Bebidas
      </Header>
      <Button
        className="explorer-btn"
        dataTestId="explore-by-ingredient"
        hasLink="/explorar/bebidas/ingredientes"
      >
        Por Ingredientes
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

export default DrinksExplorer;
