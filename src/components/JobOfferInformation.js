import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Card, CardContent, CardMedia, List, ListItem, ListItemText, Box } from "@mui/material";
import { CircularProgress } from "@mui/material";

/**
 * JobOfferInformation component.
 *
 * @returns {JSX.Element}
 *
 */
const JobOfferInformation = ({ id }) => {

    const API_ENDPOINT = 'http://localhost:8080/api/v1/job-offers/';

    const TECHNOLOGY_API_ENDPOINT = 'http://localhost:8080/api/v1/technologies';

    const [jobOffer, setJobOffer] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [technologies, setTechnologies] = useState([]);

    useEffect(() => {
        axios.get(TECHNOLOGY_API_ENDPOINT)
            .then(response => {
                setTechnologies(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the technologies!", error);
            });
    }, []);

    useEffect(() => {
        axios.get(API_ENDPOINT + id)
            .then(response => {
                const techNames = response.data.technologies.map(tech => {
                    return technologies.find(technology => technology.id === tech.id.technologyId).name;
                });

                setJobOffer({
                    ...response.data,
                    technologies: techNames
                });
            })
            .catch(error => {
                console.error("There was an error fetching the job details!", error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id, technologies]);


    if (loading) {
        return (
            <CircularProgress />
        );
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }


    return (
        <div>
            <Container>
                {jobOffer.name && (
                    <Card>
                        {jobOffer.company && jobOffer.company.logo && (
                            <CardMedia
                                component="img"
                                height="140"
                                image={`data:image/png;base64,${jobOffer.company.logo}`}
                                alt="Company Logo"
                            />
                        )}
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {jobOffer.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {jobOffer.shortDescription}
                            </Typography>
                            <Box mt={2} mb={2}>
                                <Typography variant="h6" component="div">
                                    Description
                                </Typography>
                                <Typography variant="body1" component="div">
                                    {jobOffer.description}
                                </Typography>
                            </Box>
                            <List>
                                <ListItem>
                                    <ListItemText primary="Company" secondary={jobOffer.company.name} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Contract Type" secondary={jobOffer.contractType} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Salary" secondary={`${jobOffer.salary} ${jobOffer.salaryCurrency}`} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Experience" secondary={jobOffer.experience} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Operating Mode" secondary={jobOffer.operatingMode} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Created At" secondary={jobOffer.createdAt} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Updated At" secondary={jobOffer.updatedAt} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Expires At" secondary={jobOffer.expiresAt} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Address" secondary={jobOffer.address.street} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="City" secondary={jobOffer.address.city} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Postal Code" secondary={jobOffer.address.postalCode} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Country" secondary={jobOffer.address.country} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Technologies" secondary={jobOffer.technologies.join(', ')} />
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                )}
            </Container>
        </div>
    );
}

export default JobOfferInformation;