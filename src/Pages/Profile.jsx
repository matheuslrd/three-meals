import React, { useEffect, useState } from 'react';

import Footer from '../Components/Footer';
import Header from '../Components/Header';

import '../Styles/Profile.css';

import Button from '../Components/Button';

import { GetLocalStorage } from '../Helper/ToLocalStorage';

function Profile() {
  const [email, setEmail] = useState();

  useEffect(() => {
    const user = GetLocalStorage('user');
    setEmail(user.email);
  }, []);

  return (
    <main className="Profile">
      <Header
        disabledSearch
      >
        Perfil
      </Header>
      <article className="main-content">
        <section data-testid="profile-email">
          { email }
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
