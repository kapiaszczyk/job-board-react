import React, { useEffect } from "react";
import axios from "axios";
import { Typography, Card, CardContent, CardMedia, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { isAdmin } from "../utils/auth";

/**
 * CompanyInformation component.
 *
 * @returns {JSX.Element}
 *
 */
const CompanyInformation = ( { id } ) => {

    const [company, setCompany] = React.useState(null);

    const [loading, setLoading] = React.useState(true);

    const [error, setError] = React.useState(null);

    const API_ENDPOINT = 'http://localhost:8080/api/v1/companies/';

    const navigate = useNavigate();

    const hasAdminRole = isAdmin();

    const handleEdit = (id) => {
    };

    const handleDelete = (id) => {
    };

    useEffect(() => {

        axios.get(API_ENDPOINT + id,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Allow-Control-Allow-Origin': '*'
                }
            })
            .then(response => {
                setCompany(response.data);
            })
            .catch(error => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', cursor: 'pointer' }}>
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
    );
};

export default CompanyInformation;