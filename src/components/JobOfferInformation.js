import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Typography, Card, CardContent, CardMedia, List, ListItem, ListItemText, Box } from "@mui/material";

/*

{
    "id": 200,
    "name": "Office Manager",
    "shortDescription": "Network section watch image ok grow name represent though camera south.",
    "description": "Campaign home federal appear. Above imagine wear question away hospital society follow. Why law government for idea because. However night anyone growth who series party. First case four development recognize happy. Ready current pass many explain recent. Must personal western perhaps. Nothing security realize himself. Over bank skill. Where stop cover though for worker. Letter agent lead good threat exist focus ask. Bit region style look data officer tough. Indeed money side pressure occur. Those apply upon buy today lawyer chance anything. Life enjoy road leader economic. Project carry rather serious often foot call better. Own professor argue must character. Feel environmental near series turn successful. During rate miss court suddenly attention. Special phone point go more strong already. Energy contain increase face. So career dinner defense grow term list view. Mother shake always. Financial until upon bad threat industry control. Up watch child subject investment wait. Sound technology such term. Enjoy call draw real improve others shake. Husband nothing lot include great. Nearly arm in eight difficult risk your future. Win whom now north thank. Visit draw technology thought movie then. Hair call policy recent exist movie. Act whole purpose value. Environmental agree pass security bar. Hot that teacher most scene trial final. Arm executive federal room front develop. Quite fly total individual. Citizen describe how speak article challenge. Throw only cause situation measure. Speak environment give admit. Though others admit information wear pay item. Kid particularly rich build high. Front trade but law produce they. Newspaper Mr think tax prove skill long. Upon bad final. Forward guess plant. Fast without current determine create magazine. Standard item I college. Window charge lay create director word investment. Religious accept street beautiful although become. Near learn side guy fast. Knowledge recognize water oil might important north. Forget last film education various catch cover. Low that onto can sign improve thank. Color hold next. Nothing practice pressure degree away. Recent own manager enter statement south in. War sing write house. Skin employee model early dog tree. Agreement perform for long star father itself. Artist for check size particular. Of the many cause. Chance force involve serious chance early certain charge. Admit character science play institution. Election ready lose opportunity.",
    "contractType": "PART_TIME",
    "salary": 37056,
    "salaryCurrency": "USD",
    "salaryType": "OTHER",
    "experience": "INTERN",
    "operatingMode": "ONSITE",
    "createdAt": "2024-06-05T16:39:54.231+00:00",
    "updatedAt": "2024-06-05T16:39:54.231+00:00",
    "expiresAt": "2024-05-02T02:23:24.000+00:00",
    "address": {
        "id": 28,
        "street": "Ashley Run",
        "city": "Cooperport",
        "postalCode": "52451",
        "country": "Oman"
    },
    "company": {
        "id": 28,
        "name": "Hale Ltd",
        "description": "Southern fall claim example. Area writer less report tough computer. Newspaper level sell professional travel money. Common person effort player environment truth new. Group enjoy hotel. Minute fact return could.",
        "website": "https://toward.com",
        "email": "fire@sign.com",
        "logo": "iVBORw0KGgoAAAANSUhEUgAAAEkAAAAWCAYAAACMq7H+AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAQsSURBVFhH7Zg5LHRRFMfP2PctEWtFYg2JhERoFBSWwlYo0Cg0EgrRSFAgKERrCYUKCRURColEIyQIolBQWEIQ++599xznzps3896Ybz5TffNLbs6Z/7l33pvz7rv33DEpAnBjFw+2kJqaCiaTCfr7+1lxIzEnyY0x7iQ5gDtJDvBrSfr4+IDp6Wno6uqCubk5+Pr64oh99vf3oaenB05OTljRcnBwAH19fTA4OGjYR4+9vT3o7u6GyclJeHt7Y/Ub/Dw6OgoDAwNwdHTEqh1wd0NSUlJwl1PEDbHiOPHx8TTWuonNgHuoPD8/U6yyslJpbGzU9N/c3OReirKysqKIjUQTx+bj46NcXFxwLxUZFwlQfH19NWOw9fb2Ur/S0lKbWHR0NMWM+KckfX5+Kn5+fjQuLCxMOT4+Jl08fSUoKIj04OBgRcwq0hGZpOzsbLIRERFKUlKS4uHhwT0UZWFhgWLYmpqaSMPvqKioMOuXl5ekS6Tu5eVF19ze3qYxNTU15lhdXR0lfmhoiMbMzMzQdTEm3gDS9PinJNXX19OYhIQEVrRERUVRvK2tjRU1SdhaWlpYVXl/fzffOP5QaxYXFykWEBDAyjfyOzFB1qSlpZnj19fXrH6zsbFBekxMDCu2OJ0kfErywi8vL6xqwddC9pFYJun19ZVVleHhYXraOLuMwATh+MfHR1bUJK2urrKi0tnZSbHY2FhWtMixRji9cN/f37MHINYA9rRERkayR3fAnopYX9hTGR8fp74dHR2s2JKfn092amqKrCWZmZnsqYjkkC0uLib7tzidJDFt2bOPWJvI3t7ekpWItYg9LXK3qa2tpROAXlteXqY+6+vrZC3x9vZm7/dwOkl6M0MPo1n2Gz9GrF/suRankyR2M/bsc3V1RVbOqJ8IDQ0lKxZUehD22tjYGPV1NU4nKSQkhD3jWfXw8MAegNia2bNPUVER2fb2drJ6zM7OUhKti0RX4XSSPD09ITc3l/yysjKy1pSUlJDNy8sj6wi4YOO6s7S0BE9PT6yqiB0RqqqqICcnB8ROyaprMf+fhH+V4BGgoKAAsrKyKGgEHhEQvMnAwECaSeXl5bTb4I4lSgIoLCyEtbU1+sH4We5k6Pv7+4OooeD8/Jw0azDp8/Pz5O/u7kJ6ejr5p6enEBcXR35GRgbs7OyQj+B1EFEWgCgRyJeMjIyAqO6hoaFB9xWVY43eCAwQsk5ypFlydnam2web3hFC1klYaNpDJN3m+2QTM5iqfUtkzLJ2kmDthTGRJFa0yLFGmGfS4eEhTWVHkE/Wkq2tLRCVNW3P1dXVdChNTEzkqApeDg+1uEYlJyezqg/WYhMTE3RQvbu7g9bWVmhubtbUXxI80CL4RoiKnXzJzc0NzcLw8HBzzWSJHKv3uxD337cO4PTC/T/hTtKPAPwB+CESquxbuhMAAAAASUVORK5CYII=",
        "addresses": [
            {
                "id": 28,
                "street": "Ashley Run",
                "city": "Cooperport",
                "postalCode": "52451",
                "country": "Oman"
            },
            {
                "id": 68,
                "street": "Jeremy Estates",
                "city": "Jonesstad",
                "postalCode": "90053",
                "country": "Timor-Leste"
            }
        ]
    },
    "technologies": [
        {
            "id": {
                "jobOfferId": 200,
                "technologyId": 87
            },
            "degreeOfKnowledge": "INTERMEDIATE"
        },
        {
            "id": {
                "jobOfferId": 200,
                "technologyId": 35
            },
            "degreeOfKnowledge": "EXPERT"
        }
    ]
}

*/


/**
 * JobOfferInformation component.
 * 
 * @returns {JSX.Element}
 * 
 */
const JobOfferInformation = () => {

    const { id } = useParams();

    const API_ENDPOINT = 'http://localhost:8080/api/v1/job-offers/';

    const TECHNOLOGY_API_ENDPOINT = 'http://localhost:8080/api/v1/technologies';

    const [jobOffer, setJobOffer] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch technologies to later match with the IDs from the job offer
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
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id, technologies]);


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }


    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Job Offer Information
            </Typography>
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
    );
}

export default JobOfferInformation;