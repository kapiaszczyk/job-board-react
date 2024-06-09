import React from "react";
import Menu from "./Menu";
import JobOfferInformation from "./JobOfferInformation";
import { useParams } from "react-router-dom";

/**
 * JobOfferInformationPage component.
 *
 * @returns {JSX.Element}
 *
 */
const JobOfferInformationPage  = () => {

    const { id } = useParams();

    return (
        <div>
            <Menu />
            <JobOfferInformation id={id} />
        </div>
    );
};

export default JobOfferInformationPage;