import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Home from './components/Home/Home';
import SelectMotor from './components/SelectMotor/SelectMotor';
import SelectTabela from './components/SelectTabela/SelectTabela';
import Relatorio from './components/Relatorio/Relatorio';

import Tabela1 from './components/Tabela1/Tabela1';
import Tabela2 from './components/Tabela2/Tabela2';

import Motor1 from './components/Motor1/Motor1';
import Temperatura1 from './components/Temperatura1/Temperatura1';
import Corrente1 from './components/Corrente1/Corrente1';
import Frequencia1 from './components/Frequencia1/Frequencia1';
import Pressao1 from './components/Pressao1/Pressao1';

import Motor2 from './components/Motor2/Motor2';
import Temperatura2 from './components/Temperatura2/Temperatura2';
import Corrente2 from './components/Corrente2/Corrente2';
import Frequencia2 from './components/Frequencia2/Frequencia2';
import Pressao2 from './components/Pressao2/Pressao2';

import Register from './components/Register/Register'; 
import Login from './components/Login/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/SelectMotor" element={<SelectMotor />} />
            <Route path="/SelectTabela" element={<SelectTabela />} />
            <Route path="/Relatorio" element={<Relatorio />} />
            <Route path="/Tabela1" element={<Tabela1 />} />
            <Route path="/Tabela2" element={<Tabela2 />} />
            <Route path="/Motor1" element={<Motor1 />} />
            <Route path="/Temperatura1" element={<Temperatura1 />} />
            <Route path="/Corrente1" element={<Corrente1 />} />
            <Route path="/Frequencia1" element={<Frequencia1 />} />
            <Route path="/Pressao1" element={<Pressao1 />} />
            <Route path="/Motor2" element={<Motor2 />} />
            <Route path="/Temperatura2" element={<Temperatura2 />} />
            <Route path="/Frequencia2" element={<Frequencia2 />} />
            <Route path="/Corrente2" element={<Corrente2 />} />
            <Route path="/Pressao2" element={<Pressao2 />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;

