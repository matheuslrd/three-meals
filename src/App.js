import React from 'react';

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter } from 'react-router-dom';

import Switcher from './Components/Switcher';
import MyContextProvider from './Context/MyContext';

function App() {
  return (
    <BrowserRouter>
      <MyContextProvider>
        <div className="app">
          <Switcher />
        </div>
      </MyContextProvider>
    </BrowserRouter>
  );
}

export default App;
