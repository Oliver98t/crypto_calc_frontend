import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";

export default function OptionDropDown({ label, onSelect, options }) {
    const [selectedOption, setSelectedOption] = useState(label);
    const [processedOptions, setProcessedOptions] = useState([]);

    useEffect(() => {
        if (options.urlToDisp_handler == null) {
            setProcessedOptions(options.data);
        } else {
            const p = options.data.map((input) => {
                const args = options.urlToDisp_handler(input);
                const replace = `_${args.interval.split('_')[1]}`;
                return `${args.amount} ${args.interval.replace(replace, 's')}`;
            });
            setProcessedOptions(p);
        }
    }, [options]);

    const handleChange = (key) => {
        const selected = key;
        setSelectedOption(selected);
        onSelect(selected);
    };
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button 
                fullWidth
                variant="bordered" 
                style={{ color: 'white', fontWeight: 'bold' }}
                >
                    {selectedOption}</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions" onAction={handleChange}>
                {processedOptions.map((option, index) => (
                    <DropdownItem key={option} value={option}>{option}</DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
}