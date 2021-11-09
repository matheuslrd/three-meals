import React from 'react';

import Footer from '../Components/Footer';
import Header from '../Components/Header';

function FoodExplorer() {
  return (
    <main className="FoodExplorer">
      <Header
        disabledSearch
      >
        Explorar Comidas
      </Header>
      <Footer />
    </main>
  );
}

export default FoodExplorer;
