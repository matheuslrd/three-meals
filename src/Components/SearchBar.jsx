import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { Redirect } from 'react-router-dom';

import DefaultInput from './DefaultInput';
import Button from './Button';

import { MyContext } from '../Context/MyContext';

function SearchBar({ textFilterPage }) {
  const [searchText, setSearchText] = useState('');
  const [filterSelected, setFilterSelected] = useState('');

  const { filterUrl, setFilterUrl, data } = useContext(MyContext);

  function verifyLengthRecipes() {
    if (data.length === 1) {
      const idRecipe = data[0].idMeal || data[0].idDrink;

      const textFilterPageLowerCase = textFilterPage.toLowerCase();
      return <Redirect to={ `/${textFilterPageLowerCase}/${idRecipe}` } />;
    }
  }

  function filterRecipes() {
    let url = filterUrl;

    const linksFoodAndDrinks = {
      ingredientFood: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchText}`,
      ingredientDrink: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchText}`,
      nameFood: `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`,
      nameDrink: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`,
      firstLetterFood: `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchText}`,
      firstLetterDrink: `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchText}`,
    };

    if (filterSelected === 'Ingrediente') {
      url = textFilterPage === 'Comidas'
        ? linksFoodAndDrinks.ingredientFood
        : linksFoodAndDrinks.ingredientDrink;
    }

    if (filterSelected === 'Nome') {
      url = textFilterPage === 'Comidas'
        ? linksFoodAndDrinks.nameFood
        : linksFoodAndDrinks.nameDrink;
    }

    if (filterSelected === 'Primeira letra') {
      if (searchText.length !== 1) {
        return global.alert('Sua busca deve conter somente 1 (um) caracter');
      }
      url = textFilterPage === 'Comidas'
        ? linksFoodAndDrinks.firstLetterFood
        : linksFoodAndDrinks.firstLetterDrink;
    }

    setFilterUrl(url);
  }

  return (
    <section className="search-input">
      { verifyLengthRecipes() }
      <DefaultInput
        id="search-input"
        name="search-input"
        onChange={ ({ target }) => setSearchText(target.value) }
        placeholder="Ex: Macarrão"
        value={ searchText }
        type="text"
      />

      <div className="radios-buttons-search">

        <DefaultInput
          id="ingredient-search-radio"
          name="buttons-search"
          onChange={ ({ target }) => setFilterSelected(target.value) }
          type="radio"
          value="Ingrediente"
          text="Ingrediente"
        />
        <DefaultInput
          id="name-search-radio"
          name="buttons-search"
          onChange={ ({ target }) => setFilterSelected(target.value) }
          type="radio"
          value="Nome"
          text="Nome"
        />
        <DefaultInput
          id="first-letter-search-radio"
          name="buttons-search"
          onChange={ ({ target }) => setFilterSelected(target.value) }
          type="radio"
          value="Primeira letra"
          text="Primeira letra"
        />

      </div>

      <div className="button-search">
        <Button
          className="search-btn"
          dataTestId="exec-search-btn"
          onClick={ filterRecipes }
        >
          Buscar
        </Button>
      </div>
    </section>
  );
}

SearchBar.propTypes = {
  textFilterPage: PropTypes.string.isRequired,
};

export default SearchBar;
