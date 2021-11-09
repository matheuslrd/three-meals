import React from 'react';

import Footer from '../Components/Footer';
import Header from '../Components/Header';

function Profile() {
  return (
    <main className="Profile">
      <Header
        disabledSearch
      >
        Perfil
      </Header>
      <Footer />
    </main>
  );
}

export default Profile;
