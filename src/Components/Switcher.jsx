import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Login from '../Pages/Login/index';
import MainRecipesFood from '../Pages/MainRecipesFood/index';
import Details from '../Pages/Details/index';
import RecipesExplorer from '../Pages/RecipesExplorer/index';
import DrinksExplorer from '../Pages/DrinksExplorer/index';
import FoodExplorer from '../Pages/FoodExplorer/index';
import IngredientExplorer from '../Pages/IngredientExplorer/index';
import AreaExplorer from '../Pages/AreaExplorer/index';
import Profile from '../Pages/Profile/index';
import DoneRecipes from '../Pages/DoneRecipes/index';
import NotFound from '../Pages/NotFound/index';
import MainRecipesDrinks from '../Pages/MainRecipesDrinks/index';
import FavoritesRecipes from '../Pages/FavoritesRecipes/index';
import InProgressRecipe from '../Pages/InProgressRecipe/index';

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

      <Route exact path="/receitas-feitas" component={ DoneRecipes } />

      <Route exact path="/receitas-favoritas" component={ FavoritesRecipes } />

      <Route exact path="/perfil" component={ Profile } />

      <Route exact path="/" component={ Login } />

      <Route path="*" component={ NotFound } />
    </Switch>
  );
}

export default Switcher;
