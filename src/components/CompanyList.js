import React, { useEffect } from "react";
import axios from "axios";
import { Container, Typography, Card, CardContent, CardMedia, Grid, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";
import { isAdmin } from "../utils/auth";
import { CircularProgress } from "@mui/material";

/**
 * CompanyList component.
 *
 * @returns {JSX.Element}
 */
const CompanyList = () => {

    const API_ENDPOINT = 'http://localhost:8080/api/v1/companies';

    const navigate = useNavigate();

    const [companies, setCompanies] = React.useState([]);

    const [loading, setLoading] = React.useState(true);

    const [error, setError] = React.useState(null);

    var hasAdminRole = isAdmin();

    const handleEdit = (id) => {
    };

    const handleDelete = (id) => {
    };

    useEffect(() => {

        axios.get(API_ENDPOINT, {
            headers: {
                'Content-Type': 'application/json',
                'Allow-Control-Allow-Origin': '*'
            }})
            .then(response => {
                setCompanies(response.data);
            })
            .catch(error => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        <CircularProgress />
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div>
            <Menu />
            <Container>
                <Grid container spacing={4}>
                    {companies.map((company) => (
                        <Grid item xs={12} sm={6} md={4} key={company.id}>
                            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', cursor: 'pointer' }} onClick={() => navigate(`/companies/${company.id}`)}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={`data:image/png;base64,${company.logo}`}
                                    alt="Company Logo"
                                    onClick={() => navigate(`/companies/${company.id}`)}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h5" component="div">
                                        {company.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        <strong>Description:</strong> {company.description}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        <strong>Website:</strong> {company.website}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        <strong>Email:</strong> {company.email}
                                    </Typography>
                                    {hasAdminRole && (
                                        <Box mt={2}>
                                            <Button variant="contained" color="primary" onClick={() => handleEdit(company.id)}>
                                                Edit
                                            </Button>
                                            <Button variant="contained" color="secondary" onClick={() => handleDelete(company.id)} style={{ marginLeft: '10px' }}>
                                                Delete
                                            </Button>
                                        </Box>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
};

export default CompanyList;