import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';

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

  function clearLocalStorage() {
    localStorage.clear();
  }

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
            Receitas Feitas
          </Button>

          <Button
            className="profile-favorite-btn btns-links-profile"
            dataTestId="profile-favorite-btn"
            hasLink="/receitas-favoritas"
          >
            Receitas Favoritas
          </Button>

          <Button
            className="profile-favorite-btn btns-links-profile"
            dataTestId="profile-logout-btn"
            onClick={ clearLocalStorage }
            hasLink="/"
          >
            Sair
          </Button>
        </section>
      </article>

      <Footer />
    </main>
  );
}

export default Profile;
