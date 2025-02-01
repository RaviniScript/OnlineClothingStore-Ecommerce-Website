import { useEffect, useState } from 'react';
import { Container, Typography, Grid, Paper, Box, Chip } from '@mui/material';
import { userApi } from '../services/api';
import { User } from '../types';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GroupIcon from '@mui/icons-material/Group';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

const StatCard = ({ title, value, icon }: { title: string; value: number; icon: React.ReactNode }) => (
    <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            {icon}
            <Typography variant="h6" sx={{ ml: 1 }}>
                {title}
            </Typography>
        </Box>
        <Typography variant="h4">
            {value}
        </Typography>
    </Paper>
);

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeUsers: 0,
        adminUsers: 0,
        userRoleUsers: 0
    });

    const [recentUsers, setRecentUsers] = useState<User[]>([]);

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                const users = await userApi.getAll();
                
                setStats({
                    totalUsers: users.length,
                    activeUsers: users.filter((u: User) => u.active).length,
                    adminUsers: users.filter((u: User) => u.role === 'ADMIN').length,
                    userRoleUsers: users.filter((u: User) => u.role === 'USER').length
                });

                // Get 5 most recent users
                const sortedUsers = [...users]
                    .sort((a, b) => (b.id || 0) - (a.id || 0))
                    .slice(0, 5);
                setRecentUsers(sortedUsers);
            } catch (error) {
                console.error('Failed to load dashboard data:', error);
            }
        };

        loadDashboardData();
    }, []);

    return (
        <Container>
            <Typography variant="h4" sx={{ mb: 4 }}>
                Dashboard
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard 
                        title="Total Users" 
                        value={stats.totalUsers}
                        icon={<GroupIcon color="primary" sx={{ fontSize: 30 }} />}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard 
                        title="Active Users" 
                        value={stats.activeUsers}
                        icon={<PersonIcon color="success" sx={{ fontSize: 30 }} />}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard 
                        title="Admin Users" 
                        value={stats.adminUsers}
                        icon={<AdminPanelSettingsIcon color="primary" sx={{ fontSize: 30 }} />}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard 
                        title="Regular Users" 
                        value={stats.userRoleUsers}
                        icon={<PeopleOutlineIcon color="secondary" sx={{ fontSize: 30 }} />}
                    />
                </Grid>

                {/* Recent Users Section */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, mt: 2 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Recent Users
                        </Typography>
                        <Grid container spacing={2}>
                            {recentUsers.map((user) => (
                                <Grid item xs={12} key={user.id}>
                                    <Paper sx={{ p: 2 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Chip
                                                label={user.active ? 'Active' : 'Inactive'}
                                                color={user.active ? 'success' : 'error'}
                                                size="small"
                                                sx={{ mr: 2 }}
                                            />
                                            <Box>
                                                <Typography variant="subtitle1">
                                                    {user.fullName}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    Role: {user.role}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;