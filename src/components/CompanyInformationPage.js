import React from "react";
import Menu from "./Menu";
import { useParams } from "react-router-dom";
import CompanyInformation from "./CompanyInformation";
import { Container }  from "@mui/material";

/**
 * CompanyInformationPage component.
 *
 * @returns {JSX.Element}
 *
 */
const CompanyInformationPage = () => {

    const { id } = useParams();

    return (
        <div>
            <Menu />
            <Container>
                <CompanyInformation id={id} />
            </Container>
        </div>
    );
};

export default CompanyInformationPage;