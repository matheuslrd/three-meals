import React, { useContext, useEffect, useState } from 'react';

import CardRecipe from '../Components/CardRecipe';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

import { MyContext } from '../Context/MyContext';

function MainRecipes() {
  const { data, filterUrl, setFilterUrl, mealCategories } = useContext(MyContext);
  const [filter, setFilter] = useState('');
  const [recipes, setRecipes] = useState([]);

  const INITIAL_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  const maxLength = 5;
  const maxIndex = 12;

  useEffect(() => {
    if (filterUrl !== INITIAL_URL) {
      setFilterUrl(INITIAL_URL);
    }
  }, []);

  useEffect(() => {
    let recipesArray;
    if (data.length > 0) {
      recipesArray = data.filter(({ strCategory }) => strCategory.includes(filter));
      setRecipes(recipesArray);
    }
  }, [data, filter]);

  function handleFilter(value) {
    if (value === filter) {
      setFilter('');
    } else {
      setFilter(value);
    }
  }

  return (
    <main className="main-recipes">
      <Header>
        Comidas
      </Header>
      <section className="recipes-filter">
        <button type="button" onClick={ () => setFilter('') }>All</button>
        { mealCategories.length > 0 && mealCategories.map((category, ind) => (
          ind < maxLength ? (
            <button
              key={ category }
              data-testid={ `${category}-category-filter` }
              type="button"
              onClick={ () => handleFilter(category) }
            >
              { category }
            </button>
          ) : null
        )) }
      </section>
      <section className="recipes-section">
        { recipes.length > 0 && recipes.slice(0, maxIndex)
          .map(({ idMeal, strMeal, strMealThumb }, ind) => (
            <CardRecipe
              key={ idMeal }
              pathName="/comidas"
              id={ idMeal }
              index={ ind }
              recipeImg={ strMealThumb }
              recipeName={ strMeal }
            />
          )) }
      </section>
      <Footer />
    </main>
  );
}

export default MainRecipes;
