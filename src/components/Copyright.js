import React from "react";

/**
 * Copyright component.
 *
 * @returns {JSX.Element}
 *
 */
const Copyright = () => {

    const currentYear = new Date().getFullYear();

    return (
        <div>
            <p>&copy; {currentYear} Job Board</p>
        </div>
    );
};

export default Copyright;