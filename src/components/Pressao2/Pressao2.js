import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Chart from 'chart.js/auto';
import './Pressao2.css';
import Button from '@mui/material/Button';

import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import BotaoLimparDados from '../../BotaoLimparDados.jsx';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Pressao2 = () => {
  const [sensorData, setSensorData] = useState([]);
  const [chartInstance, setChartInstance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [intervalTime, setIntervalTime] = useState(30000);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token não encontrado, redirecionando para login...');
        navigate('/login'); // Redireciona para a página de login
        return;
      }

      const response = await fetch('https://backend-clu7.onrender.com/coletando_dados_motores', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Erro ao buscar dados: ' + response.statusText);
      }
      const data = await response.json();
      console.log('Dados recebidos do backend:', data);

      // Filtro de motorID = 'Motor01'
      const dadosFiltrados = data.filter(motor => motor.motorid === 'Motor02');
      if (dadosFiltrados.length > 0) {
        setSensorData(dadosFiltrados);
        setIsLoading(false);
      } else {
        console.error('Nenhum dado encontrado para MotorID: Motor02.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Carregar dados iniciais
  }, []);

  useEffect(() => {
    const interval = setInterval(fetchData, intervalTime);
    return () => clearInterval(interval);
  }, [intervalTime]);

  useEffect(() => {
    if (!isLoading) {
      console.log('Dados prontos para renderização do gráfico:', sensorData);

      if (sensorData.length > 0) {
        if (chartInstance) {
          chartInstance.destroy();
        }

        const ctx = document.getElementById('sensor-chart');

        if (!ctx) {
          console.error('Elemento de canvas não encontrado');
          return;
        }

        const newChartInstance = new Chart(ctx, {
          type: 'line',
          data: {
            labels: sensorData.map(entry => {
              // Usar o timestamp diretamente da entrada
              const timestamp = new Date(entry.datahora);
              return timestamp.toLocaleString();
            }),
            datasets: [
              {
                label: 'Pressão',
                data: sensorData.map(entry => entry.pressao),
                borderColor: 'rgb(255, 0, 0)',
                fill: false,
              }
            ]
          },
          options: {
            responsive: true,
            scales: {
              x: {
                ticks: {
                  font: {
                    size: 10,
                    family: 'Arial',
                  }
                },
              },
              y: {
                ticks: {
                  font: {
                    size: 18,
                    family: 'Arial',
                  },
                  title: {
                    font: {
                      size: 32,
                      family: 'Arial',
                    }
                  }
                },
                beginAtZero: true
              }
            },
            plugins: {
              title: {
                display: true,
                text: 'Gráficos dos Sensores',
                font: {
                  size: 50
                },
              },
              tooltip: {
                titleFont: {
                  size: 14,
                  family: 'Arial'
                },
                bodyFont: {
                  size: 12,
                  family: 'Arial'
                }
              }
            }
          }
        });

        setChartInstance(newChartInstance);
      } else {
        console.log('Nenhum dado disponível para exibir no gráfico.');
      }
    }
  }, [sensorData, isLoading]);

  const clearData = () => {
    setSensorData([]);
    console.log('Dados limpos.');
  };

  return (
    <div>
      <header className="header">
        <Link to="/Motor2">
          <IconButton aria-label="config" size="large" color="primary">
            <ArrowBackIcon fontSize="50" />
          </IconButton>
        </Link>
        <div className='bt-grupo'>
          <Button variant="contained" size='large' onClick={() => setIntervalTime(30000)}>30 segundos</Button>
          <Button variant="contained" size='large' onClick={() => setIntervalTime(60000)}>1 minuto</Button>
          <Button variant="contained" size='large' onClick={() => setIntervalTime(600000)}>10 minutos</Button>
          {/*<BotaoLimparDados onClick={clearData} />*/}
        </div>
        <Link to="/">
          <IconButton aria-label="config" size="large" color="primary">
            <SettingsIcon fontSize="50" />
          </IconButton>
        </Link>
      </header>
      <div className="chart-container">
        <canvas id="sensor-chart" width="300" height="100"></canvas>
      </div>
    </div>
  );
};

export default Pressao2;
