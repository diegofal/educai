import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  Avatar,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import { AccountCircle, Calculate } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/');
  };

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <Calculate sx={{ mr: 2 }} />
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          sx={{ 
            flexGrow: 1, 
            textDecoration: 'none', 
            color: 'inherit',
            fontWeight: 600
          }}
        >
          MathAdapt
        </Typography>

        {isAuthenticated ? (
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body2" sx={{ mr: 1 }}>
              Hola, {user?.firstName}
            </Typography>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar sx={{ width: 32, height: 32 }}>
                {user?.firstName?.[0]?.toUpperCase()}
              </Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => { navigate('/dashboard'); handleClose(); }}>
                Dashboard
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                Cerrar Sesión
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box display="flex" gap={1}>
            <Button color="inherit" component={Link} to="/login">
              Iniciar Sesión
            </Button>
            <Button 
              variant="outlined" 
              color="inherit" 
              component={Link} 
              to="/register"
              sx={{ borderColor: 'white', '&:hover': { borderColor: 'white' } }}
            >
              Registrarse
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;