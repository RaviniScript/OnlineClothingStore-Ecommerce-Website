import { Outlet } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { clearToken, getUserInfo } from '../../services/api';
import { useEffect, useState } from 'react';

interface LayoutProps {
    setIsAuthenticated: (value: boolean) => void;
}

const Layout = ({ setIsAuthenticated }: LayoutProps) => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const userInfo = getUserInfo();
        if (userInfo?.fullName) {
            setUserName(userInfo.fullName);
        }
    }, []);

    const handleLogout = () => {
        // Clear the token
        clearToken();
        // Update authentication state
        setIsAuthenticated(false);
        // Redirect to login page
        navigate('/login', { replace: true });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Admin Dashboard
                    </Typography>
                    <Button 
                        sx={{ 
                            color: '#FFFFFF', // White color for Dashboard
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)'
                            }
                        }} 
                        onClick={() => navigate('/dashboard')}
                    >
                        Dashboard
                    </Button>
                    <Button 
                        sx={{ 
                            color: '#FFFFFF', // White color for Users
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)'
                            }
                        }} 
                        onClick={() => navigate('/users')}
                    >
                        Users
                    </Button>
                    <Typography 
                        variant="subtitle1" 
                        sx={{ 
                            mx: 2,
                            color: '#e6e6e6' // Grey color for username
                        }}
                    >
                        Hi, {userName}
                    </Typography>
                    <Button 
                        sx={{ 
                            color: '#ff8a66', // Orange/Red color for Logout
                            '&:hover': {
                                backgroundColor: 'rgba(255, 87, 34, 0.1)'
                            }
                        }} 
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <Container sx={{ mt: 4 }}>
                <Outlet />
            </Container>
        </Box>
    );
};

export default Layout; 