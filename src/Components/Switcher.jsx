import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Login from '../Pages/Login';
import MainRecipesFood from '../Pages/MainRecipesFood';
import Details from '../Pages/Details';
import RecipesExplorer from '../Pages/RecipesExplorer';
import DrinksExplorer from '../Pages/DrinksExplorer';
import FoodExplorer from '../Pages/FoodExplorer';
import IngredientExplorer from '../Pages/IngredientExplorer';
import AreaExplorer from '../Pages/AreaExplorer';
import Profile from '../Pages/Profile';
import RecipesMade from '../Pages/RecipesMade';
import NotFound from '../Pages/NotFound';
import MainRecipesDrinks from '../Pages/MainRecipesDrinks';
import FavoritesRecipes from '../Pages/FavoritesRecipes';
import InProgressRecipe from '../Pages/InProgressRecipe';

function Switcher() {
  return (
    <Switch>
      <Route exact path="/explorar/comidas/area" component={ AreaExplorer } />

      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ IngredientExplorer }
      />

      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ IngredientExplorer }
      />

      <Route exact path="/explorar/comidas" component={ FoodExplorer } />

      <Route exact path="/explorar/bebidas" component={ DrinksExplorer } />

      <Route exact path="/explorar" component={ RecipesExplorer } />

      <Route exact path="/bebidas/:id/in-progress" component={ InProgressRecipe } />

      <Route exact path="/bebidas/:id" component={ Details } />

      <Route exact path="/bebidas" component={ MainRecipesDrinks } />

      <Route exact path="/comidas/:id/in-progress" component={ InProgressRecipe } />

      <Route exact path="/comidas/:id" component={ Details } />

      <Route exact path="/comidas" component={ MainRecipesFood } />

      <Route exact path="/receitas-feitas" component={ RecipesMade } />

      <Route exact path="/receitas-favoritas" component={ FavoritesRecipes } />

      <Route exact path="/perfil" component={ Profile } />

      <Route exact path="/" component={ Login } />

      <Route path="*" component={ NotFound } />
    </Switch>
  );
}

export default Switcher;
