import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';  // Importando o CSS

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    try {
      const response = await axios.post(`${backendUrl}/login`, { username, password });
      const { token } = response.data;

      // Armazenar o token no localStorage
      localStorage.setItem('authToken', token);

      // Marcar como autenticado chamando onLogin
      onLogin();

      // Redirecionar para a página principal (Home)
      navigate('/');  
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      setError('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <div className="loginContainer">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Usuário:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
        <div>
          <p>Não possui registro?</p>
          <button type="button" onClick={() => navigate('/register')}>Registre-se</button>
        </div>
      </form>
    </div>
  );
};

export default Login;