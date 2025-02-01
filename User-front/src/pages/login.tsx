import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Container, Paper, TextField, Button, Typography, Box,
    Alert, IconButton, InputAdornment, Dialog, DialogTitle,
    DialogContent, DialogActions
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { authApi, setToken, setUserInfo } from '../services/api';

interface LoginProps {
    setIsAuthenticated: (value: boolean) => void;
}

const Login = ({ setIsAuthenticated }: LoginProps) => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showDeactivatedDialog, setShowDeactivatedDialog] = useState(false);
    const [showAccessDeniedDialog, setShowAccessDeniedDialog] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(''); // Clear previous errors
        const formData = new FormData(event.currentTarget);
        
        try {
            const response = await authApi.login({
                username: formData.get('username') as string,
                password: formData.get('password') as string
            });
            
            // Check for active status and role
            if (!response.active) {
                setShowDeactivatedDialog(true);
                return;
            }

            if (response.role !== 'ADMIN') {
                setShowAccessDeniedDialog(true);
                return;
            }

            setToken(response.token);
            setUserInfo(response);
            setIsAuthenticated(true);
            navigate('/dashboard');
        } catch (error: any) {
            console.error('Login error:', error);
            const errorMessage = error.response?.data?.message || error.response?.data?.error;
            
            if (errorMessage?.includes('deactivated')) {
                setShowDeactivatedDialog(true);
            } else if (errorMessage?.includes('Access denied')) {
                setShowAccessDeniedDialog(true);
            } else {
                setError('Invalid credentials');
            }
        }
    };

    const handleCloseDeactivatedDialog = () => {
        setShowDeactivatedDialog(false);
        const form = document.querySelector('form');
        if (form) {
            form.reset();
        }
    };

    const handleCloseAccessDeniedDialog = () => {
        setShowAccessDeniedDialog(false);
        const form = document.querySelector('form');
        if (form) {
            form.reset();
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Paper sx={{ p: 4, width: '100%' }}>
                    <Typography component="h1" variant="h5" align="center">
                        Login
                    </Typography>
                    {error && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {error}
                        </Alert>
                    )}
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Paper>
            </Box>

            {/* Deactivated Account Dialog */}
            <Dialog
                open={showDeactivatedDialog}
                onClose={handleCloseDeactivatedDialog}
            >
                <DialogTitle>Account Deactivated</DialogTitle>
                <DialogContent>
                    <Typography>
                        Your account has been deactivated. Please contact the administrator for assistance.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeactivatedDialog}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Access Denied Dialog */}
            <Dialog
                open={showAccessDeniedDialog}
                onClose={handleCloseAccessDeniedDialog}
            >
                <DialogTitle>Access Denied</DialogTitle>
                <DialogContent>
                    <Typography>
                        Access denied. Only administrators can access this system.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAccessDeniedDialog}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Login;