import React from 'react';
import { Link } from 'react-router-dom';

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
      <Link to="/explorar/comidas">
        <Button className="explorer-btn" dataTestId="explore-food">
          Explorar Comidas
        </Button>
      </Link>
      <Link to="/explorar/bebidas">
        <Button className="explorer-btn" dataTestId="explore-drinks">
          Explorar Bebidas
        </Button>
      </Link>
      <Footer />
    </main>
  );
}

export default RecipesExplorer;
