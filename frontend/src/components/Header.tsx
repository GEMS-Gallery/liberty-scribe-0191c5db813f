import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FlagIcon from '@mui/icons-material/Flag';

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <FlagIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          USA Election Blog
        </Typography>
        <Button color="inherit" component={RouterLink} to="/">
          Home
        </Button>
        <Button color="inherit" component={RouterLink} to="/new">
          New Post
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
