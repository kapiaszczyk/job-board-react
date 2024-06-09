import React from "react";
import Menu from "./Menu";
import JobList from "./JobList";

/**
 * JobOffersDashboard component.
 *
 * @returns {JSX.Element}
 *
 */
const JobOffersDashboard = () => {
    return (
        <div>
            <Menu />
            <JobList />
        </div>
    );
};

export default JobOffersDashboard;