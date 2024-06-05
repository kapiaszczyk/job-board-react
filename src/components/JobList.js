import React, { useEffect } from "react";
import axios from "axios";
import { Container, Typography, Card, CardContent, CardMedia, Grid, List, ListItem, ListItemText, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


/**
 * JobList component.
 * 
 * @returns {JSX.Element}
 * 
 */
const JobList = () => {

    const API_ENDPOINT = 'http://localhost:8080/api/v1/job-offers/detailed';

    const navigate = useNavigate();

    /* The jobOffers state will store the job offers fetched from the API */
    const [jobOffers, setJobOffers] = React.useState([]);

    /* The loading state will be used to show a loading spinner */
    const [loading, setLoading] = React.useState(true);

    /* The error state will be used to show an error message */
    const [error, setError] = React.useState(null);

    /* The useEffect hook will fetch the job offers from the API */
    useEffect(() => {

        axios.get(API_ENDPOINT)
            .then(response => {
                setJobOffers(response.data);
            })
            .catch(error => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Job Offers
            </Typography>
            <Grid container spacing={4}>
                {jobOffers.map((job, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', cursor: 'pointer' }} onClick={() => navigate(`/job-offers/${job.id}`)}>
                            {job.company.logo && (
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={`data:image/png;base64,${job.company.logo}`}
                                    alt="Company Logo"
                                />
                            )}
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h5" component="div">
                                    {job.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <strong>Company:</strong> {job.company.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <strong>Salary:</strong> {job.salary} {job.salaryCurrency}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <strong>Expires At:</strong> {new Date(job.expiresAt).toLocaleDateString()}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <strong>Contract Type:</strong> {job.contractType.toLowerCase().replace('_', ' ')}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <strong>Experience:</strong> {job.experience.toLowerCase()}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <strong>Operating Mode:</strong> {job.operatingMode.toLowerCase()}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <strong>Location:</strong> {job.address.city}, {job.address.country}
                                </Typography>
                                <Box mt={2}>
                                    <Typography variant="body2" color="textSecondary">
                                        <strong>Technologies:</strong>
                                    </Typography>
                                    <List>
                                        {job.technologies.map((tech, techIndex) => (
                                            <ListItem key={techIndex} disableGutters>
                                                <ListItemText
                                                    primary={`${tech.technology.name} (${tech.degreeOfKnowledge.toLowerCase()})`}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default JobList;