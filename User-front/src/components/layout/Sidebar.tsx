import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
  } from '@mui/material';
  import DashboardIcon from '@mui/icons-material/Dashboard';
  import PeopleIcon from '@mui/icons-material/People';
  import { useNavigate } from 'react-router-dom';
  
  interface SidebarProps {
    open: boolean;
  }
  
  const Sidebar = ({ open }: SidebarProps) => {
    const navigate = useNavigate();
  
    const menuItems = [
      { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
      { text: 'Users', icon: <PeopleIcon />, path: '/users' },
    ];
  
    return (
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          ['& .MuiDrawer-paper']: {
            width: 240,
            boxSizing: 'border-box',
            transform: open ? 'none' : 'translateX(-240px)',
            transition: 'transform 0.3s ease-in-out',
          },
        }}
      >
        <Toolbar />
        <List>
          {menuItems.map((item) => (
            <ListItem
              component="button"
              key={item.text}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    );
  };
  
  export default Sidebar;