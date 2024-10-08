import React from 'react';
import { Link } from 'react-router-dom';
import './SelectMotor.css';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';


function selectMotor() {
  return (
    <div>
      <header className='head-menu'>
        <Link to="/">
          <IconButton aria-label="home" size="large" color="primary"
          ><HomeIcon fontSize="50" />
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
        <h1>Selecione o Motor</h1>
        <p className="botao-gap">
          <Link to="/Motor1"><Button variant="contained" size='large' startIcon={<DashboardIcon />}>Motor 1</Button></Link>
          <Link to="/Motor2"><Button variant="contained" color="error" size='large' startIcon={<DashboardIcon />}>Motor 2</Button></Link>
        </p>

      </div>
    </div>
  );
}

export default selectMotor;
