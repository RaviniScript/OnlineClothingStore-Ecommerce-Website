import { useFormik } from 'formik';
import * as Yup from 'yup';
import { 
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, FormControl, InputLabel, Select,
    MenuItem, FormControlLabel, Switch, IconButton, InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { User } from '../../types';
import { useEffect, useState } from 'react';

interface UserFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (user: User) => void;
    initialValues?: User;
}

const UserForm = ({ open, onClose, onSubmit, initialValues }: UserFormProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    // Define default values outside formik to keep them consistent
    const defaultValues = {
        username: '',
        email: '',
        fullName: '',
        password: '',
        role: 'ADMIN' as const,
        active: true
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues || defaultValues,
        validationSchema: Yup.object({
            username: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email').required('Required'),
            fullName: Yup.string().required('Required'),
            password: !initialValues ? Yup.string().required('Required') : Yup.string(),
            role: Yup.string().required('Required'),
            active: Yup.boolean()
        }),
        onSubmit: (values) => {
            const submitData = initialValues?.id 
                ? { ...values, id: initialValues.id }
                : values;
            onSubmit(submitData);
            formik.resetForm({ values: defaultValues });
            onClose();
        }
    });

    // Reset form when dialog opens/closes or when initialValues changes
    useEffect(() => {
        if (!open) {
            // Reset to default values when closing
            formik.resetForm({ values: defaultValues });
        } else if (!initialValues) {
            // Reset to default values when opening for new user
            formik.resetForm({ values: defaultValues });
        } else {
            // Set to initialValues when editing existing user
            formik.resetForm({ values: initialValues });
        }
    }, [open, initialValues]);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>
                    {initialValues ? 'Edit User' : 'Create User'}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        margin="normal"
                        name="username"
                        label="Username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        name="fullName"
                        label="Full Name"
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                        error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                        helperText={formik.touched.fullName && formik.errors.fullName}
                    />
                    {!initialValues && (
                        <TextField
                            fullWidth
                            margin="normal"
                            name="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
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
                    )}
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Role</InputLabel>
                        <Select
                            name="role"
                            value={formik.values.role}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value="USER">User</MenuItem>
                            <MenuItem value="ADMIN">Admin</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControlLabel
                        control={
                            <Switch
                                name="active"
                                checked={formik.values.active}
                                onChange={formik.handleChange}
                            />
                        }
                        label="Active"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained" color="primary">
                        {initialValues ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default UserForm;