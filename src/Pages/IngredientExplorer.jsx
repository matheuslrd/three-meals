import React from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

function IngredientExplorer() {
  return (
    <main className="IngredientExplorer">
      <Header
        disabledSearch
      >
        Explorar Ingredientes
      </Header>
      <Footer />
    </main>
  );
}

export default IngredientExplorer;
