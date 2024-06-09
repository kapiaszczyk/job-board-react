import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { getCurrentUser, isAdmin, isUser, logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";

/**
 * Menu component.
 *
 * @returns {JSX.Element}
 *
 */
const Menu = () => {
    const user = getCurrentUser();
    const navigate = useNavigate();

    var hasAdminRole = isAdmin();
    var hasUserRole = isUser();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {
                        hasAdminRole ? <Button color="inherit" component={Link} to="/">Job Board (Admin Dashboard) </Button>
                        : hasUserRole ? <Button color="inherit" component={Link} to="/">Job Board (User Dashboard) </Button>
                        : <Button color="inherit" component={Link} to="/">Job Board</Button>
                    }
                </Typography>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/companies">Companies</Button>
                <Button color="inherit" component={Link} to="/job-offers">Job Offers</Button>
                {hasAdminRole ? (
                    <React.Fragment>
                        <Button color="inherit" component={Link} to="/admin">Admin Dashboard</Button>
                        <Button color="inherit" component={Link} to="/admin/health">API Health</Button>
                        <Button color="inherit" component={Link} to="/admin/add-company">Add Company</Button>
                        <Button color="inherit" component={Link} to="/admin/add-offer">Add Job Offer</Button>
                        <Button color="inherit" component={Link} to="/admin/add-technology">Add Technology</Button>
                    </React.Fragment>
                ) : null}
                {hasUserRole && (
                    <React.Fragment>
                        <Button color="inherit" component={Link} to="/user">User Dashboard</Button>
                        <Button color="inherit" component={Link} to="/user/add-offer">Add Job Offer</Button>
                        <Button color="inherit" component={Link} to="/user/edit-offer">Edit Job Offer</Button>
                    </React.Fragment>
                )
                }
                {user ? (
                    <>
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/register">Register</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Menu;