import React, { useState, useEffect } from 'react';

import Header from '../Components/Header';
import Button from '../Components/Button';

import { GetLocalStorage } from '../Helper/ToLocalStorage';

function RecipesMade() {
  const [doneRecipesData, setDoneRecipesData] = useState([]);

  useEffect(() => {
    const doneRecipesStore = GetLocalStorage('doneRecipes');
    setDoneRecipesData(doneRecipesStore);
  }, []);

  return (
    <main className="RecipesMade">
      <Header disabledSearch>Receitas Feitas</Header>
      <section className="done-recipes">
        <nav className="filter-done-recipes">
          <Button dataTestId="filter-by-all-btn">All</Button>
          <Button dataTestId="filter-by-food-btn">Food</Button>
          <Button dataTestId="filter-by-drink-btn">Drinks</Button>
        </nav>
        {doneRecipesData.length > 0 && doneRecipesData.map((recipe, ind) => (
          <div key={ recipe.id }>
            <img
              src={ recipe.image }
              alt="done recipe"
              data-testid={ `${ind}-horizontal-image` }
            />
            <p data-testid={ `${ind}-horizontal-top-text` }>{recipe.category}</p>
            <h4 data-testid={ `${ind}-horizontal-name` }>{ recipe.name }</h4>
            <p data-testid={ `${ind}-horizontal-done-date` }>{recipe.doneDate}</p>
            <p data-testid={ `${ind}-horizontal-tag` }>{ recipe.tags }</p>
          </div>
        )) }
      </section>
    </main>
  );
}

export default RecipesMade;
