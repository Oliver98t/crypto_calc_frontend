import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import React, { useState, useEffect } from 'react';

const CurrencyDropDown = ({ label, currency_type, onSelect }) => {
    const [selectedOption, setSelectedOption] = useState(label);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/ohlcv/available_currencies/', {
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
                setOptions(data['data'][currency_type]);
                //console.log(data['data'][currency_type]);
            })
            .catch((error) => {
                console.error('Error fetching currencies:', error);
            });
    }, []);

    const handleChange = (key) => {
        const selected = key;
        setSelectedOption(selected);
        onSelect(selected);
    };
    
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button variant="bordered">{selectedOption}</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions" onAction={handleChange}>
                {options.map((option, index) => (
                    <DropdownItem key={option} value={option}>{option}</DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};
export default CurrencyDropDown;
/*



export default function CurrencyDropDown({ label, currency_type, onSelect }) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">{label}</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="new">New file</DropdownItem>
        <DropdownItem key="copy">Copy link</DropdownItem>
        <DropdownItem key="edit">Edit file</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
*/