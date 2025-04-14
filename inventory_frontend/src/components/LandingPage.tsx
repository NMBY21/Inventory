import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import AboutPage from './AboutPage';
import Footer from "./Footer";
import image from '../723_generated.jpg';

const LandingPage = () => {

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <AppBar position="static" style={{ padding: '0 1rem' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="home">
            <Inventory2OutlinedIcon />
          </IconButton>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            Inventories
          </Typography>
          <Button color="inherit" component={Link} to="/login" startIcon={<LoginIcon />}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <div style={{height: 'calc(100vh - 108px)', textAlign: 'center', padding: '2rem 0 2.5rem'}}>
        <Typography variant="h4" style={{marginBottom: '0'}}>
          Welcome to Phinder Inventories!
        </Typography>
        <div style={{display: 'grid', gridTemplateColumns: '1.25fr 1fr', height: '100%',
          gap: '2rem', width: '85%', maxWidth: '1200px', margin: '0px auto', alignItems: 'center'}}>
          <img src={image} alt={"order"} style={{width: '100%'}}/>
          <AboutPage />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
