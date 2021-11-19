import React, { useState, useEffect } from 'react';

import Header from '../../Components/Header';
import ButtonsFilter from '../../Components/ButtonsFilter';
import DoneRecipeCard from './components/DoneRecipeCard';

import { GetLocalStorage } from '../../Helper/ToLocalStorage';

import './styles/doneRecipes.css';

function RecipesMade() {
  const [doneRecipesData, setDoneRecipesData] = useState([]);

  useEffect(() => {
    const doneRecipesStore = GetLocalStorage('doneRecipes') || [];
    setDoneRecipesData(doneRecipesStore);
  }, []);

  return (
    <main className="done-recipes">
      <Header disabledSearch>
        Receitas Feitas
      </Header>
      <section className="done-recipes-section">
        <ButtonsFilter
          setArray={ setDoneRecipesData }
          localStorageKey="doneRecipes"
        />
        {
          doneRecipesData.length > 0 && doneRecipesData.map((recipe, ind) => (
            <DoneRecipeCard
              key={ recipe.id }
              recipeData={ recipe }
              index={ ind }
            />
          ))
        }
      </section>
    </main>
  );
}

export default RecipesMade;
