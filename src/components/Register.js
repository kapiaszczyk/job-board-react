import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../utils/auth";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from './Copyright';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import Menu from "./Menu";
import MenuItem from "@mui/material/MenuItem";

/**
 * Register component.
 *
 * @returns {JSX.Element}
 *
 */
const Register = () => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [role, setRole] = useState('');
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    /**
     * Handle register.
     *
     * @param {Event} e
     *
     * @returns {void}
     *
     * @async
     *
     */
    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== retypePassword) {
            setError("Passwords do not match");
            return;
        }

        console.log('Registering user: [email, username, password, role]', [email, username, password, role]);

        try {
            await register(username.trim(), email.trim(), password, role);
            setOpen(true);
        } catch (error) {
            console.error('Register failed', error);
            setError("Registration failed. Please try again.");
        }
    };

    /**
     * Handle close dialog.
     *
     * @returns {void}
     */
    const handleClose = () => {
        setOpen(false);
        navigate('/login');
    };

    return (
        <div>
            <Menu />
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <Box component="form" onSubmit={handleRegister} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="retype-password"
                            label="Password Confirmation"
                            type="password"
                            id="retype-password"
                            autoComplete="current-password"
                            onChange={(e) => setRetypePassword(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="role"
                            label="Role"
                            name="role"
                            autoComplete="role"
                            select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <MenuItem value="USER">User</MenuItem>
                            <MenuItem value="ADMIN">Admin</MenuItem>
                        </TextField>
                        {error && (
                            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                                {error}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Register
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2" onClick={() => navigate('/login')}>
                                    {"Already have an account? Sign In"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Registration Successful"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Your account has been created successfully. Click "OK" to go to the login page.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Register;
