import { Container } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";
import { Outlet } from "react-router-dom";
import { isTokenExpired } from "../utils/auth";

/**
 * AdminDashboard component.
 *
 * @returns {JSX.Element}
 *
 */
const AdminDashboard = () => {

    const navigate = useNavigate();

    console.log("Rendering AdminDashboard");

    if (isTokenExpired()) {
        navigate('/login');
    }

    return (
        <div>
            <Menu />
            <Container maxWidth="md">
                <h1>Admin Dashboard</h1>
                <Outlet />
            </Container>
        </div>
    );
};

export default AdminDashboard;