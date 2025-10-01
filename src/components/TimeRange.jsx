import React, { useState, useEffect } from 'react';
import { DateRangePicker } from "@heroui/react";

export default function TimeRange({ label, onSelect, initialDates }) {
    const handleStartChange = (range) => {
        onSelect(range);
    };

    return (
        <DateRangePicker
            showMonthAndYearPickers
            aria-label='Time'
            label="Time Range"
            variant="bordered"
            defaultValue={initialDates}
            onChange={handleStartChange}
        />
    );
}