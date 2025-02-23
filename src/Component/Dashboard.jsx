import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Routes, Route, Link } from 'react-router-dom'; 
import { UserRound, UserCircle } from "lucide-react";
import Profile from '../Screens/Profile';
import Dash from './Dash';
import DashboardScreen from '../Screens/DashboardScreen';
import CustomerManagement from '../Screens/CustomerManagement';
import RoomManagement from '../Screens/RoomManagement';
import BookingManagement from '../Screens/BookingManagement';
import PaymentManagement from '../Screens/PaymentManagement';
import ServiceManagement from '../Screens/ServiceManagement';
import InventoryManagement from '../Screens/InventoryManagement';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const pages = [
    {
        name: 'Dashboard',
        icon: <UserRound size={24} />, 
        path: "/dashboard/dashboardScreen",

    },
    {
        name: 'Customer Management',
        icon: <UserRound size={24} />, 
        path: "/dashboard/customerManagement",

    },
    {
        name: 'Room Management',
        icon: <UserRound size={24} />, 
        path: "/dashboard/roomManagement",

    },
    {
        name: 'Booking Management',
        icon: <UserRound size={24} />, 
        path: "/dashboard/bookingManagement",

    },
    {
        name: 'Payment Management',
        icon: <UserRound size={24} />, 
        path: "/dashboard/paymentManagement",

    },
    {
        name: 'Service Management',
        icon: <UserRound size={24} />, 
        path: "/dashboard/serviceManagement",

    },
    {
        name: 'Inventory Management',
        icon: <UserRound size={24} />, 
        path: "/dashboard/inventoryManagement",

    },
    {
      name: 'Profile',
      icon: <UserRound size={24} />, 
      path: "/dashboard/profile",
    }
  ];

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {pages.map((obj, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton component={Link} to={obj.path}>
              <ListItemIcon>{obj.icon}</ListItemIcon>
              <ListItemText primary={obj.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          background: "linear-gradient(to top right, #3B82F6 30%, #9BBFF9 50%, rgb(252, 253, 254) 80%)",
          color: "black"
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
            variant="h6" 
            noWrap 
            component={Link} 
            to="/dashboard" 
            color="inherit" 
            sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
          >
            BrightPath – Guiding the learning journey
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, marginTop: '65px', color: 'black' } }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <Routes>
          <Route path='/' element={<Dash />} />
          <Route path="/dashboardScreen" element={<DashboardScreen />} />
          <Route path="/customerManagement" element={<CustomerManagement />} />
          <Route path="/roomManagement" element={<RoomManagement/>} />
          <Route path="/bookingManagement" element={<BookingManagement/>} />
          <Route path="/paymentManagement" element={<PaymentManagement/>} />
          <Route path="/serviceManagement" element={<ServiceManagement/>} />
          <Route path="/inventoryManagement" element={<InventoryManagement/>} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
