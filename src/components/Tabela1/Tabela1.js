import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Tabela1.css'; // Importando o CSS

import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings';

const Tabela1 = () => {
    const [dadosMotores, setDadosMotores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchDadosMotores = async () => {
            try {

                const token = localStorage.getItem('token');

                const response = await axios.get('https://backend-clu7.onrender.com/coletando_dados_motores', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setDadosMotores(response.data);
            } catch (err) {
                setError('Erro ao buscar dados dos motores.');
                console.error(err.response ? err.response.data : err.message);
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

    // Filtrar os dados para exibir apenas os que pertencem ao MotorID = 'Motor01'
    const dadosFiltrados = dadosMotores.filter(motor => motor.motorid === 'Motor01');

    return (
        <div>
            <header className='head-menu'>
                <Link to="/SelectTabela">
                    <IconButton aria-label="home" size="large" color="primary"
                    ><ArrowBackIcon fontSize="50" />
                    </IconButton>
                </Link>

                <Link to="/">
                    <IconButton aria-label="config" size="large" color="primary"
                    ><SettingsIcon fontSize="50" />
                    </IconButton>
                </Link>

            </header>

            <div className="sensor-table-container">
                <h1>Dados dos Motores</h1>
                <table className="sensor-table tabela1"> {/* Adicionei as classes aqui */}
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
                                <td colSpan="8" style={{ textAlign: 'center' }}>Nenhum dado encontrado para MotorID = 'Motor01'</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Tabela1;
