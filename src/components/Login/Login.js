import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';  // Importando o CSS

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://backend-clu7.onrender.com/login', { username, password });
      const { token } = response.data;

      // Armazenar o token no localStorage ou sessionStorage
      localStorage.setItem('authToken', token);

      // Redirecionar para a página principal da aplicação (Home)
      navigate('/');  // Redireciona para a página inicial
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      setError('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  // Função para redirecionar para a página de registro
  const handleRegisterRedirect = () => {
    navigate('/register');
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
        {/* Seção de redirecionamento para registro */}
        <div>
          <p>Não possui registro?</p>
          <button type="button" onClick={handleRegisterRedirect}>Registre-se</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
