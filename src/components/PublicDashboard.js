import React from "react";
import JobList from "./JobList";

/*

    - view job offers
    - search job offers (perform search by job title)
    - filter job offers (filter by company, technology, job type)
    - login
    - register
*/


/**
 * AdminDashboard component.
 * 
 * @returns {JSX.Element}
 * 
 */
const PublicDashboard  = () => {
    return (
        <div>
            <h1>Public Dashboard</h1>
            <JobList />
        </div>
    );
};

export default PublicDashboard;