import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import Menu from './pages/menu';

import axios from './axios/axiosConfig';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Drink, SelectedDrink } from './types';
import Checkout from './pages/checkout';

function App() {
  const [drinks, setDrinks] = useState<Record<string, Drink>>({});
  const [drink, setSelectedDrink] = useState<SelectedDrink | null>(null);

  useEffect(() => {
    axios.get('/drinks').then((response) => {
        setDrinks(response.data);
    });
}, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu drinks={drinks} setSelectedDrink={setSelectedDrink}/>} />
        <Route path="/checkout" element={<Checkout selectedDrink={drink}/>} />
      </Routes>
    </Router>
  );
}

export default App;
