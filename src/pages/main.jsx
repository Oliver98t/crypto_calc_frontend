import CombinedChart from "@/components/CombinedChart";
import { Navbar } from "@/components/navbar";
import React, { useState } from "react";
import {Button} from "@heroui/react";

export default function Main() {
    const [chartCount, setChartCount] = useState(1);

    const handleAddChart = () => {
        setChartCount((prev) => prev + 1);
    };

    const handleRemoveChart = () => {
        setChartCount((prev) => (prev > 1 ? prev - 1 : 1));
    };

    return (
        <div className="min-h-screen w-full p-6">
            <Navbar />
            <div className="flex gap-2 mb-4">
                <Button onClick={handleAddChart}>
                    Add Combined Chart
                </Button>
                <Button onClick={handleRemoveChart}>
                    Remove Combined Chart
                </Button>
            </div>
            {[...Array(chartCount)].map((_, idx) => (
                <CombinedChart key={idx} />
            ))}
        </div>
    );
}