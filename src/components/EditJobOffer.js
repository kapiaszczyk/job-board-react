import React from "react";
import { Typography } from "@mui/material";
import axios from "axios";
import { Box, Button, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TechnologiesInput from "./TechnologiesInput";
import { useParams } from "react-router-dom";
import { useEffect } from "react";


const EditJobOffer = () => {

    const { id } = useParams();

    console.log("Rendering AddJobOffer");

    const API_ENDPOINT = "http://localhost:8080/api/v1/job-offers";

    const [name, setName] = React.useState("");
    const [shortDescription, setShortDescription] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [contractType, setContractType] = React.useState("");
    const [salary, setSalary] = React.useState("");
    const [salaryCurrency, setSalaryCurrency] = React.useState("");
    const [salaryType, setSalaryType] = React.useState("");
    const [experience, setExperience] = React.useState("");
    const [operatingMode, setOperatingMode] = React.useState("");
    const [expiresAt, setExpiresAt] = React.useState("");
    const [companyId, setCompanyId] = React.useState("");
    const [addressId, setAddressId] = React.useState("");
    const [technologies, setTechnologies] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [success, setSuccess] = React.useState(false);

    const handleTechnologiesChange = (technologiesList) => {
        const technologiesObj = technologiesList.reduce((obj, tech) => {
            if (tech.id) obj[tech.id] = tech.value;
            return obj;
        }, {});
        setTechnologies(technologiesObj);
    };

    const handleSubmit = (event) => {
        event.preventDefault();


        const jobOffer = {
            name,
            shortDescription,
            description,
            contractType,
            salary,
            salaryCurrency,
            salaryType,
            experience,
            operatingMode,
            expiresAt,
            companyId,
            addressId,
            technologies
        };

        setLoading(true);

        var token = localStorage.getItem("token");

        axios.put(API_ENDPOINT + '/' + id, jobOffer, {
            headers: {
                'Content-Type': 'application/json',
                'Allow-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + token,
            }
        })
            .then(response => {
                setSuccess(true);
            })
            .catch(error => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const fetchTechnologyNameById = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/technologies/${id}`);
            return response.data.name;
        } catch (error) {
            console.error(`Error fetching technology with id ${id}:`, error);
            return null;
        }
    };


    useEffect(() => {
        const fetchJobOffer = async () => {
            setLoading(true);
            var token = localStorage.getItem("token");

            try {
                const response = await axios.get(`${API_ENDPOINT}/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Allow-Control-Allow-Origin': '*',
                        'Authorization': `Bearer ${token}`
                    }
                });
                const jobOffer = response.data;
                setName(jobOffer.name);
                setShortDescription(jobOffer.shortDescription);
                setDescription(jobOffer.description);
                setContractType(jobOffer.contractType);
                setSalary(jobOffer.salary);
                setSalaryCurrency(jobOffer.salaryCurrency);
                setSalaryType(jobOffer.salaryType);
                setExperience(jobOffer.experience);
                setOperatingMode(jobOffer.operatingMode);
                setExpiresAt(jobOffer.expiresAt);
                setCompanyId(jobOffer.company.id);
                setAddressId(jobOffer.address.id);

                // Fetch technology names
                const technologiesWithNames = await Promise.all(
                    jobOffer.technologies.map(async (tech) => {
                        console.log("Tech:", tech.id.technologyId);
                        const name = await fetchTechnologyNameById(tech.id.technologyId);
                        console.log("Name:", name);
                        return { id: tech.id.technologyId, name, degreeOfKnowledge: tech.degreeOfKnowledge };
                    })
                );
                setTechnologies(technologiesWithNames);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobOffer();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (success) {
        return <div>Job offer edited successfully!</div>;
    }

    return (
        <div>
            <Typography variant="h4">Edit Job Offer</Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="shortDescription"
                    label="Short Description"
                    name="shortDescription"
                    autoComplete="shortDescription"
                    value={shortDescription}
                    inputProps={{
                        minLength: 50,
                        maxLength: 255
                    }}
                    onChange={(e) => setShortDescription(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="description"
                    label="Description"
                    type="description"
                    id="description"
                    autoComplete="description"
                    value={description}
                    inputProps={{
                        minLength: 255,
                        maxLength: 5000
                    }}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="contractType"
                    label="Contract Type"
                    select
                    id="contractType"
                    value={contractType}
                    autoComplete="contractType"
                    onChange={(e) => setContractType(e.target.value)}
                >
                    <MenuItem value="CONTRACT">Contract</MenuItem>
                    <MenuItem value="FULL_TIME">Full Time</MenuItem>
                    <MenuItem value="INTERNSHIP">Internship</MenuItem>
                    <MenuItem value="OTHER">Other</MenuItem>
                    <MenuItem value="PART_TIME">Part Time</MenuItem>
                    <MenuItem value="TEMPORARY">Temporary</MenuItem>
                    <MenuItem value="B2B">B2B</MenuItem>
                </TextField>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="salary"
                    label="Salary"
                    type="number"
                    id="salary"
                    autoComplete="salary"
                    value={salary}
                    inputProps={{
                        min: 0
                    }}
                    onChange={(e) => setSalary(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="salaryCurrency"
                    label="Salary Currency"
                    select
                    id="salaryCurrency"
                    autoComplete="salaryCurrency"
                    value={salaryCurrency}
                    onChange={(e) => setSalaryCurrency(e.target.value)}
                >
                    <MenuItem value="EUR">EUR</MenuItem>
                    <MenuItem value="BGN">BGN</MenuItem>
                    <MenuItem value="CZK">CZK</MenuItem>
                    <MenuItem value="DKK">DKK</MenuItem>
                    <MenuItem value="HUF">HUF</MenuItem>
                    <MenuItem value="PLN">PLN</MenuItem>
                    <MenuItem value="RON">RON</MenuItem>
                    <MenuItem value="SEK">SEK</MenuItem>
                    <MenuItem value="CHF">CHF</MenuItem>
                    <MenuItem value="TRY">TRY</MenuItem>
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="AUD">AUD</MenuItem>
                    <MenuItem value="CAD">CAD</MenuItem>
                    <MenuItem value="GBP">GBP</MenuItem>
                </TextField>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="salaryType"
                    label="Salary Type"
                    select
                    id="salaryType"
                    autoComplete="salaryType"
                    value={salaryType}
                    onChange={(e) => setSalaryType(e.target.value)}>
                    <MenuItem value="ANNUAL">Annual</MenuItem>
                    <MenuItem value="HOURLY">Hourly</MenuItem>
                    <MenuItem value="MONTHLY">Monthly</MenuItem>
                    <MenuItem value="OTHER">Other</MenuItem>
                </TextField>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="experience"
                    label="Experience"
                    select
                    id="experience"
                    autoComplete="experience"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                >
                    <MenuItem value="INTERN">Intern</MenuItem>
                    <MenuItem value="JUNIOR">Junior</MenuItem>
                    <MenuItem value="REGULAR">Regular</MenuItem>
                    <MenuItem value="MID">Mid</MenuItem>
                    <MenuItem value="SENIOR">Senior</MenuItem>
                    <MenuItem value="EXPERT">Expert</MenuItem>
                    <MenuItem value="ARCHITECT">Architect</MenuItem>
                    <MenuItem value="OTHER">Other</MenuItem>
                </TextField>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="operatingMode"
                    label="Operating Mode"
                    select
                    id="operatingMode"
                    autoComplete="operatingMode"
                    value={operatingMode}
                    onChange={(e) => setOperatingMode(e.target.value)}
                >
                    <MenuItem value="HYBRID">Hybrid</MenuItem>
                    <MenuItem value="REMOTE">Remote</MenuItem>
                    <MenuItem value="ONSITE">Onsite</MenuItem>
                </TextField>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Expires At"
                        value={expiresAt}
                        onChange={(newValue) => setExpiresAt(newValue)}
                        renderInput={(params) => <TextField {...params} margin="normal" required fullWidth />}
                    />
                </LocalizationProvider>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="companyId"
                    label="Company ID"
                    type="text"
                    id="companyId"
                    autoComplete="companyId"
                    value={companyId}
                    onChange={(e) => setCompanyId(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="addressId"
                    label="Address ID"
                    type="text"
                    id="addressId"
                    autoComplete="addressId"
                    value={addressId}
                    onChange={(e) => setAddressId(e.target.value)}
                />
                <TechnologiesInput onTechnologiesChange={handleTechnologiesChange} initialTechnologies={technologies} />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Save Job Offer
                </Button>
            </Box>
        </div>
    );
};

export default EditJobOffer;