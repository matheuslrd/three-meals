import React from 'react';

import Footer from '../Components/Footer';
import Header from '../Components/Header';

import '../Styles/Profile.css';

import Button from '../Components/Button';

function Profile() {
  return (
    <main className="Profile">
      <Header
        disabledSearch
      >
        Perfil
      </Header>
      <article className="main-content">
        <section data-testid="profile-email">
          emailDaPessoa@email.com
        </section>
        <section className="container-links">
          <Button
            className="profile-done-btn btns-links-profile"
            dataTestId="profile-done-btn"
            hasLink="/receitas-feitas"
          >
            Recipes Done
          </Button>

          <Button
            className="profile-favorite-btn btns-links-profile"
            dataTestId="profile-favorite-btn"
            hasLink="/receitas-favoritas"
          >
            Favorite Recipes
          </Button>

          <Button
            className="profile-favorite-btn btns-links-profile"
            dataTestId="profile-logout-btn"
            hasLink="/"
          >
            Logout
          </Button>
        </section>
      </article>
      <Footer />
    </main>
  );
}

export default Profile;
