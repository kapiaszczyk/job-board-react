import React from "react";
import Menu from "./Menu";
import TechnologyList from "./TechnologyList";
import { Container } from "@mui/material";

/**
 * TechnologyPage component.
 *
 * @returns {JSX.Element}
 *
 */
const TechnologyPage  = () => {

    return (
        // Menu component
        <div>
            <Menu />
            <Container>
                <TechnologyList />
            </Container>
        </div>
    );
};

export default TechnologyPage;