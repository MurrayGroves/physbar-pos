import React from 'react';
import logo from './logo.svg';
import './App.css';

import Menu from './pages/menu';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
      </Routes>
    </Router>
  );
}

export default App;