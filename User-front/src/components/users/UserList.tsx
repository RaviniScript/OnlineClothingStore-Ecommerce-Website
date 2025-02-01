import { useState, useEffect } from 'react';
import { 
    Table, TableBody, TableCell, TableContainer, TableHead, 
    TableRow, Paper, IconButton, Chip 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { User } from '../../types';

interface UserListProps {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (id: number) => void;
}

const UserList = ({ users, onEdit, onDelete }: UserListProps) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Full Name</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.fullName}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                <Chip 
                                    label={user.role} 
                                    color={user.role === 'ADMIN' ? 'primary' : 'default'}
                                />
                            </TableCell>
                            <TableCell>
                                <Chip 
                                    label={user.active ? 'Active' : 'Inactive'}
                                    color={user.active ? 'success' : 'error'}
                                />
                            </TableCell>
                            <TableCell>
                                <IconButton onClick={() => onEdit(user)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => onDelete(user.id!)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserList;