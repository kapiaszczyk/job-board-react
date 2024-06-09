import React, { useEffect } from "react";
import axios from "axios";
import { Container, Typography, Card, CardContent, CardMedia, Grid, List, ListItem, ListItemText, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";

const AddressList = ({ isFetchedByCompany, id, fetchedAddresses }) => {


    // If the addresses were already fetched by the company
    // Aka This component is displaying addresses of a company in CompanyList
    // And the id is nul
    // Then do not call the API

    const API_ENDPOINT = 'http://localhost:8080/api/v1/addresses/';

    const [addresses, setAddresses] = React.useState([]);

    const [loading, setLoading] = React.useState(true);

    const [error, setError] = React.useState(null);

    useEffect(() => {

        axios.get(API_ENDPOINT + "/" + id, {
            headers: {
                'Content-Type': 'application/json',
                'Allow-Control-Allow-Origin': '*'
            }})
            .then(response => {
                setAddresses(response.data);
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
        return <div>Error: {error.message}</div>
    }

    return (

        // TODO: Refactor to use Material UI list
        // Address has: street, city, postalCode, country
        <div>
            <List>
                {addresses.map((address, id) => (
                    <ListItem key={id} disableGutters>
                        <ListItemText
                            primary={`${address.city}, ${address.street}, ${address.country}`}
                        />
                    </ListItem>
                ))}
            </List>
        </div>

    );

};

export default AddressList;