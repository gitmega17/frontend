import * as React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import LeakAddIcon from '@mui/icons-material/LeakAdd';

function TempDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {/* Primeiro item da lista */}
        <Link to="/">
        <ListItem disablePadding>
          <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        </Link>

        {/* Segundo item da lista */}
        <Link to="/Temperatura">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <DeviceThermostatIcon />
            </ListItemIcon>
            <ListItemText primary="Temperatura" />
          </ListItemButton>
        </ListItem>
        </Link>

        {/* Terceiro item da lista */}
        <Link to="/Frequencia">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <LeakAddIcon />
            </ListItemIcon>
            <ListItemText primary="Frequência" />
          </ListItemButton>
        </ListItem>
        </Link>

        {/* Quarto item da lista */}
        <Link to="/Corrente">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ElectricBoltIcon />
            </ListItemIcon>
            <ListItemText primary="Corrente" />
          </ListItemButton>
        </ListItem>
        </Link>
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton aria-label="config" size="large" color="primary" onClick={toggleDrawer(true)}>
        <MenuIcon fontSize="50" />
      </IconButton>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

export default TempDrawer;
