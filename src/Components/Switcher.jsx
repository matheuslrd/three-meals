import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Login from '../Pages/Login';
import MainRecipes from '../Pages/MainRecipes';
import Details from '../Pages/Details';
import RecipesExplorer from '../Pages/RecipesExplorer';
import DrinksExplorer from '../Pages/DrinksExplorer';
import FoodExplorer from '../Pages/FoodExplorer';
import IngredientExplorer from '../Pages/IngredientExplorer';
import AreaExplorer from '../Pages/AreaExplorer';
import Profile from '../Pages/Profile';
import RecipesMade from '../Pages/RecipesMade';
import NotFound from '../Pages/NotFound';

function Switcher() {
  return (
    <Switch>
      <Route path="/explorar/bebidas/area" component={ AreaExplorer } />
      <Route path="/explorar/comidas/area" component={ AreaExplorer } />
      <Route path="/explorar/bebidas/ingredientes" component={ IngredientExplorer } />
      <Route path="/explorar/comidas/ingredientes" component={ IngredientExplorer } />
      <Route path="/explorar/comidas" component={ FoodExplorer } />
      <Route path="/explorar/bebidas" component={ DrinksExplorer } />
      <Route path="/explorar" component={ RecipesExplorer } />
      <Route path="/bebidas/:id/in-progress" component={ Details } />
      <Route path="/bebidas/:id" component={ Details } />
      <Route path="/bebidas" component={ MainRecipes } />
      <Route path="/comidas/:id/in-progress" component={ Details } />
      <Route path="/comidas/:id" component={ Details } />
      <Route path="/comidas" component={ MainRecipes } />
      <Route path="/receitas-feitas" component={ RecipesMade } />
      <Route path="/perfil" component={ Profile } />
      <Route exact path="/" component={ Login } />
      <Route path="*" component={ NotFound } />
    </Switch>
  );
}

export default Switcher;
