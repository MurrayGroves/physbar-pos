import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import Menu from './pages/menu';

import axios from './axios/axiosConfig';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Drink } from './types';

function App() {
  const [drinks, setDrinks] = useState<Record<string, Drink>>({});

  useEffect(() => {
    axios.get('/drinks').then((response) => {
        setDrinks(response.data);
    });
}, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu drinks={drinks}/>} />
      </Routes>
    </Router>
  );
}

export default App;
