import React from 'react';
import { AppBar, Typography } from '@mui/material';

const Footer = () => {

  return (
    <AppBar position={"relative"}>
      <Typography variant="caption" sx={{ p: 1.5, color: '#fff', textAlign: 'center' }}>© {new Date().getFullYear()} Phinder Technologies PLC. All rights reserved.</Typography>
    </AppBar>
  );
};

export default Footer;
