import React from 'react';

import DefaultInput from './DefaultInput';
import Button from './Button';

function SearchBar() {
  return (
    <section className="search-input">
      <DefaultInput
        id="search-input"
        name="search-input"
        onChange={ () => {} }
        placeholder="Ex: Macarrão"
        type="text"
      />
      <div className="radios-buttons-search">
        <DefaultInput
          id="ingredient-search-radio"
          name="buttons-search"
          onChange={ () => {} }
          type="radio"
          text="Ingrediente"
        />

        <DefaultInput
          id="name-search-radio"
          name="buttons-search"
          onChange={ () => {} }
          type="radio"
          text="Nome"
        />

        <DefaultInput
          id="first-letter-search-radio"
          name="buttons-search"
          onChange={ () => {} }
          type="radio"
          text="Primeira Letra"
        />
      </div>

      <div className="button-search">
        <Button
          dataTestId="exec-search-btn"
          className="search-btn"
        >
          Buscar
        </Button>
      </div>
    </section>
  );
}

export default SearchBar;
