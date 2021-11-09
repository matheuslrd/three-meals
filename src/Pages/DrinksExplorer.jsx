import React from 'react';
import Footer from '../Components/Footer';

import Header from '../Components/Header';

function DrinksExplorer() {
  return (
    <main className="DrinksExplorer">
      <Header
        disabledSearch
      >
        Explorar Bebidas
      </Header>
      <Footer />
    </main>
  );
}

export default DrinksExplorer;
