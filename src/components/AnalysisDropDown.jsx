import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";

export default function AnalysisDropDown({ label, onSelect }) {
    const [selectedOption, setSelectedOption] = useState(label);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        fetch('/api/ohlcv/available_analyses/', {
            headers: {
                Accept: 'application/json',
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            setOptions(data['data']);
        })
        .catch((error) => {
            console.error('Error fetching analyses:', error);
        });
    }, []);

    const handleChange = (key) => {
        const selected = key;
        setSelectedOption(selected);

        const formatted =
            selected !== 'RSI'
                ? selected.toLowerCase().replace(/ /g, '_')
                : selected.toLowerCase();

        onSelect(formatted);
    };

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button 
                    fullWidth
                    variant="bordered" 
                    style={{ color: 'white', fontWeight: 'bold' }}
                    >
                    {selectedOption}
                    </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions" onAction={handleChange}>
                {options.map((option, index) => (
                    <DropdownItem key={option} value={option}>{option}</DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
}