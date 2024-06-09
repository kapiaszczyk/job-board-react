import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Card, CardContent, CardMedia, Grid, List, ListItem, ListItemText, Box, CircularProgress, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../utils/auth";

/**
 * JobList component.
 *
 * @returns {JSX.Element}
 *
 */
const JobList = () => {

    const API_ENDPOINT = 'http://localhost:8080/api/v1/job-offers/detailed';
    const hasAdminRole = isAdmin();
    const navigate = useNavigate();

    // State to manage job offers
    const [jobOffers, setJobOffers] = useState([]);

    // Loading and error states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State for managing the delete dialog
    const [open, setOpen] = useState(false);
    const [selectedJobId, setSelectedJobId] = useState(null);

    // Fetch job offers from API
    useEffect(() => {
        const cachedData = localStorage.getItem('jobOffers');
        const cachedTime = localStorage.getItem('jobOffersTime');

        if (cachedData && cachedTime && new Date().getTime() - cachedTime < (5 * 60000)) {
            console.log('Using cached data');
            setJobOffers(JSON.parse(cachedData));
            setLoading(false);
        } else {
            axios.get(API_ENDPOINT, {
                headers: {
                    'Content-Type': 'application/json',
                    'Allow-Control-Allow-Origin': '*'
                }})
                .then(response => {
                    setJobOffers(response.data);
                    localStorage.setItem('jobOffers', JSON.stringify(response.data));
                    localStorage.setItem('jobOffersTime', new Date().getTime());
                })
                .catch(error => {
                    setError(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, []);

    // Function to handle the opening of the dialog
    const handleOpen = (id) => {
        console.log('Opening dialog');
        setSelectedJobId(id);
        setOpen(true);
    };

    // Function to handle the closing of the dialog
    const handleClose = () => {
        console.log('Closing dialog');
        setOpen(false);
        setSelectedJobId(null);
    };

    /**
     * Function to handle the confirmation of the delete action.
     *
     * @returns {void}
     */
    const handleConfirmDelete = () => {
        console.log('Selected job id:', selectedJobId);

        if (selectedJobId) {

            var token = localStorage.getItem("token");

            console.log('Deleting job offer with id:', selectedJobId);
            axios.delete(`http://localhost:8080/api/v1/job-offers/${selectedJobId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Allow-Control-Allow-Origin': '*',
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(response => {
                    setJobOffers(prevJobOffers => prevJobOffers.filter(job => job.id !== selectedJobId));
                    handleClose();
                })
                .catch(error => {
                    console.error("There was an error deleting the job offer!", error);
                    handleClose();
                });
        }
    };

    /**
     *
     * Function to handle the edit action.
     *
     * @param {*} id
     */
    const handleEdit = (id) => {
        navigate(`/admin/edit-offer/${id}`);
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Container>
            <Grid container spacing={4}>
                {jobOffers.map((job, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', cursor: 'pointer' }}>
                            {job.company.logo && (
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={`data:image/png;base64,${job.company.logo}`}
                                    alt="Company Logo"
                                />
                            )}
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h5" component="div" onClick={() => navigate(`/job-offers/${job.id}`)}>
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
                                {hasAdminRole && (
                                    <Box mt={2}>
                                        <Button variant="contained" color="primary" onClick={() => handleEdit(job.id)}>
                                            Edit
                                        </Button>
                                        <Button variant="contained" color="secondary" onClick={() => handleOpen(job.id)} style={{ marginLeft: '10px' }}>
                                            Delete
                                        </Button>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Delete Job Offer</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this job offer?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleConfirmDelete} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default JobList;
