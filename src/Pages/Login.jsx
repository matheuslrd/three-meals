import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../Styles/Login.css';
import { MyContext } from '../Context/MyContext';
import DefaultInput from '../Components/DefaultInput';
import ToLocalStorage from '../Helper/ToLocalStorage';

function Login() {
  const RegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const length = 6;
  const INITIAL_STATE = { email: '', password: '', login: false };

  const { user, setUser } = useContext(MyContext);

  const [state, setState] = useState(INITIAL_STATE);
  const { email, password, login } = state;

  function handleChange({ target: { name, value } }) {
    setState({ ...state, [name]: value });
  }

  function validation() {
    return RegExp.test(email) && password.length > length;
  }

  function handleClick() {
    ToLocalStorage('mealsToken', 1, 'cocktailsToken', 1);
    ToLocalStorage('user', { email });
    setUser({ ...user, email });
    setState({ ...state, login: true });
  }

  return (
    <main className="login">
      { login && <Redirect to="/comidas" /> }
      <form className="login-form">
        <h4>Login</h4>
        <DefaultInput
          type="text"
          id="email-input"
          name="email"
          text="Email: "
          value={ email }
          onChange={ handleChange }
          placeholder="email@example.com"
          className="login-input"
        />
        <DefaultInput
          type="password"
          id="password-input"
          name="password"
          text="Password: "
          value={ password }
          onChange={ handleChange }
          className="login-input"
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ !validation() }
          onClick={ handleClick }
        >
          Submit
        </button>
      </form>
    </main>
  );
}

export default Login;
