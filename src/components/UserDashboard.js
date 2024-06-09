import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../utils/auth";

/**
 * UserDashboard component.
 *
 * @returns {JSX.Element}
 *
 */
const UserDashboard = () => {

    const navigate = useNavigate();


    if (isTokenExpired()) {
        navigate('/login');
    }



    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/login')}
            >
                Logout
            </Button>
            <h1>User Dashboard</h1>
        </div>
    );
};

export default UserDashboard;