import { AppBar, Toolbar, Typography, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom'; 

const Navbar = () => {
  return (
    <AppBar position="fixed" style={{ top: 0, right: 0, background: '' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Inventory
        </Typography>
        <nav>
          <MuiLink component={Link} to="/" color="inherit" underline="none" sx={{ padding: '10px', marginRight: '10px' }}>
            Home
          </MuiLink>
          <MuiLink component={Link} to="#about" color="inherit" underline="none" sx={{ padding: '10px', marginRight: '10px' }}>
            About
          </MuiLink>
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
