import React from 'react';

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter } from 'react-router-dom';

import Switcher from './Components/Switcher';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Switcher />
      </div>
    </BrowserRouter>
  );
}

export default App;
