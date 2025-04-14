import React, {useContext, useState} from 'react';
import {
  List,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  IconButton,
  Divider,
  Box,
  ListItemButton,
  Button
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Store as StoreIcon,
  Business as BusinessIcon,
  ChevronLeft as ChevronLeftIcon,
  Category as CategoryIcon,
  Inventory as InventoryIcon,
  Logout
} from '@mui/icons-material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ItemList from './Item/ItemList';
import SupplierList from './Supplier/SupplierList'; 
import TransactionList from './Transaction/TransactionList';
import OrderList from './Order/OrderList';
import CategoryList from './Category/CategoryList';
import InventoryList from './Inventory/InventoryList';
import FactoryList from './Factory/FactoryList';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import {AuthContext} from "../context/AuthContext";
import Signup from "./Signup";

function Copyright(props: any) {
  return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://phindertechnologies.com/">
          PhinderTechnologies PLC
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
  );
}

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const HomePage = () => {
  const [selectedPage, setSelectedPage] = useState('Home'); // Track the selected page
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }
  const { logout } = authContext;

  const sidebarItems = [
    { text: 'Home', icon: <HomeIcon />, page: 'Home' },
    { text: 'Categories', icon: <CategoryIcon />, page: 'CategoryList' },
    { text: 'Items', icon: <StoreIcon />, page: 'ItemList' },
    { text: 'Inventory', icon: <InventoryIcon />, page: 'InventoryList' },
    { text: 'Suppliers', icon: <BusinessIcon />, page: 'SupplierList' },
    { text: 'Orders', icon: <ShoppingCartIcon />, page: 'OrderList' },
    { text: 'Transactions', icon: <CompareArrowsIcon />, page: 'TransactionList' },
    // { text: 'Create User', icon: <PersonAddIcon />, page: 'CreateUser' },
    // { text: 'Factories', icon: <FactoryIcon />, page: 'FactoryList' },
  ];

  const handlePageSelect = (page: string) => {        
    setSelectedPage(page);
  };

  const renderPage = () => {
    switch (selectedPage) {
      case 'Home':
        return (
          <div style={{ padding: '20px' }}>
            <Typography variant="h4">Welcome to the Inventory Management System</Typography>
            <Typography variant="body1">Select an entity from the sidebar to get started.</Typography>
          </div>
        );
      case 'ItemList':
        return <ItemList />;
      case 'SupplierList': 
        return <SupplierList />;
      case 'TransactionList': 
        return <TransactionList />;
      case 'OrderList': 
        return <OrderList />;
      case 'CategoryList':
        return <CategoryList />;
      case 'InventoryList':
        return <InventoryList />;
      case 'FactoryList': 
        return <FactoryList />;
      case 'CreateUser':
        return <Signup />;
      default:
        return null;
    }
  };

  return (
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
                sx={{
                  pr: '24px', // keep right padding when drawer closed
                }}
            >
              <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer}
                  sx={{
                    marginRight: '36px',
                    ...(open && { display: 'none' }),
                  }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  sx={{ flexGrow: 1 }}
              >
                Inventory Management
              </Typography>
              <Button variant="outlined"
                      startIcon={<Logout />}
                      onClick={() => logout()}
                      style={{color: 'white'}}
              >
                Log Out
              </Button>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  px: [1],
                }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              {
                sidebarItems.map((item, index) => (
                  <ListItemButton onClick={() => handlePageSelect(item.page)} key={index}>
                    <ListItemIcon>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                ))
              }
              <Divider sx={{ my: 1 }} />
              {/*{secondaryListItems}*/}
              <ListItemButton onClick={() => handlePageSelect('CreateUser')}>
                <ListItemIcon>
                  {<PersonAddIcon />}
                </ListItemIcon>
                <ListItemText primary={'Create User'} />
              </ListItemButton>
            </List>
          </Drawer>
          <Box
              component="main"
              sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
                padding: '50px 1.5rem 1rem'
              }}
          >
            {renderPage()}
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Copyright sx={{ pt: 4 }} />
            </Container>
          </Box>
          </Box>
      </ThemeProvider>
  );
};

export default HomePage;
