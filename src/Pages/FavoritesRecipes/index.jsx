import React, { useState, useEffect } from 'react';

import ButtonsFilter from '../../Components/ButtonsFilter';
import CardRecipeFavorite from './components/CardRecipeFavorite';
import Header from '../../Components/Header';

import { GetLocalStorage } from '../../Helper/ToLocalStorage';

import './styles/favoriteRecipes.css';

function FavoritesRecipes() {
  const [favoritesRecipes, setFavoritesRecipes] = useState([]);

  useEffect(() => {
    const favoriteRecipesStorage = GetLocalStorage('favoriteRecipes');

    setFavoritesRecipes(favoriteRecipesStorage);
  }, []);

  return (
    <main className="FavoritesRecipes">
      <Header disabledSearch>
        Receitas Favoritas
      </Header>

      <article className="main-content-favorite-recipes">
        <ButtonsFilter
          setArray={ setFavoritesRecipes }
          localStorageKey="favoriteRecipes"
        />

        <section className="recipes-container">
          {
            favoritesRecipes.map((recipe, index) => (
              <CardRecipeFavorite
                index={ index }
                key={ index }
                recipe={ recipe }
                setFavoritesRecipes={ setFavoritesRecipes }
              />
            ))
          }
        </section>
      </article>
    </main>
  );
}

export default FavoritesRecipes;
