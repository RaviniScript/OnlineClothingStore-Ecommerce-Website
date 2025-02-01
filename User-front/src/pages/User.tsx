import { useState, useEffect } from 'react';
import { 
    Container, Paper, Typography, Button, Box,
    Alert, Snackbar 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { userApi } from '../services/api';
import { User } from '../types';
import UserList from '../components/users/UserList';
import UserForm from '../components/users/UserForm';

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [openForm, setOpenForm] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | undefined>();
    const [message, setMessage] = useState('');

    const loadUsers = async () => {
        try {
            const data = await userApi.getAll();
            setUsers(data);
        } catch (error) {
            setMessage('Failed to load users');
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleCreate = async (user: User) => {
        try {
            await userApi.create(user);
            loadUsers();
            setMessage('User created successfully');
        } catch (error) {
            setMessage('Failed to create user');
        }
    };

    const handleUpdate = async (user: User) => {
        try {
            await userApi.update(user.id!, user);
            loadUsers();
            setMessage('User updated successfully');
        } catch (error) {
            setMessage('Failed to update user');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await userApi.delete(id);
            loadUsers();
            setMessage('User deleted successfully');
        } catch (error) {
            setMessage('Failed to delete user');
        }
    };

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setOpenForm(true);
    };

    return (
        <Container>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h4">Users</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => {
                        setSelectedUser(undefined);
                        setOpenForm(true);
                    }}
                >
                    Add User
                </Button>
            </Box>

            <UserList 
                users={users}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <UserForm
                open={openForm}
                onClose={() => {
                    setOpenForm(false);
                    setSelectedUser(undefined);
                }}
                onSubmit={selectedUser ? handleUpdate : handleCreate}
                initialValues={selectedUser}
            />

            <Snackbar
                open={!!message}
                autoHideDuration={6000}
                onClose={() => setMessage('')}
                message={message}
            />
        </Container>
    );
};

export default Users;