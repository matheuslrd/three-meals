import React from 'react';
import Footer from '../Components/Footer';

import Header from '../Components/Header';

function RecipesExplorer() {
  return (
    <main className="RecipesExplorer">
      <Header
        disabledSearch
      >
        Explorar
      </Header>
      <Footer />
    </main>
  );
}

export default RecipesExplorer;
