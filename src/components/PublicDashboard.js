import React from "react";
import JobList from "./JobList";
import Menu from "./Menu";
import { Container } from "@mui/material";

/**
 * PublicDashboard component.
 *
 * @returns {JSX.Element}
 *
 */
const PublicDashboard  = () => {
    return (
        <div>
            <Menu />
            <br />
            <Container sx={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
                <JobList />
            </Container>
        </div>
    );
};

export default PublicDashboard;