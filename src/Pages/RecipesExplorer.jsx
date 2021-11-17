import React from 'react';

import Header from '../Components/Header';
import Button from '../Components/Button';
import Footer from '../Components/Footer';

function RecipesExplorer() {
  return (
    <main className="recipes-explorer">
      <Header
        disabledSearch
      >
        Explorar
      </Header>
      <Button
        className="explorer-btn"
        dataTestId="explore-food"
        hasLink="/explorar/comidas"
      >
        Explorar Comidas
      </Button>
      <Button
        className="explorer-btn"
        dataTestId="explore-drinks"
        hasLink="/explorar/bebidas"
      >
        Explorar Bebidas
      </Button>
      <Footer />
    </main>
  );
}

export default RecipesExplorer;
