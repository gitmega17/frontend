import { Link } from 'react-router-dom';
import './Home.css';
import Button from '@mui/material/Button';


import DashboardIcon from '@mui/icons-material/Dashboard';
import DatasetIcon from '@mui/icons-material/Dataset';
import SummarizeIcon from '@mui/icons-material/Summarize';
import SettingsIcon from '@mui/icons-material/Settings';



function Home(){ 
    return(
    <div className="displayHome">
        <img src="/imagens/techforge_banner.png" alt="banner-logo-techforge" className="logo"/>
        <section className="botaogrupo"> 
        <Link to="/SelectMotor"><Button variant="contained" size='large' startIcon={<DashboardIcon />}>Dashboard</Button></Link>
        <Link to="/SelectTabela"><Button variant="contained" size='large' startIcon={<DatasetIcon />}>Tabelas</Button></Link>
        <Link to="/Relatorio"><Button variant="contained" size='large' startIcon={<SummarizeIcon />}>Relatórios</Button></Link>
        <Button variant="contained" size='large' startIcon={<SettingsIcon />}>Configurações</Button>
            
        </section>
    </div>

    )
}

export default Home;