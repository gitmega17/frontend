import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings';

import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import LeakAddIcon from '@mui/icons-material/LeakAdd';
import SpeedIcon from '@mui/icons-material/Speed';



function Motor2() {
    return (
        <div>
            <header className='head-menu'>
            <Link to="/SelectMotor">
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
            <div className="display">
                <img src="/imagens/techforge_banner.png" alt="banner-logo-techforge" className="logo" />
                <h1> Motor 2 Selecione o Sensor para Monitoramento</h1>
                <p className="botao-gap">
                    
                    <Link to="/Temperatura2">
                        <Button variant="contained" color="error"size='large' startIcon={<DeviceThermostatIcon />}>
                            Temperatura
                        </Button>
                    </Link>

                    <Link to="/Corrente2">
                        <Button variant="contained" color="error" size='large' startIcon={<ElectricBoltIcon />}>
                            Corrente
                        </Button>
                    </Link>

                    <Link to="/Frequencia2">
                        <Button variant="contained" color="error" size='large' startIcon={<LeakAddIcon />}>
                            Frequencia
                        </Button>
                    </Link>

                    <Link to="/Pressao2">
                        <Button variant="contained" color="error" size='large' startIcon={<SpeedIcon />}>
                            Pressao
                        </Button>
                    </Link>

                    
                </p>

            </div>
        </div>
    );
}

export default Motor2;
