import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings';

const Tabela2 = () => {
    const [dadosMotores, setDadosMotores] = useState([]); // Estado inicial como array vazio
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDadosMotores = async () => {
            try {
                const token = localStorage.getItem('authToken'); // Certifique-se de que o token correto está sendo recuperado
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/coletando_dados_motores`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Erro ao buscar dados dos motores.');
                }

                const data = await response.json(); // Convertendo a resposta para JSON
                setDadosMotores(data); // Definindo os dados no estado
            } catch (err) {
                setError('Erro ao buscar dados dos motores.');
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDadosMotores();
    }, []);

    if (loading) {
        return <p>Carregando dados...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    // Verifique se dadosMotores é um array antes de filtrar
    const dadosFiltrados = Array.isArray(dadosMotores)
        ? dadosMotores.filter(motor => motor.motorid === 'Motor02')
        : [];

    return (
        <div>
            <header className='head-menu'>
                <Link to="/SelectTabela">
                    <IconButton aria-label="home" size="large" color="primary">
                        <ArrowBackIcon fontSize="50" />
                    </IconButton>
                </Link>

                <Link to="/">
                    <IconButton aria-label="config" size="large" color="primary">
                        <SettingsIcon fontSize="50" />
                    </IconButton>
                </Link>
            </header>

            <div className="sensor-table-container">
                <h1>Dados dos Motores</h1>
                <table className="sensor-table tabela2">
                    <thead>
                        <tr>
                            <th>ColetaID</th>
                            <th>DataHora</th>
                            <th>MotorID</th>
                            <th>Temperatura</th>
                            <th>Frequência</th>
                            <th>Corrente</th>
                            <th>Vibração</th>
                            <th>Pressão</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dadosFiltrados.length > 0 ? (
                            dadosFiltrados.map((motor) => (
                                <tr key={`${motor.coletaid}-${motor.motorid}`}>
                                    <td>{motor.coletaid}</td>
                                    <td>{motor.datahora ? new Date(motor.datahora).toLocaleString() : 'Data Inválida'}</td>
                                    <td>{motor.motorid}</td>
                                    <td>{motor.temperatura}</td>
                                    <td>{motor.frequencia}</td>
                                    <td>{motor.corrente}</td>
                                    <td>{motor.vibracao}</td>
                                    <td>{motor.pressao}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" style={{ textAlign: 'center' }}>Nenhum dado encontrado para MotorID = 'Motor02'</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Tabela2;
