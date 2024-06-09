import React, { useEffect, useState } from 'react';
import { TextField, Box, Button } from '@mui/material';

/**
 * TechnologiesInput component.
 *
 * @param {Object} props
 * @param {Function} props.onTechnologiesChange
 * @param {Array} props.initialTechnologies
 *
 * @returns {JSX.Element}
 *
 */
const TechnologiesInput = ({ onTechnologiesChange, initialTechnologies }) => {
    const [technologies, setTechnologies] = useState([]);

    useEffect(() => {
        if (initialTechnologies && initialTechnologies.length > 0) {
            setTechnologies(initialTechnologies);
        }
    }, [initialTechnologies]);

    const handleTechnologyChange = (index, field, value) => {
        const updatedTechnologies = technologies.map((tech, i) => (
            i === index ? { ...tech, [field]: value } : tech
        ));
        setTechnologies(updatedTechnologies);
        onTechnologiesChange(updatedTechnologies);
    };

    const handleAddTechnology = () => {
        setTechnologies([...technologies, { id: '', name: '', degreeOfKnowledge: '' }]);
    };

    const handleRemoveTechnology = (index) => {
        const updatedTechnologies = technologies.filter((_, i) => i !== index);
        setTechnologies(updatedTechnologies);
        onTechnologiesChange(updatedTechnologies);
    };

    return (
        <Box>
            {technologies.map((technology, index) => (
                <Box key={index} display="flex" alignItems="center" mb={2}>
                    <TextField
                        label="ID"
                        value={technology.id}
                        onChange={(e) => handleTechnologyChange(index, 'id', e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        label="Technology"
                        value={technology.name}
                        onChange={(e) => handleTechnologyChange(index, 'name', e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        label="Degree of Knowledge"
                        value={technology.degreeOfKnowledge}
                        onChange={(e) => handleTechnologyChange(index, 'degreeOfKnowledge', e.target.value)}
                        margin="normal"
                        sx={{ ml: 2 }}
                    />
                    <Button onClick={() => handleRemoveTechnology(index)} sx={{ ml: 2 }}>Remove</Button>
                </Box>
            ))}
            <Button onClick={handleAddTechnology}>Add Technology</Button>
        </Box>
    );
};

export default TechnologiesInput;
