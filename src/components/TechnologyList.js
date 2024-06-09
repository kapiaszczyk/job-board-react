import React, { useEffect } from "react";
import axios from "axios";
import { List, ListItem, ListItemText } from "@mui/material";
import { CircularProgress } from "@mui/material";

/**
 * TechnologyList component.
 *
 * @returns {JSX.Element}
 *
 */
const TechnologyList = () => {

    const API_ENDPOINT = 'http://localhost:8080/api/v1/technologies';

    const [technologies, setTechnologies] = React.useState([]);

    const [loading, setLoading] = React.useState(true);

    const [error, setError] = React.useState(null);

    useEffect(() => {

        axios.get(API_ENDPOINT)
            .then(response => {
                setTechnologies(response.data);
            })
            .catch(error => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            })

    }, []);

    if (loading) {
        return <CircularProgress />
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
            <List>
                {technologies.map((technology, id) => (
                    <ListItem key={id} disableGutters>
                        <ListItemText
                            primary={`${technology.name}`}
                        />
                    </ListItem>
                ))}
            </List>

    );

};

export default TechnologyList;