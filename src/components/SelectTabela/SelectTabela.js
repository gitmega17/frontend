import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import DatasetIcon from '@mui/icons-material/Dataset';

import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';


function SelectTabela() {
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
        <h1>Selecione a Tabela</h1>
        <p className="botao-gap">
          <Link to="/Tabela1"><Button variant="contained" size='large' startIcon={<DatasetIcon />}>Tabela: Motor 1</Button></Link>
          <Link to="/Tabela2"><Button variant="contained" color="error" size='large' startIcon={<DatasetIcon />}>Tabela: Motor 2</Button></Link>
        </p>

      </div>
    </div>
  );
}

export default SelectTabela;
