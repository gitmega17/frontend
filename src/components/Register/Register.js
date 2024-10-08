import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './Register.css'; // Importando o CSS

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const handleRegister = async (e) => {
    e.preventDefault();

    // Use a variável de ambiente para a URL do backend
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    try {
      const response = await axios.post(`${backendUrl}/cadastro`, { username, password });
      setMessage('Usuário registrado com sucesso. Agora você pode fazer login!');
    } catch (err) {
      console.error('Erro ao registrar usuário:', err);
      setMessage('Erro ao registrar usuário.');
    }
  };

  const handleGoToLogin = () => {
    navigate('/login'); 
  };

  return (
    <div className="registerContainer">
      <h1>Registro</h1>
      <form onSubmit={handleRegister}>
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
        <button type="submit">Registrar</button>
      </form>
      {message && (
        <div className={message.includes('sucesso') ? 'message' : 'error'}>
          <p>{message}</p>
          {message === 'Usuário registrado com sucesso. Agora você pode fazer login!' && (
            <button className="loginButton" onClick={handleGoToLogin}>
              Ir para Login
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Register;
